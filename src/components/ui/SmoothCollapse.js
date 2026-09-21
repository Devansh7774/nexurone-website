'use client';

/**
 * Height-animated collapse panel (grid-rows trick — smoother than max-height).
 */
export default function SmoothCollapse({ open, children, className = '' }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
      } ${className}`}
      inert={!open}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
