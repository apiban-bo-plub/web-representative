import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Divisions — the brand's thin rule. Defaults to the gold hairline used under
 * section headings; supports an optional centered label and vertical mode.
 */
function Divisions({
  label,
  tone = "gold",
  vertical = false,
  style,
  ...rest
}) {
  const lineColor = {
    gold: "var(--border-hairline)",
    soft: "var(--border-soft)",
    onDark: "rgba(240,235,226,0.4)"
  }[tone];
  if (vertical) {
    return /*#__PURE__*/React.createElement("span", _extends({
      role: "separator",
      "aria-orientation": "vertical",
      style: {
        display: "inline-block",
        width: 0,
        alignSelf: "stretch",
        borderLeft: `var(--hairline) solid ${lineColor}`,
        ...style
      }
    }, rest));
  }
  const line = {
    flex: 1,
    height: 0,
    borderTop: `var(--hairline) solid ${lineColor}`
  };
  if (!label) {
    return /*#__PURE__*/React.createElement("hr", _extends({
      role: "separator",
      style: {
        ...line,
        border: "none",
        borderTop: `var(--hairline) solid ${lineColor}`,
        margin: "var(--space-4) 0"
      }
    }, rest));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      margin: "var(--space-4) 0",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: line
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: tone === "onDark" ? "var(--text-on-dark)" : "var(--brand-gold)",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: line
  }));
}

export default Divisions;
