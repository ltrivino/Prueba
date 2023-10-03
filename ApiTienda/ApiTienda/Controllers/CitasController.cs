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
    public class CitasController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public CitasController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Citas>>> Get()
        {
            try
            {
                var citas = await context.Citas.ToListAsync();
                return Ok(citas);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> Post(Citas citas)
        {
            try
            {
                context.Add(citas);
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
        public async Task<ActionResult> Put(Citas citas, int id)
        {
            try
            {
                citas.Id = id;
                context.Update(citas);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpGet("{id:int}")]
        public async Task<ActionResult<Citas>> GetById(int id)
        {
            try
            {
                var cita = await context.Mascotas.FirstOrDefaultAsync(cita => cita.Id == id);

                if (cita == null)
                {
                    return NotFound();
                }
                return Ok(cita);
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

                context.Remove(new Citas() { Id = id });
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

