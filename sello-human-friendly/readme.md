# Cara pública del Sello HUMAN FRIENDLY

Generado por `node src/tools/export-static.ts`. **No editar a mano.**

- `index.html` — español
- `pt/index.html` — portugués
- `en/index.html` — inglés

## Qué NO está aquí

El **verificador de sellos** no se puede exportar a estático: decir si un sello
sigue valiendo exige leer el estado de ahora mismo. Una página congelada solo
mostraría una foto vieja, que es justo lo que el verificador existe para evitar.

Para que el verificador funcione hace falta la plataforma corriendo. Con
`HF_PUBLIC_BASE_URL` apuntando a ella, esta exportación enlaza allí.
