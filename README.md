# Control de Tienda

Sistema base para gestionar el estado operativo de una tienda.

## Objetivo

Centralizar en una sola herramienta:

1. productos;
2. stock;
3. ventas;
4. alertas de reposición;
5. visión rápida del estado de la tienda.

## Alcance del MVP

Este primer repositorio incluye:

1. servidor local en Node;
2. API JSON simple;
3. panel web ligero;
4. datos de ejemplo;
5. documentación inicial de módulos y siguiente evolución.

## Módulos previstos

1. Catálogo de productos
2. Control de stock
3. Registro de ventas
4. Alertas de mínimo stock
5. Resumen de caja y actividad

## Arranque

```bash
cd /Users/csilvasantin/Documents/Codex/Control-de-Tienda
npm start
```

Abrir:

```text
http://127.0.0.1:3040
```

## API inicial

1. `GET /api/store`
   Devuelve productos, resumen y alertas.

2. `POST /api/products/:id/stock`
   Actualiza el stock de un producto.

Ejemplo:

```json
{
  "stock": 18
}
```

## Siguientes pasos recomendados

1. añadir tickets o ventas individuales;
2. distinguir tienda, almacén y proveedor;
3. incorporar usuarios y roles;
4. añadir histórico;
5. conectar con lectores, TPV o importación CSV.
