import { parse } from 'node-html-parser';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Parses an HTML string, extracts headings (h1, h2, h3),
 * ensures each heading has a unique ID, and returns the
 * modified HTML along with the list of headings.
 */
export function extractHeadings(html: string) {
  if (!html) return { content: '', headings: [] };

  const root = parse(html);
  const headingElements = root.querySelectorAll('h1, h2, h3');

  const headings: Heading[] = headingElements.map((el, index) => {
    const text = el.textContent.trim();
    
    // Generate an ID if one doesn't exist
    let id = el.getAttribute('id');
    if (!id) {
      id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      if (!id) id = `heading-${index}`;
      
      // Ensure ID is unique or at least specific to this context
      el.setAttribute('id', id);
    }

    return {
      id,
      text,
      level: parseInt(el.tagName.replace('H', ''), 10)
    };
  });

  return {
    content: root.toString(),
    headings
  };
}
