using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Entidades
{
    public class Citas
    {
        public int Id { get; set; }
        public string descripcion { get; set; }
        public double precio { get; set; }
        public string imagen { get; set; }
        public string detalle { get; set; }
        public int MascotaId { get; set; }
        public bool estado { get; set; }
    }
}
