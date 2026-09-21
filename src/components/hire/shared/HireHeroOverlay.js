/** Dark gradient overlay for hire hero sections — keeps left-aligned text readable on light images. */
export default function HireHeroOverlay() {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(to_right,rgba(11,18,32,0.94)_0%,rgba(15,23,42,0.72)_35%,rgba(15,23,42,0.35)_55%,rgba(15,23,42,0.12)_70%,transparent_85%)]" />
      <div className="absolute bottom-0 left-0 h-48 w-[65%] bg-gradient-to-t from-[#0f172a]/50 to-transparent" />
    </>
  );
}
