/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND sections.
 * Inserts <hr> section breaks between the 4 homepage sections.
 * All selectors from page-templates.json, validated against migration-work/cleaned.html.
 *
 * Sections (from template):
 *   1. Hero Carousel: div.carousel.cmp-carousel--hero
 *   2. Featured Articles: main.container.cmp-layout-container--fixed (first)
 *   3. Hero Adventure: div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom
 *   4. Adventure Destinations: main.container.cmp-layout-container--fixed (second)
 *
 * All section styles are null, so no Section Metadata blocks are needed.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };

    // Process sections in reverse order to avoid position shifts
    for (let i = sections.length - 1; i >= 1; i--) {
      const section = sections[i];
      let sectionEl = null;

      // Use section selectors validated against cleaned.html
      // Section 2: main.container.cmp-layout-container--fixed:first-of-type
      // Section 3: div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom
      // Section 4: main.container.cmp-layout-container--fixed:nth-of-type(2)
      // After cleanup transformer strips aem-GridColumn classes, these selectors still match
      if (section.selector) {
        // For nth-of-type selectors, use querySelectorAll with base selector
        if (section.selector.includes(':nth-of-type(2)')) {
          const baseSelector = section.selector.replace(':nth-of-type(2)', '');
          const matches = element.querySelectorAll(baseSelector);
          if (matches.length >= 2) {
            sectionEl = matches[1];
          }
        } else if (section.selector.includes(':first-of-type')) {
          const baseSelector = section.selector.replace(':first-of-type', '');
          const matches = element.querySelectorAll(baseSelector);
          if (matches.length >= 1) {
            sectionEl = matches[0];
          }
        } else {
          sectionEl = element.querySelector(section.selector);
        }
      }

      if (sectionEl) {
        // Insert <hr> before this section element to create a section break
        const hr = document.createElement('hr');
        sectionEl.before(hr);

        // If section has a style, create Section Metadata block
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: 'Section Metadata',
            cells: { style: section.style },
          });
          sectionEl.after(sectionMetadata);
        }
      }
    }
  }
}
