// Place embed from Nexuron's Google Business listing (reliable pin + map view).
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.7032093744224!2d72.3303512751003!3d23.290231478987018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c23c76bff7229%3A0x6a1b06fcd12931f0!2sNexuron%20Technologies!5e0!3m2!1sen!2sin!4v1757496361638!5m2!1sen!2sin";

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
    </section>
  );
}
