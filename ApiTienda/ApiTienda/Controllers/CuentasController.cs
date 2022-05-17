using ApiTienda.DTOs;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ApiTienda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IDataProtector dataProtector;

        public CuentasController(UserManager<IdentityUser> userManager, IConfiguration configuration,
            SignInManager<IdentityUser> signInManager,
            IDataProtectionProvider dataProtectionProvider)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            dataProtector = dataProtectionProvider.CreateProtector("valor_unico_y_quizas_secreto");
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<RespuestaAutenticacion>> Registrar(CredencialesUsuario credencialesUsuario)
        {
            var usuario = new IdentityUser
            {
                UserName = credencialesUsuario.email,
                Email = credencialesUsuario.email
            };
            var resultado = await userManager.CreateAsync(usuario, credencialesUsuario.password);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credencialesUsuario);
            }
            else
            {
                return BadRequest(resultado.Errors);
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutenticacion>> login(CredencialesUsuario credencialesUsuario)
        {
            try
            {
                var resultado = await signInManager.PasswordSignInAsync(credencialesUsuario.email,
                credencialesUsuario.password, isPersistent: false, lockoutOnFailure: false);

                if (resultado.Succeeded)
                {
                    return await ConstruirToken(credencialesUsuario);
                }
                else
                {
                    return BadRequest("Login incorrecto");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private async Task<RespuestaAutenticacion> ConstruirToken(CredencialesUsuario credencialesUsuarios)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", credencialesUsuarios.email),
            };

            var usuario = await userManager.FindByEmailAsync(credencialesUsuarios.email);
            var claimDB = await userManager.GetClaimsAsync(usuario);
            claims.AddRange(claimDB);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddMinutes(30);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion,
                signingCredentials: creds);

            return new RespuestaAutenticacion()
            {
                token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                Expiracion = expiracion
            };
        }
    }
}
