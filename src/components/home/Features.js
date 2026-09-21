import Image from 'next/image';

const features = [
  {
    id: 1,
    title: 'Web & App\nDevelopment',
    description: 'Modern, scalable websites and mobile apps built with the latest frameworks (MEAN/MERN, Laravel, .NET, Flutter, React Native) to deliver secure and seamless experiences.',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/18107c16-b013-4042-aeef-33cce6138e40.png',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient-1)" strokeWidth="1.5">
        <defs>
          <linearGradient id="icon-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="10" r="8" />
        <ellipse cx="12" cy="10" rx="3.5" ry="8" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <rect x="5" y="8" width="6" height="6" rx="1" fill="white" stroke="url(#icon-gradient-1)" />
        <path d="M6.5 8V6.5a1.5 1.5 0 013 0V8" />
        <circle cx="8" cy="11" r="0.5" fill="url(#icon-gradient-1)" stroke="none" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <rect x="10" y="21" width="4" height="2" fill="white" stroke="url(#icon-gradient-1)" />
        <line x1="7" y1="22" x2="10" y2="22" />
        <line x1="14" y1="22" x2="17" y2="22" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Software, Cloud &\nAutomation',
    description: 'Optimize your business operations with custom software, secure cloud storage solutions, and intelligent automation that drives efficiency and growth.',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/6373ce17-9579-4da6-af29-d361c09b158a.png',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient-2)" strokeWidth="1.5">
        <defs>
          <linearGradient id="icon-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'UI/UX &\nProduct Design',
    description: 'Craft intuitive, conversion-focused interfaces with user research, wireframing, prototyping, and responsive design for web and mobile products.',
    image: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/5757453-1-scaled.jpg',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient-3)" strokeWidth="1.5">
        <defs>
          <linearGradient id="icon-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-[#f7f7f7]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-[#E6F0FF] text-[#0A2640] px-4 py-1.5 rounded-md font-semibold text-sm mb-6 inline-block">
            OUR FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#020617] leading-[1.2]">
            Smart IT Solutions for Your<br />Business Growth
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group relative"
            >
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-white h-[380px] shadow-sm transition-all duration-300 group-hover:shadow-xl">
                <Image
                  src={feature.image}
                  alt={feature.title.replace('\n', ' ')}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />

                {/* Hover State Overlay */}
                <div className="absolute inset-0 bg-[#0A2640]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center z-20">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-10 h-10">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 whitespace-pre-line">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-[15px] leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Normal State Bottom Bar */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl py-4 px-6 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-30 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-[#020617] text-[17px] leading-[1.3] whitespace-pre-line">
                    {feature.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}