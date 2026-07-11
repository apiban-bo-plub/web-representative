import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — small label/pill for product attributes (e.g. "20 ml", "Herbal",
 * "New"). INTENTIONAL ADDITION for consumer interfaces & packaging meta.
 */
function Tag({
  children,
  tone = "sand",
  style,
  ...rest
}) {
  const tones = {
    sand: {
      background: "var(--makara-200)",
      color: "var(--brown-600)",
      border: "1px solid var(--makara-300)"
    },
    green: {
      background: "var(--basil-green-100)",
      color: "var(--basil-green-900)",
      border: "1px solid var(--basil-green-300)"
    },
    gold: {
      background: "transparent",
      color: "var(--spring-wood-800)",
      border: "1px solid var(--spring-wood-500)"
    },
    solid: {
      background: "var(--basil-green-800)",
      color: "var(--makara-100)",
      border: "1px solid var(--basil-green-800)"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      padding: "4px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-pill)",
      ...tones,
      ...style
    }
  }, rest), children);
}

export default Tag;
