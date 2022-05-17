using ApiTienda.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiTienda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProductoController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Productos>>> Get()
        {
            var productos = await context.Productos.ToListAsync();
            return productos;
            //return mapper.Map<List<AutorDTO>>(autores);
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<Productos>> GetById(int id)
        {
            var producto = await context.Productos.FirstOrDefaultAsync(producto => producto.Id == id);

            if (producto == null)
            {
                return NotFound();
            } 
            return producto;
        }
    }
}
