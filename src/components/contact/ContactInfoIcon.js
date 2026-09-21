export default function ContactInfoIcon({ icon: Icon }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-sm"
      aria-hidden
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
    </span>
  );
}
