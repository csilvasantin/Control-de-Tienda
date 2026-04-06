# Proyecto 15 — Control de Tienda

> Sistema base para gestionar el estado operativo de una tienda (productos, stock, ventas, alertas).

## Contexto

Herramienta centralizada para operación de tienda:
1. Catálogo de productos
2. Control de stock
3. Registro de ventas
4. Alertas de reposición por mínimo stock
5. Resumen rápido de caja y actividad

Servidor Node local (puerto 3040) + API JSON + panel web ligero + datos de ejemplo.

## Arquitectura

```
Control-de-Tienda/
├── npm start → puerto 3040
├── API endpoints
│   ├── GET /api/store        # Productos, resumen, alertas
│   └── POST /api/products/:id/stock  # Actualizar stock
└── panel web
```

**API de stock**:
```json
POST /api/products/:id/stock
{
  "stock": 18
}
```

## Notas para IAs

1. **Arranque**: `npm start` en la carpeta del proyecto. Abrir `http://127.0.0.1:3040`.

2. **Estado actual (MVP)**: Servidor Node sin dependencias externas, API JSON simple, panel ligero, datos de ejemplo, documentación de módulos.

3. **Módulos previstos**:
   - Catálogo de productos
   - Control de stock
   - Registro de ventas
   - Alertas de mínimo stock
   - Resumen de caja y actividad

4. **Próximos pasos**:
   - Añadir tickets o ventas individuales
   - Distinguir tienda, almacén y proveedor
   - Incorporar usuarios y roles
   - Añadir histórico de cambios
   - Conectar lectores, TPV o importación CSV

5. **Propósito**: Base modular para evolucionar hacia un sistema completo de gestión de tienda.
