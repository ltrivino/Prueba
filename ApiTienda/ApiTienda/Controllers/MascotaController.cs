using ApiTienda.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiTienda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public MascotaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Mascotas>>> Get()
        {
            try
            {
                var mascotas = await context.Mascotas.ToListAsync();
                return Ok(mascotas);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }




        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Mascotas mascotas)
        {
            try
            {
                var existeMascota = await context.Mascotas.AnyAsync(x => x.nombre == mascotas.nombre);

                if (existeMascota)
                {
                    return BadRequest($"Ya existe un Mascota con el Nombre {mascotas.nombre}");
                }

                context.Add(mascotas);
                await context.SaveChangesAsync();
                return Ok(new
                {
                    status = true
                });
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(Mascotas mascotas, int id)
        {
            try
            {
                mascotas.Id = id;
                context.Update(mascotas);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpGet("{id:int}")]
        public async Task<ActionResult<Mascotas>> GetById(int id)
        {
            try
            {
                var mascota = await context.Mascotas.FirstOrDefaultAsync(mascota => mascota.Id == id);

                if (mascota == null)
                {
                    return NotFound();
                }
                return Ok(mascota);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var existe = await context.Mascotas.AnyAsync(x => x.Id == id);

                if (!existe)
                {
                    return NotFound();
                }

                context.Remove(new Mascotas() { Id = id });
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
    }
}
