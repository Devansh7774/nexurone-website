'use client';

import { useState, useRef, useEffect, useMemo, Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';

function parseOptions(children) {
  const options = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === 'option') {
      options.push({
        value: child.props.value ?? '',
        label: child.props.children ?? child.props.value ?? '',
      });
    }
  });

  return options;
}

export default function AdminSelect({
  className = '',
  name,
  value,
  onChange,
  disabled = false,
  placeholder = 'Select…',
  children,
}) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const options = useMemo(() => parseOptions(children), [children]);
  const selected = options.find((opt) => String(opt.value) === String(value ?? ''));

  function updateMenuPosition() {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 8;
    const maxMenuHeight = 224;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const openUp = spaceBelow < maxMenuHeight && spaceAbove > spaceBelow;

    setMenuStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      top: openUp ? undefined : rect.bottom + gap,
      bottom: openUp ? window.innerHeight - rect.top + gap : undefined,
    });
  }

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    function handlePointerDown(e) {
      if (
        !triggerRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    function handleReposition() {
      updateMenuPosition();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open]);

  function selectOption(nextValue) {
    if (disabled) return;
    setOpen(false);
    onChange?.({
      target: { name, value: nextValue },
      currentTarget: { name, value: nextValue },
    });
  }

  function toggleOpen() {
    if (disabled) return;
    setOpen((prev) => !prev);
  }

  const menu = open && menuStyle && typeof document !== 'undefined'
    ? createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-label={name || 'Select option'}
          style={menuStyle}
          className="py-1.5 bg-white border border-gray-200 rounded-xl shadow-[0_12px_40px_rgba(0,16,42,0.12)] ring-1 ring-black/5 overflow-hidden"
        >
          <ul className="max-h-56 overflow-y-auto custom-scrollbar">
            {options.map((opt) => {
              const isSelected = String(opt.value) === String(value ?? '');
              return (
                <li key={String(opt.value)}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectOption(opt.value)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                      isSelected
                        ? 'bg-[#E5F0F9] text-[#2667ff] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 flex-shrink-0 text-[#2667ff]" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>,
        document.body
      )
    : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        className={`admin-select w-full flex items-center justify-between gap-3 bg-white border rounded-xl pl-4 pr-3 py-2.5 text-[14px] font-medium outline-none transition-all duration-200 shadow-sm text-left ${
          disabled
            ? 'border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50'
            : open
              ? 'border-[#2667ff] ring-4 ring-[#2667ff]/10 text-gray-900'
              : 'border-gray-200 text-gray-900 hover:border-gray-300 focus:border-[#2667ff] focus:ring-4 focus:ring-[#2667ff]/10'
        }`}
      >
        <span className={`truncate ${selected ? 'text-gray-900' : 'text-gray-400'}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#2667ff]' : ''
          }`}
          aria-hidden
        />
      </button>

      {menu}
    </div>
  );
}
