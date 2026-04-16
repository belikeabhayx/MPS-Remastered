import React from 'react';
import { sanitize } from '@/lib/sanitize';

interface SanitizedHTMLProps {
  content: string;
  className?: string;
  /**
   * The HTML tag to use for the wrapper. Defaults to 'div'.
   */
  tag?: React.ElementType;
}

/**
 * SanitizedHTML
 * 
 * A safer alternative to dangerouslySetInnerHTML that automatically 
 * applies our custom sanitize-html configuration.
 */
export const SanitizedHTML = ({ 
  content, 
  className, 
  tag: Tag = 'div' 
}: SanitizedHTMLProps) => {
  if (!content) return null;

  return (
    <Tag 
      className={className} 
      dangerouslySetInnerHTML={{ __html: sanitize(content) }} 
    />
  );
};
