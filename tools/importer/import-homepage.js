/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import columnsFeaturedParser from './parsers/columns-featured.js';
import cardsArticleParser from './parsers/cards-article.js';
import heroAdventureParser from './parsers/hero-adventure.js';

// TRANSFORMER IMPORTS
import wkndCleanupTransformer from './transformers/wknd-cleanup.js';
import wkndSectionsTransformer from './transformers/wknd-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'columns-featured': columnsFeaturedParser,
  'cards-article': cardsArticleParser,
  'hero-adventure': heroAdventureParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'WKND homepage with hero carousel, featured articles, and promotional content',
  urls: [
    'https://wknd.site/us/en.html',
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['div.carousel.cmp-carousel--hero'],
    },
    {
      name: 'columns-featured',
      instances: ['div.teaser.cmp-teaser--featured'],
    },
    {
      name: 'cards-article',
      instances: ['div.image-list.list'],
    },
    {
      name: 'hero-adventure',
      instances: ['div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: 'div.carousel.cmp-carousel--hero',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Featured Articles',
      selector: 'main.container.cmp-layout-container--fixed:first-of-type',
      style: null,
      blocks: ['columns-featured', 'cards-article'],
      defaultContent: [
        'div.title.cmp-title--underline:nth-of-type(1)',
        'div.button.cmp-button--primary:nth-of-type(1)',
        'div.separator:nth-of-type(1)',
        'div.title.cmp-title--underline:nth-of-type(2)',
      ],
    },
    {
      id: 'section-3',
      name: 'Hero Adventure',
      selector: 'div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom',
      style: null,
      blocks: ['hero-adventure'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Adventure Destinations',
      selector: 'main.container.cmp-layout-container--fixed:nth-of-type(2)',
      style: null,
      blocks: ['cards-article'],
      defaultContent: [
        'div.title:not(.cmp-title--underline)',
        'div.button.cmp-button--primary:nth-of-type(2)',
        'div.separator:nth-of-type(2)',
      ],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  wkndCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [wkndSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
