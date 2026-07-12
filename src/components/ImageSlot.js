import React from 'react';

export default function ImageSlot({ id, shape = 'rounded', radius = 12, fit = 'cover', placeholder, src, style, ...rest }) {
  // Map of image slot IDs to generated on-brand assets in public/images
  const imageMap = {
    'portal-redbook': '/images/red-book/red-book-on-stand.jpg',
    'portal-thepprasit': '/images/products/thepprasit-inhaler-jar-closed.jpg',
    'portal-phetmongkol': '/images/products/inhaler-and-oil-on-brick.jpg',
    'portal-lifestyle': '/images/products/hands-holding-inhaler-and-oil.jpg',
    // Fallbacks/defaults using the same images to ensure gallery/other slots look complete
    'portal-gallery-1': '/images/red-book/red-book-open-in-case.jpg',
    'portal-gallery-2': '/images/store/ceramic-bowls-on-counter.jpg',
    'portal-gallery-3': '/images/store/apothecary-workshop-session.jpg',
    'portal-gallery-4': '/images/store/balm-jars-ingredients-display.jpg',
    'portal-gallery-5': '/images/event/dried-herbs-in-ceramic-bowls.jpg',
    'portal-gallery-6': '/images/event/grinding-herbs-pestle-mortar.jpg',
    'portal-gallery-7': '/images/event/workshop-setup-mortars-bowls.jpg',
    'portal-gallery-8': '/images/event/workshop-workbook-with-logo.jpg',
    // Apothecary page slots
    'apo-exhibition': '/images/store/founder-portrait-display.jpg',
    'apo-thep-inhaler': '/images/products/thepprasit-inhaler-jar-open.jpg',
    'apo-thep-oil': '/images/products/hands-holding-inhaler-jar.jpg',
    'apo-phet-inhaler': '/images/products/thepprasit-inhaler-jar-closed.jpg',
    'apo-phet-oil': '/images/products/inhaler-and-oil-on-brick.jpg',
    'apo-app-inhale': '/images/products/applying-workday-oil-to-wrist.jpg',
    'apo-app-apply': '/images/products/applying-workday-oil-to-wrist.jpg',
    // Heritage page slots
    'heritage-discovery': '/images/red-book/red-book-thepprasit-recipe-detail.jpg',
    'heritage-guardian': '/images/store/bronze-shishi-statue.jpg',
    'heritage-philosophy': '/images/store/mixing-herbs-in-mortar.jpg',
    'heritage-collective': '/images/store/pakk-taii-design-week-booth.jpg',
    'heritage-finale': '/images/store/storefront-sign.jpg',
  };

  const imageSrc = imageMap[id] || src;
  const borderRadius = shape === 'circle' ? '50%' : shape === 'pill' ? '9999px' : shape === 'rounded' ? `${radius}px` : '0px';

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '200px', // ensure empty slots do not collapse
    overflow: 'hidden',
    borderRadius,
    backgroundColor: 'var(--makara-200)', // design system soft warm background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-hairline)',
    ...style,
  };

  if (imageSrc) {
    return (
      <div style={containerStyle} {...rest}>
        <img
          src={imageSrc}
          alt={placeholder || 'Apiban Bo Plup Image'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            borderRadius,
          }}
        />
      </div>
    );
  }

  // Fallback placeholder card (premium aesthetic)
  return (
    <div style={containerStyle} {...rest}>
      <div style={{
        padding: '24px',
        textAlign: 'center',
        color: 'var(--brown-600)',
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        {placeholder || 'Image Slot'}
      </div>
    </div>
  );
}
