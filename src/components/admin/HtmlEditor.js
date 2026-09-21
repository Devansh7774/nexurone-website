'use client';

import { Code2 } from 'lucide-react';

export default function HtmlEditor({ value, onChange, placeholder }) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-white">
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border-b border-slate-200 bg-slate-100 text-xs text-slate-600">
        <Code2 className="w-3.5 h-3.5 text-[#2f6bff] flex-shrink-0" />
        <span className="font-semibold text-slate-700">HTML</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="editor-content-scroll flex-1 min-h-0 w-full overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed bg-slate-950 text-emerald-100 placeholder-slate-500 outline-none resize-none focus:ring-2 focus:ring-inset focus:ring-[#2f6bff]/30"
      />
    </div>
  );
}
