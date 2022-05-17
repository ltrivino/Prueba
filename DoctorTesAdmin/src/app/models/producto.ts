export interface Producto {
    id: number;
    descripcion: string;
    precio: number;
    imagen: string;
    detalle: string;
    estado: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toProducto(json: string): Producto[] {
        return JSON.parse(json);
    }

    public static ProductoToJson(value: Producto[]): string {
        return JSON.stringify(value);
    }
}