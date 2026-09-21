'use client';

import { useRef, useEffect, useCallback, useState, useImperativeHandle, forwardRef } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link2, Link2Off, Quote, Minus,
  Heading1, Heading2, Heading3, Heading4, Pilcrow, ImageIcon, AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2, Highlighter, Code, Table, Eraser, IndentIncrease, IndentDecrease, Trash2,
} from 'lucide-react';
import { ImageInsertModal } from './MediaInsertModal';

function ToolbarButton({ onClick, active, title, children, disabled }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={`inline-flex items-center justify-center h-7 w-7 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'bg-[#2f6bff] text-white'
          : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <div className="w-px h-5 bg-slate-300 mx-0.5 flex-shrink-0" aria-hidden />;
}


function normalizeBlockTag(tag) {
  const clean = String(tag).replace(/[<>]/g, '').toLowerCase();
  return `<${clean}>`;
}

function wrapDesignBlock(html) {
  return `<div class="design-block" data-design-block="true">${html}</div>`;
}

function stripEditorChrome(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('.design-block-remove').forEach((btn) => btn.remove());
  return tmp.innerHTML;
}

function decorateDesignBlocks(editorEl) {
  if (!editorEl) return;
  editorEl.querySelectorAll('[data-design-block]').forEach((block) => {
    if (block.querySelector('.design-block-remove')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'design-block-remove';
    btn.setAttribute('data-action', 'remove-design-block');
    btn.setAttribute('contenteditable', 'false');
    btn.title = 'Remove block';
    btn.setAttribute('aria-label', 'Remove block');
    btn.textContent = 'Remove';
    block.appendChild(btn);
  });
}

function getActiveBlockTag(editorEl) {
  if (!editorEl) return 'p';
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 'p';

  let node = sel.anchorNode;
  if (!node) return 'p';
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;

  while (node && node !== editorEl) {
    const tag = node.nodeName?.toLowerCase();
    if (['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'li', 'pre'].includes(tag)) {
      return tag === 'li' ? 'p' : tag;
    }
    node = node.parentElement;
  }

  try {
    const val = document.queryCommandValue('formatBlock');
    if (val) {
      const match = val.match(/h[1-4]|p|blockquote|pre/i);
      if (match) return match[0].toLowerCase();
    }
  } catch {
    // ignore
  }

  return 'p';
}

function getActiveInline() {
  try {
    return {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
    };
  } catch {
    return { bold: false, italic: false, underline: false, strikeThrough: false };
  }
}

const SIMPLE_TABLE_HTML = `<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;">
  <thead>
    <tr style="background:#00102a;color:#fff;">
      <th style="padding:10px 14px;text-align:left;border:1px solid #1e293b;">Header 1</th>
      <th style="padding:10px 14px;text-align:left;border:1px solid #1e293b;">Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 14px;border:1px solid #e2e8f0;">Cell 1</td>
      <td style="padding:10px 14px;border:1px solid #e2e8f0;">Cell 2</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="padding:10px 14px;border:1px solid #e2e8f0;">Cell 3</td>
      <td style="padding:10px 14px;border:1px solid #e2e8f0;">Cell 4</td>
    </tr>
  </tbody>
</table>`;

export default forwardRef(function RichTextEditor({ value, onChange, placeholder }, ref) {
  const editorRef = useRef(null);
  const lastValueRef = useRef(undefined);
  const [activeBlock, setActiveBlock] = useState('p');
  const [showImageModal, setShowImageModal] = useState(false);
  const [inline, setInline] = useState({
    bold: false, italic: false, underline: false, strikeThrough: false,
  });

  const emitChange = useCallback(() => {
    const el = editorRef.current;
    if (el) decorateDesignBlocks(el);
    const raw = el?.innerHTML ?? '';
    const cleaned = stripEditorChrome(raw === '<br>' ? '' : raw);
    lastValueRef.current = cleaned;
    onChange(cleaned);
    setActiveBlock(getActiveBlockTag(editorRef.current));
    setInline(getActiveInline());
    return cleaned;
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    flush: () => emitChange(),
    getHtml: () => stripEditorChrome(editorRef.current?.innerHTML ?? ''),
    insertHtml: (html, options = {}) => {
      const el = editorRef.current;
      if (!el) return '';
      const content = options.wrapAsBlock ? wrapDesignBlock(html) : html;
      el.focus();
      const sel = window.getSelection();
      const cursorInEditor = sel?.anchorNode && el.contains(sel.anchorNode);

      if (cursorInEditor) {
        document.execCommand('insertHTML', false, `${content}<p><br></p>`);
      } else {
        const spacer = el.innerHTML.trim() ? '<p><br></p>' : '';
        el.innerHTML = `${el.innerHTML}${spacer}${content}<p><br></p>`;
      }
      decorateDesignBlocks(el);
      return emitChange();
    },
  }));

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (lastValueRef.current === undefined || value !== lastValueRef.current) {
      el.innerHTML = value || '';
      lastValueRef.current = value || '';
      decorateDesignBlocks(el);
    }
  }, [value]);

  useEffect(() => {
    function onSelectionChange() {
      if (!editorRef.current) return;
      const sel = window.getSelection();
      if (!sel || !sel.anchorNode) return;
      if (!editorRef.current.contains(sel.anchorNode)) return;
      setActiveBlock(getActiveBlockTag(editorRef.current));
      setInline(getActiveInline());
    }

    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, []);

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command, val = null) {
    focusEditor();
    document.execCommand(command, false, val);
    emitChange();
  }

  function setBlock(tag) {
    const el = editorRef.current;
    if (!el) return;

    focusEditor();
    const block = normalizeBlockTag(tag);
    const tagName = tag.replace(/[<>]/g, '').toLowerCase();

    document.execCommand('formatBlock', false, block);

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let node = sel.anchorNode;
      if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;
      const current = node?.nodeName?.toLowerCase();
      if (current !== tagName && ['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'pre'].includes(tagName)) {
        const range = sel.getRangeAt(0);
        const blockEl = document.createElement(tagName);
        if (range.collapsed) {
          blockEl.innerHTML = '<br>';
        } else {
          blockEl.appendChild(range.extractContents());
        }
        range.insertNode(blockEl);
        const newRange = document.createRange();
        newRange.selectNodeContents(blockEl);
        newRange.collapse(false);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }

    emitChange();
  }

  function wrapSelection(tag, attrs = {}) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    focusEditor();
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.appendChild(range.extractContents());
    range.insertNode(el);

    const newRange = document.createRange();
    newRange.selectNodeContents(el);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
    emitChange();
  }

  function insertLink() {
    const url = window.prompt('Link URL (include https://)');
    if (!url?.trim()) return;
    const trimmed = url.trim();
    runCommand('createLink', trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  }

  function insertImage() {
    setShowImageModal(true);
  }

  function handleImageModalInsert(html) {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    const cursorInEditor = sel?.anchorNode && el.contains(sel.anchorNode);

    if (cursorInEditor) {
      document.execCommand('insertHTML', false, html);
    } else {
      const spacer = el.innerHTML.trim() ? '<p><br></p>' : '';
      el.innerHTML = `${el.innerHTML}${spacer}${html}<p><br></p>`;
    }
    emitChange();
  }

  function insertCodeBlock() {
    focusEditor();
    const codeHtml = '<pre style="background:#0f172a;color:#e2e8f0;padding:1rem;border-radius:8px;overflow-x:auto;margin:1rem 0;font-size:0.875rem;"><code>// Your code here</code></pre>';
    document.execCommand('insertHTML', false, `${wrapDesignBlock(codeHtml)}<p><br></p>`);
    decorateDesignBlocks(editorRef.current);
    emitChange();
  }

  function insertTable() {
    focusEditor();
    document.execCommand('insertHTML', false, `${wrapDesignBlock(SIMPLE_TABLE_HTML)}<p><br></p>`);
    decorateDesignBlocks(editorRef.current);
    emitChange();
  }

  function deleteSelectedBlock() {
    const el = editorRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    let node = sel.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;

    while (node && node !== el) {
      if (node.hasAttribute?.('data-design-block')) {
        node.remove();
        emitChange();
        return;
      }
      if (node.parentElement === el && !['P', 'BR'].includes(node.nodeName)) {
        node.remove();
        emitChange();
        return;
      }
      node = node.parentElement;
    }
  }

  function handleEditorClick(e) {
    const btn = e.target.closest?.('[data-action="remove-design-block"]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const block = btn.closest('[data-design-block]');
    if (block) {
      block.remove();
      emitChange();
    }
  }

  function handleKeyDown(e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    const shortcuts = {
      b: () => runCommand('bold'),
      i: () => runCommand('italic'),
      u: () => runCommand('underline'),
      z: () => runCommand('undo'),
      y: () => runCommand('redo'),
    };
    if (shortcuts[key]) {
      e.preventDefault();
      shortcuts[key]();
    }
  }

  return (
    <>
      {showImageModal && (
        <ImageInsertModal
          variant="inline"
          onClose={() => setShowImageModal(false)}
          onInsert={handleImageModalInsert}
        />
      )}
    <div className="flex flex-col flex-1 min-h-0 h-full bg-white">
      <div className="flex-shrink-0 z-10 border-b border-slate-200 bg-slate-100 px-2 py-1.5">
        <div className="flex flex-wrap items-center gap-0.5">
          <ToolbarButton onClick={() => setBlock('h1')} active={activeBlock === 'h1'} title="Heading 1">
            <Heading1 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setBlock('h2')} active={activeBlock === 'h2'} title="Heading 2">
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setBlock('h3')} active={activeBlock === 'h3'} title="Heading 3">
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setBlock('h4')} active={activeBlock === 'h4'} title="Heading 4">
            <Heading4 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setBlock('p')} active={activeBlock === 'p'} title="Paragraph">
            <Pilcrow className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setBlock('blockquote')} active={activeBlock === 'blockquote'} title="Quote">
            <Quote className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarSep />

          <ToolbarButton onClick={() => runCommand('bold')} active={inline.bold} title="Bold (Ctrl+B)">
            <Bold className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('italic')} active={inline.italic} title="Italic (Ctrl+I)">
            <Italic className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('underline')} active={inline.underline} title="Underline (Ctrl+U)">
            <Underline className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('strikeThrough')} active={inline.strikeThrough} title="Strikethrough">
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => wrapSelection('mark')} title="Highlight">
            <Highlighter className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => wrapSelection('code')} title="Inline code">
            <Code className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarSep />

          <ToolbarButton onClick={() => runCommand('insertUnorderedList')} title="Bullet list">
            <List className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('insertOrderedList')} title="Numbered list">
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('indent')} title="Indent">
            <IndentIncrease className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('outdent')} title="Outdent">
            <IndentDecrease className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarSep />

          <ToolbarButton onClick={() => runCommand('justifyLeft')} title="Align left">
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('justifyCenter')} title="Align center">
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('justifyRight')} title="Align right">
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarSep />

          <ToolbarButton onClick={insertLink} title="Insert link">
            <Link2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('unlink')} title="Remove link">
            <Link2Off className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert image">
            <ImageIcon className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={insertTable} title="Insert table">
            <Table className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={insertCodeBlock} title="Code block">
            <Code className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={deleteSelectedBlock} title="Remove block (click inside a block first)">
            <Trash2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('insertHorizontalRule')} title="Horizontal line">
            <Minus className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarSep />

          <ToolbarButton onClick={() => runCommand('undo')} title="Undo (Ctrl+Z)">
            <Undo2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('redo')} title="Redo (Ctrl+Y)">
            <Redo2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('removeFormat')} title="Clear formatting">
            <Eraser className="w-3.5 h-3.5" />
          </ToolbarButton>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        onKeyUp={emitChange}
        onMouseUp={emitChange}
        onClick={handleEditorClick}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        className="rich-text-editor editor-content-scroll flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-inset focus:ring-[#2f6bff]/20"
      />
    </div>
    </>
  );
});
