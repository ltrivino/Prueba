using System.ComponentModel.DataAnnotations;

namespace ApiTienda.DTOs
{
    public class CredencialesUsuario
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
