'use client';

import { AlertTriangle, Loader2, X } from 'lucide-react';

export default function UnsavedChangesModal({
  open,
  loading = false,
  onCancel,
  onDiscard,
  onSaveAndLeave,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unsaved-changes-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#00102A]/40 backdrop-blur-[2px]"
        onClick={onCancel}
        aria-label="Close dialog"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,16,42,0.18)] border border-gray-100 overflow-hidden">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="min-w-0 pr-6">
              <h2 id="unsaved-changes-title" className="text-lg font-bold text-[#00102A]">
                Unsaved changes
              </h2>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                You have unsaved changes on this post. Save your draft before leaving, or your edits will be lost.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Keep editing
          </button>
          <button
            type="button"
            onClick={onDiscard}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-white border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
          >
            Leave without saving
          </button>
          <button
            type="button"
            onClick={onSaveAndLeave}
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white nexuron-btn-solid"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save &amp; leave
          </button>
        </div>
      </div>
    </div>
  );
}
