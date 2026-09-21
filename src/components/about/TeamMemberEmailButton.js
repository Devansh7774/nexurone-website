'use client';

function openMailClient(email) {
  const mailto = `mailto:${email.toLowerCase()}`;
  window.location.assign(mailto);
}

export default function TeamMemberEmailButton({ email, name }) {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openMailClient(email);
  };

  return (
    <a
      href={`mailto:${email.toLowerCase()}`}
      onClick={handleClick}
      aria-label={`Email ${name}`}
      className="nexuron-btn-solid absolute bottom-3 right-3 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[3px] border-white shadow-[0_4px_14px_rgba(0,114,255,0.45)] transition-transform duration-200 hover:scale-105 pointer-events-auto"
    >
      <svg
        className="h-5 w-5 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 014 17V6.5z"
          fill="white"
        />
        <path
          d="M4 7.5l8 5.5L20 7.5"
          stroke="#2563EB"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
