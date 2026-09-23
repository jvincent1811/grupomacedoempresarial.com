# Grupo Macedo Empresarial — Sitio web (Próximamente)

Página temporal de presentación para **grupomacedoempresarial.com** con el logotipo
y mensaje de «Próximamente». Lista para publicarse en **GitHub Pages**.

## Contenido

```
├── index.html          Página principal
├── styles.css          Estilos (fondo crema #f5f3ef, navy #162638, oro #af915f)
├── script.js           Preloader, campo de partículas y parallax
├── CNAME               Dominio personalizado (¡no borrar!)
├── .nojekyll           Evita el procesamiento de Jekyll en GitHub Pages
└── assets/
    ├── logo.png            Logotipo original (fondo transparente)
    ├── favicon.png         Ícono del sitio
    └── og-image.jpg        Imagen para compartir en redes (1200×630)
```

## Publicación en GitHub Pages

1. Crea (o usa) el repositorio, por ejemplo `grupomacedoempresarial.github.io`
   o cualquier repositorio público.
2. Sube **todo el contenido** de esta carpeta a la raíz del repositorio
   (incluye `CNAME` y `.nojekyll`).
3. En el repositorio: **Settings → Pages → Source**: selecciona la rama
   `main` y la carpeta `/ (root)`, y guarda.
4. En **Settings → Pages → Custom domain** debe aparecer
   `grupomacedoempresarial.com` (lo toma automáticamente del archivo `CNAME`).
   Activa **Enforce HTTPS** cuando esté disponible.
5. En tu proveedor de DNS, apunta el dominio a GitHub Pages:
   - Registro `A` para `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - Registro `CNAME` para `www` → `tu-usuario.github.io`
6. Espera unos minutos y visita https://grupomacedoempresarial.com

## Personalización rápida

- **Correo de contacto:** busca `contacto@grupomacedoempresarial.com` en
  `index.html` y reemplázalo por el correo real.
- **Texto del subtítulo:** edita la línea «Estamos construyendo algo
  extraordinario.» en `index.html`.
- **Colores:** se definen como variables al inicio de `styles.css` (`:root`).
