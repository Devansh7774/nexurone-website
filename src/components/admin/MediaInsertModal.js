'use client';

import { useState } from 'react';
import { X, ImageIcon, Play, MousePointerClick } from 'lucide-react';
import {
  MEDIA_SIZES,
  BUTTON_VARIANTS,
  parseYoutubeId,
  buildImageFigureHtml,
  buildYoutubeFigureHtml,
  buildStandaloneImageHtml,
  buildButtonHtml,
} from '@/lib/mediaBlockBuilders';

import AdminSelect from '@/components/ui/AdminSelect';

const inputClass =
  'w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/15 placeholder-slate-400 transition-[border-color,box-shadow] duration-200';

const labelClass = 'block text-xs font-semibold text-slate-700 mb-1';

function Field({ label, hint, children, required }) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required ? <span className="text-red-500 ml-0.5">*</span> : null}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

export function ImageInsertModal({ onClose, onInsert, variant = 'figure' }) {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [size, setSize] = useState('full');
  const [align, setAlign] = useState('center');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const url = src.trim();
    if (!url) {
      setError('Image URL is required.');
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      setError('Image URL must start with http:// or https://');
      return;
    }
    if (!alt.trim()) {
      setError('Alt text is required for accessibility.');
      return;
    }

    onInsert(
      variant === 'inline'
        ? buildStandaloneImageHtml({ src: url, alt: alt.trim(), title: title.trim(), size, align })
        : buildImageFigureHtml({ src: url, alt: alt.trim(), title: title.trim(), caption: caption.trim(), size, align }),
      variant === 'inline' ? 'Image' : 'Image + caption'
    );
    onClose();
  }

  return (
    <ModalShell icon={ImageIcon} title="Insert image" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Image URL" required hint="Paste a direct image link (https://...)">
          <input className={inputClass} value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://example.com/photo.jpg" />
        </Field>
        <Field label="Alt text" required hint="Describes the image for screen readers & SEO">
          <input className={inputClass} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Team collaborating on a project" />
        </Field>
        <Field label="Title (optional)" hint="Shown on hover — extra description">
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional image title" />
        </Field>
        <Field label="Caption (optional)" hint="Text displayed below the image">
          <input className={inputClass} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Photo credit or description" disabled={variant === 'inline'} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Size">
            <AdminSelect value={size} onChange={(e) => setSize(e.target.value)}>
              {Object.entries(MEDIA_SIZES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Alignment">
            <AdminSelect value={align} onChange={(e) => setAlign(e.target.value)}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </AdminSelect>
          </Field>
        </div>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <ModalActions onClose={onClose} submitLabel="Insert image" />
      </form>
    </ModalShell>
  );
}

export function ButtonInsertModal({ onClose, onInsert }) {
  const [label, setLabel] = useState('Get started');
  const [actionType, setActionType] = useState('link');
  const [href, setHref] = useState('/contact');
  const [onclick, setOnclick] = useState("alert('Hello from Nexuron!');");
  const [variant, setVariant] = useState('primary');
  const [align, setAlign] = useState('left');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!label.trim()) {
      setError('Button label is required.');
      return;
    }

    if (actionType === 'link' && !href.trim()) {
      setError('Link URL is required for link buttons.');
      return;
    }

    if (actionType === 'onclick' && !onclick.trim()) {
      setError('On click JavaScript is required.');
      return;
    }

    onInsert(
      buildButtonHtml({
        label: label.trim(),
        href: actionType === 'link' ? href.trim() : '',
        onclick: actionType === 'onclick' ? onclick.trim() : '',
        variant,
        align,
        openInNewTab: actionType === 'link' && openInNewTab,
      }),
      'Button'
    );
    onClose();
  }

  return (
    <ModalShell icon={MousePointerClick} title="Insert button" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Button text" required>
          <input className={inputClass} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Get started" />
        </Field>

        <Field label="Action type" hint="Link opens a page. On click runs custom JavaScript.">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActionType('link')}
              className={`text-sm font-medium rounded-lg py-2 border transition ${
                actionType === 'link'
                  ? 'bg-[#2f6bff] text-white border-[#2f6bff]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              Link
            </button>
            <button
              type="button"
              onClick={() => setActionType('onclick')}
              className={`text-sm font-medium rounded-lg py-2 border transition ${
                actionType === 'onclick'
                  ? 'bg-[#2f6bff] text-white border-[#2f6bff]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              On click
            </button>
          </div>
        </Field>

        {actionType === 'link' ? (
          <>
            <Field label="Link URL" required hint="e.g. /contact or https://example.com">
              <input className={inputClass} value={href} onChange={(e) => setHref(e.target.value)} placeholder="/contact" />
            </Field>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded border-slate-300"
              />
              Open in new tab
            </label>
          </>
        ) : (
          <Field label="On click (JavaScript)" required hint="Example: window.location.href='/contact' or alert('Hi!')">
            <textarea
              className={`${inputClass} resize-none font-mono text-xs`}
              rows={3}
              value={onclick}
              onChange={(e) => setOnclick(e.target.value)}
              placeholder="window.location.href='/contact'"
            />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Style">
            <AdminSelect value={variant} onChange={(e) => setVariant(e.target.value)}>
              {Object.entries(BUTTON_VARIANTS).map(([key, { label: optionLabel }]) => (
                <option key={key} value={key}>{optionLabel}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Alignment">
            <AdminSelect value={align} onChange={(e) => setAlign(e.target.value)}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </AdminSelect>
          </Field>
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <ModalActions onClose={onClose} submitLabel="Insert button" />
      </form>
    </ModalShell>
  );
}

export function VideoInsertModal({ onClose, onInsert }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [size, setSize] = useState('large');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const videoId = parseYoutubeId(url);
    if (!videoId) {
      setError('Enter a valid YouTube link or 11-character video ID.');
      return;
    }

    if (!title.trim()) {
      setError('Video title is required for accessibility.');
      return;
    }

    onInsert(
      buildYoutubeFigureHtml({
        videoId,
        title: title.trim(),
        caption: caption.trim(),
        size,
      }),
      'YouTube video'
    );
    onClose();
  }

  return (
    <ModalShell icon={Play} title="Insert YouTube video" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="YouTube URL or video ID" required hint="e.g. https://youtube.com/watch?v=abc123 or youtu.be/abc123">
          <input className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>
        <Field label="Video title" required hint="Used for accessibility (iframe title)">
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="How we built our platform" />
        </Field>
        <Field label="Caption (optional)" hint="Short description below the video">
          <input className={inputClass} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Watch our product walkthrough" />
        </Field>
        <Field label="Size">
          <AdminSelect value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.entries(MEDIA_SIZES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </AdminSelect>
        </Field>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <ModalActions onClose={onClose} submitLabel="Insert video" />
      </form>
    </ModalShell>
  );
}

function ModalShell({ icon: Icon, title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-modal-title"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#2f6bff]" />
            <h2 id="media-modal-title" className="text-sm font-bold text-slate-800">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function ModalActions({ onClose, submitLabel }) {
  return (
    <div className="flex gap-2 pt-1">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 text-sm font-semibold text-white nexuron-btn-solid"
      >
        {submitLabel}
      </button>
    </div>
  );
}
