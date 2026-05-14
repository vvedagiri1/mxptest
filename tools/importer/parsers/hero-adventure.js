/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-adventure
 * Base block: hero
 * Source: https://wknd.site/us/en.html
 * Selector: div.teaser.cmp-teaser--hero.cmp-teaser--imagebottom
 * Generated: 2026-05-14
 *
 * Source structure:
 *   div.cmp-teaser
 *     div.cmp-teaser__content
 *       h2.cmp-teaser__title
 *       div.cmp-teaser__description
 *       div.cmp-teaser__action-container > a.cmp-teaser__action-link
 *     div.cmp-teaser__image > div.cmp-image > img.cmp-image__image
 *
 * Target table (from library example):
 *   Row 1: image
 *   Row 2: heading + description + CTA link(s)
 */
export default function parse(element, { document }) {
  // Extract image from teaser image area
  const image = element.querySelector('.cmp-teaser__image img, .cmp-image__image, img');

  // Extract heading
  const heading = element.querySelector('.cmp-teaser__title, h2, h1, h3');

  // Extract description
  const description = element.querySelector('.cmp-teaser__description, p');

  // Extract CTA link(s)
  const ctaLinks = Array.from(
    element.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a, a.cta, a.button')
  );

  // Build cells to match library example structure:
  // Row 1: image
  // Row 2: heading + description + CTA(s)
  const cells = [];

  // Row 1: Image
  if (image) {
    cells.push([image]);
  }

  // Row 2: Content (heading, description, CTA links combined in single cell)
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.append(heading);
  if (description) contentContainer.append(description);
  if (ctaLinks.length > 0) ctaLinks.forEach((link) => contentContainer.append(link));
  if (contentContainer.childNodes.length > 0) {
    cells.push([contentContainer]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-adventure', cells });
  element.replaceWith(block);
}
