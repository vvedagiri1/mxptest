/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND site cleanup.
 * Removes non-authorable content (header, footer, mobile nav, tracking iframes)
 * and cleans AEM Grid classes and data-layer attributes.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove AEM Grid classes that may interfere with block parsing
    // Found in cleaned.html: class="aem-Grid aem-Grid--12 aem-Grid--default--12"
    // Found in cleaned.html: class="aem-GridColumn aem-GridColumn--default--12"
    element.querySelectorAll('[class*="aem-Grid"]').forEach((el) => {
      const classes = [...el.classList];
      classes.forEach((cls) => {
        if (cls.startsWith('aem-Grid') || cls.startsWith('aem-GridColumn')) {
          el.classList.remove(cls);
        }
      });
    });

    // Remove data-layer attributes from body and elements
    // Found in cleaned.html: data-cmp-data-layer-enabled, data-cmp-data-layer-name,
    // data-cmp-link-accessibility-enabled, data-cmp-link-accessibility-text
    element.querySelectorAll('[data-cmp-data-layer-enabled], [data-cmp-data-layer-name], [data-cmp-link-accessibility-enabled], [data-cmp-link-accessibility-text], [data-cmp-clickable]').forEach((el) => {
      el.removeAttribute('data-cmp-data-layer-enabled');
      el.removeAttribute('data-cmp-data-layer-name');
      el.removeAttribute('data-cmp-link-accessibility-enabled');
      el.removeAttribute('data-cmp-link-accessibility-text');
      el.removeAttribute('data-cmp-clickable');
    });
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header experience fragment (non-authorable site chrome)
    // Found in cleaned.html: <header class="experiencefragment cmp-experiencefragment--header ...">
    WebImporter.DOMUtils.remove(element, [
      'header.cmp-experiencefragment--header',
    ]);

    // Remove footer experience fragment (non-authorable site chrome)
    // Found in cleaned.html: <footer class="experiencefragment cmp-experiencefragment--footer ...">
    WebImporter.DOMUtils.remove(element, [
      'footer.cmp-experiencefragment--footer',
    ]);

    // Remove Adobe Audience Manager tracking iframe
    // Found in cleaned.html: <iframe title="Adobe ID Syncing iFrame" id="destination_publishing_iframe_wkndsite_0" ...>
    WebImporter.DOMUtils.remove(element, [
      'iframe#destination_publishing_iframe_wkndsite_0',
    ]);

    // Remove mobile navigation toggle
    // Found in cleaned.html: <div id="toggleNav">
    WebImporter.DOMUtils.remove(element, [
      '#toggleNav',
    ]);

    // Remove mobile navigation overlay
    // Found in cleaned.html: <div id="mobileNav" class="cmp-navigation--mobile">
    WebImporter.DOMUtils.remove(element, [
      '#mobileNav',
    ]);

    // Remove any remaining iframes, link elements, and noscript tags
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
