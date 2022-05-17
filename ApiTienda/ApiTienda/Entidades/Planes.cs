using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Entidades
{
    public class Planes
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 50)]
        public string nombre { get; set; }
        [StringLength(maximumLength: 100)]
        public string icono { get; set; }
        [StringLength(maximumLength: 150)]
        public string description { get; set; }
        public int valor { get; set; }
        public int frecuencia { get; set; }
        public string codigo { get; set; }
        public int plan { get; set; }
        public List<Productos> productosPlan { get; set; }

    }
}
