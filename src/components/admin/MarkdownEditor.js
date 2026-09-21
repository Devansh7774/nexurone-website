'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function editorHeightPx() {
  if (typeof window === 'undefined') return 640;
  const h = Math.floor(window.innerHeight - 320);
  return Math.min(960, Math.max(480, h));
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full min-h-[480px] bg-gray-100 rounded-b-xl animate-pulse flex items-center justify-center border border-gray-200 border-t-0"
      style={{ height: 'min(75vh, 680px)' }}
    >
      <span className="text-gray-500 text-base">Loading editor…</span>
    </div>
  ),
});

/** Hide built-in preview — parent BlogEditor handles Write / Preview. */
function filterToolbarCommands(command) {
  if (['preview', 'fullscreen'].includes(command.name)) return false;
  return command;
}

export default function MarkdownEditor({ value, onChange }) {
  const [height, setHeight] = useState(640);

  useEffect(() => {
    function update() {
      setHeight(editorHeightPx());
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      data-color-mode="light"
      className="blog-md-editor w-full [&_.w-md-editor]:!shadow-none [&_.w-md-editor]:!rounded-none [&_.w-md-editor]:!border-0 [&_.w-md-editor-toolbar]:!min-h-[44px] [&_.w-md-editor-toolbar]:!px-2 [&_.w-md-editor-toolbar]:!bg-gray-50 [&_.w-md-editor-toolbar]:!border-b [&_.w-md-editor-toolbar]:!border-gray-200 [&_.w-md-editor-toolbar_li_button]:!w-9 [&_.w-md-editor-toolbar_li_button]:!h-9 [&_.w-md-editor-toolbar_li_button_svg]:!w-[18px] [&_.w-md-editor-toolbar_li_button_svg]:!h-[18px] [&_.w-md-editor-text]:!text-base [&_.w-md-editor-text]:!leading-relaxed [&_.w-md-editor-text-pre]:!text-base"
    >
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview="edit"
        visibleDragbar={false}
        commandsFilter={filterToolbarCommands}
        textareaProps={{
          placeholder: 'Write your post here… Use the toolbar above for headings, bold, lists, and links.',
        }}
        style={{
          backgroundColor: 'rgb(255 255 255)',
          fontSize: '16px',
        }}
      />
    </div>
  );
}
