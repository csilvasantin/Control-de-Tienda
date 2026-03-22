# Arquitectura inicial

## Capas

1. `data/`
   Estado persistido del MVP en JSON.

2. `src/store.js`
   Lectura, escritura y reglas básicas de negocio.

3. `src/server.js`
   API HTTP y servidor estático.

4. `public/`
   Panel de gestión local.

## Regla principal

La lógica de stock no debe vivir en el frontend. El frontend solo presenta y dispara acciones.

## Evolución prevista

1. mover persistencia a SQLite o Postgres;
2. registrar movimientos de inventario;
3. añadir ventas y caja;
4. separar módulo de compras y proveedores.
