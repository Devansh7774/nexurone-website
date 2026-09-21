import Image from 'next/image';

const TRUSTED_BRANDS = [
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/DE_LOGO-02-1-removebg-preview.png',
    alt: 'DE brand logo',
  },
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/logo-footer-180x98-1-e1757675833449.png',
    alt: 'Partner brand logo',
  },
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/Avishkar-02-e1757426517727.png',
    alt: 'Avishkar logo',
  },
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/8dcfcea4-108b-461d-9bd0-43a137b2eb7b-removebg-preview.png',
    alt: 'ONE Rx logo',
  },
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/image%20(2).png',
    alt: 'Neo logo',
  },
  {
    src: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/new-digi.png',
    alt: 'DigitSign logo',
  },
];

export default function TrustedBrands() {
  return (
    <section
      className="relative bg-[#0d1520] py-14 md:py-16"
      aria-labelledby="trusted-brands-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-5 inline-block rounded-md bg-[#E6F0FF] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#0A2640]">
            Trusted Partners
          </div>
          <h2
            id="trusted-brands-heading"
            className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
          >
            Trusted brands work with us
          </h2>
        </div>

        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {TRUSTED_BRANDS.map((brand) => (
            <div
              key={brand.src}
              className="relative flex h-14 w-full max-w-[150px] items-center justify-center sm:h-16 md:max-w-[170px]"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                className="object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
                sizes="170px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
