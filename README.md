# docsify-robot-md

A tiny, dependency-free [Docsify](https://docsify.js.org/) plugin that makes
the **raw Markdown source** of every page available to crawlers, robots,
and no-JS consumers — no server, no build step, no edge function required.

## Why

Docsify is a single-page app: `index.html` only contains `<div id="app">`
and all content is rendered client-side in JavaScript. Search-engine bots
that don't run JS, link-preview bots (Twitter/Slack/LinkedIn), archives,
and readers with JS disabled see an empty page.

This plugin fixes the *content-discovery* gap by exposing, on every route
change, a `<link rel="alternate" type="text/markdown">` pointing at the
page's `.md` source — which static hosts (Codeberg Pages, GitHub Pages,
Netlify, …) already serve directly.

It does **not** magically give per-URL social-preview cards (those are read
from the single `index.html` shell, which a static host can't vary per
route). For that you'd need SSR/edge rendering. This plugin covers the
realistic, static-friendly part: indexable Markdown for robots and no-JS.

## What it does

On each `doneEach` (Docsify route change) the plugin:

1. Injects `<link rel="alternate" type="text/markdown" href="<page>.md">`
   so crawlers can fetch the indexable source directly.
2. Sets `window.__pageMarkdownUrl__` to that URL (fetch it on demand to get
   the raw text).
3. Adds a JSON-LD `WebPage` describing the article source URL.

## Install

Add the script after Docsify (and after your `$docsify` config):

```html
<script src="https://gllmAR.github.io/docsify-robot-md/docsify-robot-md.js"></script>
```

That's it — no configuration needed. The plugin registers itself onto
`window.$docsify.plugins` automatically.

> Served from this repo's GitHub Pages. A jsDelivr mirror is also available:
> `https://cdn.jsdelivr.net/gh/gllmAR/docsify-robot-md/docsify-robot-md.js`

### Via docsh

If your site is built with [`docsh`](https://codeberg.org/gllm/docsh),
SEO is on by default (`docsh init`). Running `docsh vendor` will download
this plugin into `vendor/` and rewrite `index.html` to use the local copy.

## License

MIT — see [LICENSE](./LICENSE).
