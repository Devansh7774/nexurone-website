'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import {
  format,
  parse,
  startOfDay,
  startOfMonth,
  endOfMonth,
  isAfter,
  isValid,
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react';
import 'react-day-picker/style.css';

const CALENDAR_START = new Date(2018, 0, 1);

function todayStart() {
  return startOfDay(new Date());
}

function parseYmd(value) {
  if (!value) return undefined;
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(date) ? startOfDay(date) : undefined;
}

function toYmd(date) {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
}

function clampToToday(date) {
  if (!date) return undefined;
  const today = todayStart();
  return isAfter(startOfDay(date), today) ? today : startOfDay(date);
}

function formatRangeLabel(from, to) {
  if (!from && !to) return 'Pick dates';
  if (from && to) {
    if (toYmd(from) === toYmd(to)) return format(from, 'MMM d, yyyy');
    return `${format(from, 'MMM d, yyyy')} – ${format(to, 'MMM d, yyyy')}`;
  }
  if (from) return `${format(from, 'MMM d, yyyy')} – …`;
  return format(to, 'MMM d, yyyy');
}

export default function QueriesDateRangePicker({ from = '', to = '', onApply, onClear }) {
  const today = useMemo(() => todayStart(), []);
  const endMonth = useMemo(() => endOfMonth(today), [today]);

  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const [range, setRange] = useState(() => ({
    from: clampToToday(parseYmd(from)),
    to: clampToToday(parseYmd(to)),
  }));
  const [month, setMonth] = useState(
    () => clampToToday(parseYmd(from)) || today
  );

  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const nextFrom = clampToToday(parseYmd(from));
    const nextTo = clampToToday(parseYmd(to));
    setRange({ from: nextFrom, to: nextTo });
    if (nextFrom) setMonth(nextFrom);
  }, [from, to]);

  function updateMenuPosition() {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 8;
    const menuWidth = Math.min(360, window.innerWidth - 24);
    const left = Math.min(rect.left, window.innerWidth - menuWidth - 12);
    const estimatedHeight = 420;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const openUp = spaceBelow < estimatedHeight && rect.top > spaceBelow;

    setMenuStyle({
      position: 'fixed',
      left: Math.max(12, left),
      width: menuWidth,
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

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [open]);

  function handleSelect(next) {
    if (!next) {
      setRange({ from: undefined, to: undefined });
      return;
    }

    setRange({
      from: clampToToday(next.from),
      to: clampToToday(next.to),
    });
  }

  function apply() {
    const start = clampToToday(range?.from);
    if (!start) return;

    let end = clampToToday(range?.to || range?.from) || start;
    if (isAfter(start, end)) {
      end = start;
    }

    onApply?.({
      from: toYmd(start),
      to: toYmd(end),
    });
    setOpen(false);
  }

  function clear() {
    setRange({ from: undefined, to: undefined });
    setMonth(today);
    onClear?.();
    setOpen(false);
  }

  const selectedFrom = clampToToday(parseYmd(from));
  const selectedTo = clampToToday(parseYmd(to));
  const hasValue = Boolean(from || to);
  const label = formatRangeLabel(selectedFrom, selectedTo);

  const menu =
    open && menuStyle && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={menuRef}
            style={menuStyle}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_40px_rgba(0,16,42,0.12)] ring-1 ring-black/5"
          >
            <p className="mb-2 px-1 text-xs text-slate-500">
              Select a start and end date. Future dates are disabled.
            </p>

            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonth}
              numberOfMonths={1}
              captionLayout="dropdown"
              startMonth={startOfMonth(CALENDAR_START)}
              endMonth={endMonth}
              disabled={{ after: today }}
              excludeDisabled
              showOutsideDays
              fixedWeeks
              defaultMonth={selectedFrom || today}
              className="queries-day-picker mx-auto"
            />

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={clear}
                className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-slate-500 sm:inline">
                  {range?.from
                    ? formatRangeLabel(range.from, range.to || range.from)
                    : 'No dates selected'}
                </span>
                <button
                  type="button"
                  onClick={apply}
                  disabled={!range?.from}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="relative w-full sm:w-auto">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex h-10 w-full min-w-[12rem] items-center justify-between gap-2 rounded-xl border bg-white px-3 text-sm font-medium transition sm:w-auto ${
          open || hasValue
            ? 'border-blue-300 text-slate-900 ring-2 ring-blue-100'
            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarIcon className="h-4 w-4 shrink-0 text-blue-600" />
          <span className={`truncate ${hasValue ? 'text-slate-900' : 'text-slate-500'}`}>
            {label}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {menu}

      <style>{`
        .queries-day-picker {
          --rdp-accent-color: #2563eb;
          --rdp-accent-background-color: #dbeafe;
          --rdp-range_start-date-background-color: #2563eb;
          --rdp-range_end-date-background-color: #2563eb;
          --rdp-range_middle-background-color: #eff6ff;
          --rdp-today-color: #2563eb;
          --rdp-disabled-opacity: 0.35;
          font-size: 0.875rem;
        }
        .queries-day-picker .rdp-months {
          justify-content: center;
        }
        .queries-day-picker .rdp-month_caption {
          font-weight: 600;
          color: #0f172a;
        }
        .queries-day-picker .rdp-dropdowns {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .queries-day-picker .rdp-dropdown {
          appearance: none;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          color: #0f172a;
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.35rem 1.75rem 0.35rem 0.6rem;
        }
        .queries-day-picker .rdp-dropdown:hover,
        .queries-day-picker .rdp-dropdown:focus {
          border-color: #93c5fd;
          outline: none;
        }
        .queries-day-picker .rdp-caption_label {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          pointer-events: none;
        }
        .queries-day-picker .rdp-weekday {
          color: #64748b;
          font-size: 0.75rem;
        }
        .queries-day-picker .rdp-day_button {
          border-radius: 0.5rem;
        }
        .queries-day-picker .rdp-selected .rdp-day_button {
          border: none;
        }
        .queries-day-picker .rdp-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .queries-day-picker .rdp-outside {
          opacity: 0.45;
        }
      `}</style>
    </div>
  );
}
