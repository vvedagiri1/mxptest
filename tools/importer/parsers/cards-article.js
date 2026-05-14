/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article
 * Base block: cards
 * Source selector: div.image-list.list
 * Generated: 2026-05-14
 *
 * Transforms a WKND image-list component into a Cards block table.
 * Each list item becomes a row with [image] | [title + description].
 */
export default function parse(element, { document }) {
  // Get all card items from the image list
  const items = element.querySelectorAll('li.cmp-image-list__item, li[class*="image-list__item"]');

  const cells = [];

  items.forEach((item) => {
    // Extract image - look for the img inside the item
    const img = item.querySelector('img.cmp-image__image, img[class*="image__image"], img');

    // Extract title link and title text
    const titleLink = item.querySelector('a.cmp-image-list__item-title-link, a[class*="item-title-link"]');
    const titleSpan = item.querySelector('span.cmp-image-list__item-title, span[class*="item-title"]');

    // Extract description
    const description = item.querySelector('span.cmp-image-list__item-description, span[class*="item-description"]');

    // Build image cell
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Build content cell with title (bold + linked) and description
    const contentCell = [];

    if (titleLink && titleSpan) {
      // Create a bold element wrapping the linked title
      const strong = document.createElement('strong');
      const link = document.createElement('a');
      link.href = titleLink.href;
      link.textContent = titleSpan.textContent;
      strong.appendChild(link);
      contentCell.push(strong);
    } else if (titleSpan) {
      // Title without link - just bold text
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent;
      contentCell.push(strong);
    }

    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description.textContent;
      contentCell.push(descP);
    }

    // Each card is a row with two cells: [image, content]
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
