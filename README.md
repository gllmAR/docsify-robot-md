# docsify-robot-md — page de test

C'est une **mini-instance Docsify 5** servant uniquement à vérifier le
plugin [`docsify-robot-md`](../docsify-robot-md.js).

## Comment vérifier le plugin

1. Ouvrez cette page publiée (GitHub Pages).
2. Ouvrez les outils de développement (onglet *Éléments* / *Elements*).
3. Dans `<head>`, cherchez la balise :

   ```html
   <link rel="alternate" type="text/markdown" href=".../README.md">
   ```

   Elle pointe vers le Markdown source de la page courante.
4. Naviguez vers une autre page (ex. *Exemple*) : l'URL de la balise
   `alternate` se met à jour automatiquement.
5. `window.__pageMarkdownUrl__` contient aussi cette URL en JS.

## Ce que fait le plugin

- Injecte `<link rel="alternate" type="text/markdown">` par page.
- Expose `window.__pageMarkdownUrl__`.
- Ajoute un JSON-LD `WebPage` décrivant la source.

## Limite

Sur un hébergement statique, l'aperçu social par page n'est pas résolu
(les balises OG sont dans la coquille `index.html` unique). Le plugin
couvre l'indexation du Markdown par les robots et l'accès sans JS au
`.md` source.
