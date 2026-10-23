import "server-only";
import sanitizeHtml from "sanitize-html";

const cssLength = /^(?:auto|0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|pt|em|rem|%)?)$/i;
const cssSpacing = /^(?:auto|0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|pt|em|rem|%)?)(?:\s+(?:auto|0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|pt|em|rem|%)?)){0,3}$/i;
const cssColor = /^(?:#[0-9a-f]{3,8}|[a-z]{1,24}|rgba?\(\s*[\d.,%\s]+\))$/i;

export function sanitizeEmailHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      "*": [
        "style",
        "class",
        "align",
        "valign",
        "width",
        "height",
        "bgcolor",
        "role",
      ],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      table: ["width", "align", "cellpadding", "cellspacing", "border", "role", "style"],
      td: ["colspan", "rowspan", "align", "valign", "width", "height", "bgcolor", "style"],
      th: ["colspan", "rowspan", "scope", "align", "valign", "width", "height", "bgcolor", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    allowedStyles: {
      "*": {
        color: [cssColor],
        "background-color": [cssColor],
        "font-family": [/^[a-zA-Z0-9\s"',.-]{1,120}$/],
        "font-size": [/^(?:\d+(?:\.\d+)?)(?:px|pt|em|rem|%)$/i],
        "font-weight": [/^(?:normal|bold|[1-9]00)$/i],
        "font-style": [/^(?:normal|italic|oblique)$/i],
        "line-height": [/^(?:\d+(?:\.\d+)?)(?:px|pt|em|rem|%)?$/i],
        "text-align": [/^(?:left|right|center|justify)$/i],
        "text-decoration": [/^(?:none|underline|line-through)$/i],
        display: [/^(?:block|inline|inline-block|table|table-cell)$/i],
        margin: [cssSpacing],
        "margin-top": [cssLength],
        "margin-right": [cssLength],
        "margin-bottom": [cssLength],
        "margin-left": [cssLength],
        padding: [cssSpacing],
        "padding-top": [cssLength],
        "padding-right": [cssLength],
        "padding-bottom": [cssLength],
        "padding-left": [cssLength],
        width: [cssLength],
        "max-width": [cssLength],
        height: [cssLength],
        "border-radius": [/^(?:\d+(?:\.\d+)?)(?:px|pt|em|rem|%)$/i],
        "vertical-align": [/^(?:top|middle|bottom|baseline)$/i],
      },
    },
  });
}