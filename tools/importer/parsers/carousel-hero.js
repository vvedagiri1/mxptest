/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero
 * Base block: carousel
 * Source: https://wknd.site/us/en.html
 * Selector: div.carousel.cmp-carousel--hero
 * Generated: 2026-05-14
 *
 * Source structure: WKND hero carousel with multiple teaser slides.
 * Each slide has an image and content (heading, description, CTA link).
 * Target: Carousel block table with one row per slide, each row having
 * two cells: [image] | [heading + description + CTA]
 */
export default function parse(element, { document }) {
  // Find all carousel slide items
  const slides = element.querySelectorAll('.cmp-carousel__item');

  const cells = [];

  slides.forEach((slide) => {
    // Extract image from the slide
    const img = slide.querySelector('.cmp-teaser__image img.cmp-image__image, .cmp-teaser__image img, .cmp-image img');

    // Extract heading (h2 in source, fallback to h1/h3)
    const heading = slide.querySelector('.cmp-teaser__title, h2, h1, h3');

    // Extract description text
    const description = slide.querySelector('.cmp-teaser__description');

    // Extract CTA links
    const ctaLinks = Array.from(slide.querySelectorAll('.cmp-teaser__action-container a.cmp-teaser__action-link, .cmp-teaser__action-container a'));

    // Build the image cell
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Build the content cell: heading + description + CTA(s)
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

    // Each row is [imageCell, contentCell] matching library example structure
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
