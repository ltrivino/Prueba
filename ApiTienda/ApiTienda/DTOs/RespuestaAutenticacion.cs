using System;

namespace ApiTienda.DTOs
{
    public class RespuestaAutenticacion
    {

        public string token { get; set; }
        public DateTime Expiracion { get; set; }

    }
}
