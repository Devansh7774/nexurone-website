const INDIA_ADDRESS =
  "FF-70,71 Hanumant Plaza, Nr. Vadvala Hanumandada Temple, Kadi, GJ, India - 384440";

// Place embed from Nexuron's Google Business listing (reliable pin + map view).
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.7032093744224!2d72.3303512751003!3d23.290231478987018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c23c76bff7229%3A0x6a1b06fcd12931f0!2sNexuron%20Technologies!5e0!3m2!1sen!2sin!4v1757496361638!5m2!1sen!2sin";

const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INDIA_ADDRESS)}`;

export default function ContactMap() {
  return (
    <section className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Nexuron Technologies Location"
        className="absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[min(100%-1.5rem,320px)] sm:left-4 sm:top-4">
        <div className="pointer-events-auto rounded-sm bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
          <p className="text-[15px] font-medium leading-snug text-[#202124]">
            Nexuron Technologies
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#5f6368]">{INDIA_ADDRESS}</p>
          <a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[13px] text-[#1a73e8] hover:underline"
          >
            Open Nexuron location in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
