using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Entidades
{
    public class Mascotas
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 20)]
        [Required]
        public string nombre { get; set; }
        [StringLength(maximumLength: 100)]
        public string imagen { get; set; }
        [StringLength(maximumLength: 150)]
        public string nombreProp { get; set; }
        public string raza { get; set; }
        public List<Citas> MascotaCita { get; set; }

    }
}
