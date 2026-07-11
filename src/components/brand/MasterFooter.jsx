import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MasterFooter — the brand's running document footer ("Master Footer" in source).
 * A space-between row in Baskerville: a left label and a right label
 * (page number / year), separated by generous vertical padding.
 */
function MasterFooter({
  left = "BRAND GUIDELINE",
  right = "2024",
  variant = "muted",
  style,
  ...rest
}) {
  const color = {
    muted: "var(--grey-800)",
    ink: "var(--text-strong)",
    onDark: "var(--text-on-dark)"
  }[variant];
  const label = {
    fontFamily: "var(--font-serif)",
    fontWeight: "var(--fw-regular)",
    fontSize: "18px",
    letterSpacing: "var(--tracking-display)",
    color,
    margin: 0
  };
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "var(--space-5) 0",
      borderTop: "var(--hairline) solid var(--border-hairline)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: label
  }, left), /*#__PURE__*/React.createElement("span", {
    style: {
      ...label,
      textAlign: "right"
    }
  }, right));
}

export default MasterFooter;
