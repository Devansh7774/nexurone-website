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

function BrandLogo({ src, alt }) {
  return (
    <div className="relative mx-8 h-12 w-32 flex-shrink-0 opacity-75 transition-opacity duration-200 hover:opacity-100 md:mx-10 md:h-14 md:w-36 lg:w-40">
      <Image src={src} alt={alt} fill className="object-contain" sizes="160px" loading="lazy" />
    </div>
  );
}

export default function TrustedBrandsSlider({ className = '' }) {
  const marqueeBrands = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/5 bg-[#1c2841] p-6 shadow-lg md:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#1c2841] to-transparent md:w-14" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#1c2841] to-transparent md:w-14" />

      <div className="trusted-brands-marquee-viewport overflow-hidden">
        <div className="trusted-brands-marquee-track flex w-max items-center">
          {marqueeBrands.map((brand, index) => (
            <BrandLogo key={`${brand.src}-${index}`} src={brand.src} alt={brand.alt} />
          ))}
        </div>
      </div>
    </div>
  );
}
