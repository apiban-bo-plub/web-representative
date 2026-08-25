import React from 'react';

/**
 * Decorative depth layer. The drift itself is a scroll-driven CSS animation
 * declared in `src/styles/parallax.css` — speed is a class, never an inline
 * style, so the animation stays on the compositor and costs no JS per frame.
 *
 * Background and decoration only. Never wrap body copy or a control in this.
 */
export default function ParallaxLayer({ speed = 'mid', as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`px-layer px-layer--${speed} ${className}`.trim()} aria-hidden="true" {...rest}>
      {children}
    </Tag>
  );
}
