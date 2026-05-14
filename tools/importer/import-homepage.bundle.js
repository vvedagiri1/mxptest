/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".cmp-carousel__item");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".cmp-teaser__image img.cmp-image__image, .cmp-teaser__image img, .cmp-image img");
      const heading = slide.querySelector(".cmp-teaser__title, h2, h1, h3");
      const description = slide.querySelector(".cmp-teaser__description");
      const ctaLinks = Array.from(slide.querySelectorAll(".cmp-teaser__action-container a.cmp-teaser__action-link, .cmp-teaser__action-container a"));
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      if (heading) {
        contentCell.push(heading);
      }
      if (description) {
        contentCell.push(description);
      }
      if (ctaLinks.length > 0) {
        ctaLinks.forEach((link) => contentCell.push(link));
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-featured.js
  function parse2(element, { document }) {
    const teaser = element.querySelector(".cmp-teaser") || element;
    const contentCell = [];
    const pretitle = teaser.querySelector('.cmp-teaser__pretitle, p[class*="pretitle"]');
    if (pretitle) contentCell.push(pretitle);
    const heading = teaser.querySelector(".cmp-teaser__title, h2.cmp-teaser__title, h1, h2, h3");
    if (heading && heading !== pretitle) contentCell.push(heading);
    const description = teaser.querySelector('.cmp-teaser__description, div[class*="description"], p[class*="description"]');
    if (description) contentCell.push(description);
    const ctaLinks = Array.from(
      teaser.querySelectorAll('.cmp-teaser__action-container a, .cmp-teaser__action-link, a[class*="action"]')
    );
    if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
    const imageCell = [];
    const image = teaser.querySelector(".cmp-teaser__image img, .cmp-image img, img");
    if (image) imageCell.push(image);
    const cells = [
      [contentCell, imageCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll('li.cmp-image-list__item, li[class*="image-list__item"]');
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector('img.cmp-image__image, img[class*="image__image"], img');
      const titleLink = item.querySelector('a.cmp-image-list__item-title-link, a[class*="item-title-link"]');
      const titleSpan = item.querySelector('span.cmp-image-list__item-title, span[class*="item-title"]');
      const description = item.querySelector('span.cmp-image-list__item-description, span[class*="item-description"]');
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      if (titleLink && titleSpan) {
        const strong = document.createElement("strong");
        const link = document.createElement("a");
        link.href = titleLink.href;
        link.textContent = titleSpan.textContent;
        strong.appendChild(link);
        contentCell.push(strong);
      } else if (titleSpan) {
        const strong = document.createElement("strong");
        strong.textContent = titleSpan.textContent;
        contentCell.push(strong);
      }
      if (description) {
        const descP = document.createElement("p");
        descP.textContent = description.textContent;
        contentCell.push(descP);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-adventure.js
  function parse4(element, { document }) {
    const image = element.querySelector(".cmp-teaser__image img, .cmp-image__image, img");
    const heading = element.querySelector(".cmp-teaser__title, h2, h1, h3");
    const description = element.querySelector(".cmp-teaser__description, p");
    const ctaLinks = Array.from(
      element.querySelectorAll(".cmp-teaser__action-link, .cmp-teaser__action-container a, a.cta, a.button")
    );
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.append(heading);
    if (description) contentContainer.append(description);
    if (ctaLinks.length > 0) ctaLinks.forEach((link) => contentContainer.append(link));
    if (contentContainer.childNodes.length > 0) {
      cells.push([contentContainer]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-adventure", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      element.querySelectorAll('[class*="aem-Grid"]').forEach((el) => {
        const classes = [...el.classList];
        classes.forEach((cls) => {
          if (cls.startsWith("aem-Grid") || cls.startsWith("aem-GridColumn")) {
            el.classList.remove(cls);
          }
        });
      });
      element.querySelectorAll("[data-cmp-data-layer-enabled], [data-cmp-data-layer-name], [data-cmp-link-accessibility-enabled], [data-cmp-link-accessibility-text], [data-cmp-clickable]").forEach((el) => {
        el.removeAttribute("data-cmp-data-layer-enabled");
        el.removeAttribute("data-cmp-data-layer-name");
        el.removeAttribute("data-cmp-link-accessibility-enabled");
        el.removeAttribute("data-cmp-link-accessibility-text");
        el.removeAttribute("data-cmp-clickable");
      });
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.cmp-experiencefragment--header"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer.cmp-experiencefragment--footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe#destination_publishing_iframe_wkndsite_0"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#toggleNav"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#mobileNav"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/wknd-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      for (let i = sections.length - 1; i >= 1; i--) {
        const section = sections[i];
        let sectionEl = null;
        if (section.selector) {
          if (section.selector.includes(":nth-of-type(2)")) {
            const baseSelector = section.selector.replace(":nth-of-type(2)", "");
            const matches = element.querySelectorAll(baseSelector);
            if (matches.length >= 2) {
              sectionEl = matches[1];
            }
          } else if (section.selector.includes(":first-of-type")) {
            const baseSelector = section.selector.replace(":first-of-type", "");
            const matches = element.querySelectorAll(baseSelector);
            if (matches.length >= 1) {
              sectionEl = matches[0];
            }
          } else {
            sectionEl = element.querySelector(section.selector);
          }
        }
        if (sectionEl) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
          if (section.style) {
            const sectionMetadata = WebImporter.Blocks.createBlock(document, {
              name: "Section Metadata",
              cells: { style: section.style }
            });
            sectionEl.after(sectionMetadata);
          }
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "columns-featured": parse2,
    "cards-article": parse3,
    "hero-adventure": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "WKND homepage with hero carousel, featured articles, and promotional content",
    urls: [
      "https://wknd.site/us/en.html"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["div.carousel.cmp-carousel--hero"]
      },
      {
        name: "columns-featured",
        instances: ["div.teaser.cmp-teaser--featured"]
      },
      {
        name: "cards-article",
        instances: ["div.image-list.list"]
      },
      {
        name: "hero-adventure",
        instances: ["div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: "div.carousel.cmp-carousel--hero",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Articles",
        selector: "main.container.cmp-layout-container--fixed:first-of-type",
        style: null,
        blocks: ["columns-featured", "cards-article"],
        defaultContent: [
          "div.title.cmp-title--underline:nth-of-type(1)",
          "div.button.cmp-button--primary:nth-of-type(1)",
          "div.separator:nth-of-type(1)",
          "div.title.cmp-title--underline:nth-of-type(2)"
        ]
      },
      {
        id: "section-3",
        name: "Hero Adventure",
        selector: "div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom",
        style: null,
        blocks: ["hero-adventure"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Adventure Destinations",
        selector: "main.container.cmp-layout-container--fixed:nth-of-type(2)",
        style: null,
        blocks: ["cards-article"],
        defaultContent: [
          "div.title:not(.cmp-title--underline)",
          "div.button.cmp-button--primary:nth-of-type(2)",
          "div.separator:nth-of-type(2)"
        ]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
