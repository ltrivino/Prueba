using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Entidades
{
    public class Productos
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 150)]
        public string descripcion { get; set; }
        [StringLength(maximumLength: 50)]
        public double precio { get; set; }
        public string imagen { get; set; }
        [StringLength(maximumLength: 150)]
        public string detalle { get; set; }
        public bool estado { get; set; }
    }
}
