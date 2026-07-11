import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Swatch — the color specimen tile from the brand's color pages. A rounded
 * chip with a hairline inset border, beside the token name, hex and rgb.
 * Faithful to the source swatch (160×56 chip, 12px radius, inset stroke).
 */
function Swatch({
  name,
  hex,
  rgb,
  chipWidth = 160,
  style,
  ...rest
}) {
  const rgbText = rgb || (hex ? `rgb(${hexToRgb(hex).join(", ")})` : "");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      height: 56,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: chipWidth,
      height: 56,
      flexShrink: 0,
      borderRadius: "var(--radius-md)",
      background: hex,
      boxShadow: "var(--shadow-inset-hairline)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--text-body-md)",
      lineHeight: "20px",
      color: "var(--black)"
    }
  }, name), hex && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: "16px",
      color: "#8e98a8"
    }
  }, hex), rgbText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      lineHeight: "16px",
      color: "#8e98a8"
    }
  }, rgbText)));
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}

export default Swatch;
