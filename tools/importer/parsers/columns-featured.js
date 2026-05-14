/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-featured
 * Base block: columns
 * Source selector: div.teaser.cmp-teaser--featured
 * Generated: 2026-05-14
 *
 * Transforms a featured teaser component into a Columns block with
 * text content (pretitle, heading, description, CTA) on the left
 * and an image on the right.
 */
export default function parse(element, { document }) {
  // Extract the inner teaser container
  const teaser = element.querySelector('.cmp-teaser') || element;

  // --- Left cell: text content ---
  const contentCell = [];

  // Pretitle (optional eyebrow text)
  const pretitle = teaser.querySelector('.cmp-teaser__pretitle, p[class*="pretitle"]');
  if (pretitle) contentCell.push(pretitle);

  // Heading - use specific class first, then fall back to heading elements
  // Avoid [class*="title"] as it overlaps with pretitle
  const heading = teaser.querySelector('.cmp-teaser__title, h2.cmp-teaser__title, h1, h2, h3');
  if (heading && heading !== pretitle) contentCell.push(heading);

  // Description
  const description = teaser.querySelector('.cmp-teaser__description, div[class*="description"], p[class*="description"]');
  if (description) contentCell.push(description);

  // CTA links
  const ctaLinks = Array.from(
    teaser.querySelectorAll('.cmp-teaser__action-container a, .cmp-teaser__action-link, a[class*="action"]')
  );
  if (ctaLinks.length > 0) contentCell.push(...ctaLinks);

  // --- Right cell: image ---
  const imageCell = [];
  const image = teaser.querySelector('.cmp-teaser__image img, .cmp-image img, img');
  if (image) imageCell.push(image);

  // Build cells: single row with two columns [text | image]
  const cells = [
    [contentCell, imageCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-featured', cells });
  element.replaceWith(block);
}
