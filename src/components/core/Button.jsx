import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — branded action control. Not defined in the source (a print/
 * packaging system); added so consumers can build on-brand interfaces.
 * Aesthetic: Inter medium, small-caps tracking, calm hover/press.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "12px"
    },
    md: {
      padding: "12px 24px",
      fontSize: "13px"
    },
    lg: {
      padding: "16px 32px",
      fontSize: "14px"
    }
  }[size];
  const variants = {
    primary: {
      background: "var(--basil-green-800)",
      color: "var(--makara-100)",
      border: "1px solid var(--basil-green-800)",
      "--hover-bg": "var(--basil-green-900)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid var(--brown-500)",
      "--hover-bg": "var(--makara-200)"
    },
    gold: {
      background: "var(--spring-wood-600)",
      color: "var(--brown-700)",
      border: "1px solid var(--spring-wood-600)",
      "--hover-bg": "var(--spring-wood-700)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "1px solid transparent",
      "--hover-bg": "var(--makara-200)"
    }
  }[variant];
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "apb-btn",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      ...sizes,
      ...variants,
      ...style
    }
  }, rest), children, /*#__PURE__*/React.createElement("style", null, `
        .apb-btn:hover { background: var(--hover-bg) !important; }
        .apb-btn:active { transform: scale(0.98); }
        .apb-btn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
      `));
}

export default Button;
