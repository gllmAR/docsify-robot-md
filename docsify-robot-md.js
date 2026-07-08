// docsify-robot-md — expose the raw Markdown source of each Docsify page
// to crawlers and no-JS consumers, without any server-side logic.
//
// Self-contained Docsify plugin (no external dependency). On every route
// change (hook.doneEach) it:
//   1. adds  <link rel="alternate" type="text/markdown" href="<page>.md">
//      so crawlers/robots can fetch the indexable source directly;
//   2. sets  window.__pageMarkdownUrl__ to that URL (raw text is available
//      on demand via fetch(window.__pageMarkdownUrl__));
//   3. injects a JSON-LD WebPage describing the article source URL.
//
// Install (Docsify 5):
//   <script src="https://cdn.jsdelivr.net/gh/gllmAR/docsify-robot-md/docsify-robot-md.js"></script>
//
// Or vendor it locally (e.g. with `docsh vendor`) and point to your copy.
(function () {
  "use strict";

  function install(hook, vm) {
    function currentMarkdownUrl() {
      var file = vm.route && vm.route.file; // e.g. "01-deroulement/README.md"
      if (!file) return null;
      try {
        return new URL(file, location.href).href;
      } catch (e) {
        return null;
      }
    }

    function upsertAlternateMarkdown(mdUrl) {
      var existing = document.head.querySelector(
        'link[rel="alternate"][type="text/markdown"]'
      );
      if (existing) {
        if (existing.getAttribute("href") === mdUrl) return;
        existing.parentNode.removeChild(existing);
      }
      if (!mdUrl) return;
      var link = document.createElement("link");
      link.rel = "alternate";
      link.type = "text/markdown";
      link.href = mdUrl;
      document.head.appendChild(link);
    }

    function upsertJsonLd(mdUrl) {
      var id = "docsify-robot-md-jsonld";
      var existing = document.getElementById(id);
      if (existing) existing.parentNode.removeChild(existing);
      if (!mdUrl) return;
      var data = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "mainEntity": {
          "@type": "Article",
          "url": mdUrl
        }
      };
      var script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }

    hook.doneEach(function () {
      var mdUrl = currentMarkdownUrl();
      window.__pageMarkdownUrl__ = mdUrl || null;
      window.__pageMarkdown__ = null; // populated on demand by crawlers
      upsertAlternateMarkdown(mdUrl);
      upsertJsonLd(mdUrl);
    });
  }

  // Register as a Docsify plugin (works whether $docsify exists yet or not).
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(install);
})();
