import sanitizeHtml from 'sanitize-html';

export const sanitize = (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class'],
      'img': ['src', 'alt', 'width', 'height'],
    },
    allowedIframeHostnames: ['www.youtube.com']
  });
};
