"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";
import { CodeXml, Eye } from "lucide-react";

type HtmlEmailEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const HtmlEmailEditor = ({
  value,
  onChange,
}: HtmlEmailEditorProps) => {
  const previewDocument = useMemo(() => {
    const safeHtml = DOMPurify.sanitize(value, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: [
        "script",
        "iframe",
        "object",
        "embed",
        "form",
        "input",
        "button",
      ],
      FORBID_ATTR: ["srcdoc"],
    });

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <style>
    html, body {
      margin: 0;
      min-height: 100%;
    }
    body {
      box-sizing: border-box;
      padding: 20px;
      color: #334155;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      overflow-wrap: anywhere;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    table {
      max-width: 100%;
    }
    a {
      overflow-wrap: anywhere;
    }
  </style>
</head>
<body>
  ${safeHtml || "<p>Your email preview will appear here.</p>"}
</body>
</html>`;
  }, [value]);

  return (
    <div className="grid min-w-0 gap-4 p-4 md:px-6 lg:grid-cols-2">
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3 py-2">
          <CodeXml size={17} className="text-slate-500" />
          <h4 className="text-sm font-semibold text-slate-700">
            HTML Source
          </h4>
        </div>

        <textarea
          aria-label="HTML email source"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          placeholder="Write your HTML email..."
          className="min-h-[150px] w-full sidebar-scroll resize-y p-3 font-mono text-xs leading-6 text-slate-700 outline-none placeholder:text-slate-300"
        />
      </section>

      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3 py-2">
          <Eye size={17} className="text-slate-500" />
          <h4 className="text-sm font-semibold text-slate-700">
            Live Preview
          </h4>
          <span className="ml-auto rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600">
            Live
          </span>
        </div>

        <div className="bg-slate-100 p-2">
          <iframe
            title="HTML email preview"
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={previewDocument}
            className="h-[150px] w-full rounded-lg border-0 bg-white"
          />
        </div>
      </section>
    </div>
  );
};