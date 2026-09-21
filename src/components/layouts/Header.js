"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SmoothCollapse from '@/components/ui/SmoothCollapse';
import {
  Monitor, ChevronDown,
  BookOpen, Briefcase
} from 'lucide-react';

const SERVICE_ICONS_BASE = 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/services/icons';
const HIRE_ICONS_BASE = 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/hire-developer/icons';

const serviceIcon = (slug) => `${SERVICE_ICONS_BASE}/${slug}.svg`;
const hireIcon = (slug) => `${HIRE_ICONS_BASE}/${slug}.svg`;
/** Use hire-developer icon when the same asset is not on services/icons yet */
const serviceOrHireIcon = (slug) => hireIcon(slug);

function ServiceMenuIcon({ icon: Icon, iconUrl, name, size = 'md' }) {
  const imgClass = size === 'sm' ? 'w-4 h-4' : 'w-[22px] h-[22px]';
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={size === 'sm' ? 16 : 22}
        height={size === 'sm' ? 16 : 22}
        className={`${imgClass} object-contain flex-shrink-0`}
        aria-hidden
      />
    );
  }

  if (Icon) {
    return (
      <Icon
        className={`${iconClass} text-gray-800 group-hover/item:text-blue-600 transition-colors duration-200`}
        strokeWidth={1.5}
      />
    );
  }

  return null;
}

const servicesMenu = [
  {
    title: 'WEB DEVELOPMENT',
    items: [
      { name: 'MEAN/MERN', href: '/services/mean-mern', iconUrl: serviceOrHireIcon('javascript') },
      { name: '.Net Development', href: '/services/dot-net', iconUrl: serviceIcon('dot-net') },
      { name: 'Laravel Development', href: '/services/laravel', iconUrl: serviceOrHireIcon('laravel') },
      { name: 'PHP Development', href: '/services/php', iconUrl: serviceOrHireIcon('php') },
      { name: 'WordPress Development', href: '/services/wordpress', iconUrl: serviceOrHireIcon('wordpress') },
      { name: 'Frontend Development', href: '/services/frontend', iconUrl: serviceIcon('frontend') },
    ]
  },
  {
    title: 'APP DEVELOPMENT',
    items: [
      { name: 'Flutter Development', href: '/services/flutter', iconUrl: serviceIcon('flutter') },
      { name: 'React Native Development', href: '/services/react-native', iconUrl: serviceOrHireIcon('react-native') },
      { name: 'Android Development', href: '/services/android', iconUrl: serviceIcon('android') },
      { name: 'IOS Development', href: '/services/ios', iconUrl: serviceIcon('ios') },
    ]
  },
  {
    title: 'EMERGING TECHNOLOGY',
    items: [
      { name: 'IOT Development', href: '/services/iot', iconUrl: serviceIcon('iot') },
      { name: 'DevOps', href: '/services/devops', iconUrl: serviceIcon('devops') },
      { name: 'AI/ML', href: '/services/ai-ml', iconUrl: serviceIcon('ai-ml') },
    ]
  },
  {
    title: 'DESIGN',
    items: [
      { name: 'UI/UX Development', href: '/services/ui-ux', icon: Monitor },
      { name: 'Graphic Design', href: '/services/graphic', iconUrl: serviceIcon('graphic') },
      { name: '3D Design', href: '/services/3d', iconUrl: serviceIcon('3d') },
    ]
  }
];

const hireMenu = [
  [
    {
      title: 'FRONTEND',
      items: [
        { name: 'Javascript Development Experts', href: '/hire/javascript-developer', iconUrl: hireIcon('javascript') },
        { name: 'Angular Development Experts', href: '/hire/angular-developer', iconUrl: hireIcon('angular') },
        { name: 'React Development Experts', href: '/hire/react-developer', iconUrl: hireIcon('react') },
        { name: 'Vue.js Development Experts', href: '/hire/vuejs-developer', iconUrl: hireIcon('vuejs') },
      ],
    },
    {
      title: 'CMS & E COMMERCE',
      items: [
        { name: 'WordPress Development Experts', href: '/hire/wordpress-developer', iconUrl: hireIcon('wordpress') },
        { name: 'WooCommerce Development Experts', href: '/hire/woocommerce-developer', iconUrl: hireIcon('woocommerce') },
        { name: 'Wix Development Experts', href: '/hire/wix-developer', iconUrl: hireIcon('wix') },
        { name: 'Shopify Development Experts', href: '/hire/shopify-developer', iconUrl: hireIcon('shopify') },
      ],
    },
  ],
  [
    {
      title: 'BACK END',
      items: [
        { name: '.NET Development Experts', href: '/hire/dotnet-developer', iconUrl: hireIcon('dot-net') },
        { name: 'Laravel Development Experts', href: '/hire/laravel-developer', iconUrl: hireIcon('laravel') },
        { name: 'Node Development Experts', href: '/hire/nodejs-developer', iconUrl: hireIcon('nodejs') },
        { name: 'PHP Development Experts', href: '/hire/php-developer', iconUrl: hireIcon('php') },
        { name: 'Python Development Experts', href: '/hire/python-developer', iconUrl: hireIcon('python') },
      ],
    },
    {
      title: 'DEVOPS & CLOUD',
      items: [
        { name: 'DevOps Experts', href: '/hire/devops-developer', iconUrl: hireIcon('devops') },
      ],
    },
  ],
  [
    {
      title: 'AI/ML & AUTOMATION',
      items: [
        { name: 'AI Development Experts', href: '/hire/ai-developer', iconUrl: serviceIcon('ai-ml') },
        { name: 'n8n Development Experts', href: '/hire/n8n-developer', iconUrl: hireIcon('n8n') },
        { name: 'Zapier Development Expert', href: '/hire/zapier-developer', iconUrl: hireIcon('zapier') },
        { name: 'Python Development Experts', href: '/hire/python-aiml-developer', iconUrl: hireIcon('python') },
      ],
    },
    {
      title: 'MOBILE',
      items: [
        { name: 'Flutter Development Experts', href: '/hire/flutter-developer', iconUrl: hireIcon('flutter') },
        { name: 'React Native Development Experts', href: '/hire/react-native-developer', iconUrl: hireIcon('react-native') },
      ],
    },
  ],
];

const resourcesMenu = [
  { name: 'Case Study', href: '/case-study', icon: Briefcase, description: 'Portfolio & project stories' },
  { name: 'Insights', href: '/insights', icon: BookOpen, description: 'Articles & updates' },
];

const HOVER_CLOSE_DELAY = 120;
const MOBILE_NAV_ID = 'mobile-primary-navigation';

function Chevron({ open, className = '' }) {
  return (
    <ChevronDown
      className={`w-4 h-4 transition-transform duration-300 ease-out ${open ? 'rotate-180' : 'rotate-0'} ${className}`}
      aria-hidden
    />
  );
}

export default function Header() {
  const pathname = usePathname();
  return <HeaderInner key={pathname} />;
}

function HeaderInner() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);
  const scrolledRef = useRef(false);
  const resizeTimerRef = useRef(null);

  const SCROLL_SHRINK = 32;
  const SCROLL_EXPAND = 12;

  const openDropdown = useCallback((menu) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(menu);
  }, []);

  const scheduleCloseDropdown = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY);
  }, []);

  const closeDropdown = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      const y = window.scrollY;
      const next =
        !scrolledRef.current && y > SCROLL_SHRINK
          ? true
          : scrolledRef.current && y < SCROLL_EXPAND
            ? false
            : scrolledRef.current;

      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrolled();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => setIsResizing(false), 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', menu: 'services' },
    { name: 'Hire Developer', href: '/hire', menu: 'hire' },
    { name: 'Resources', href: '/case-study', menu: 'resources' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
  ];

  const isNavItemActive = (item) =>
    pathname === item.href ||
    (item.name === 'Services' && pathname.startsWith('/services')) ||
    (item.name === 'Hire Developer' && pathname.startsWith('/hire')) ||
    (item.name === 'Resources' &&
      (pathname.startsWith('/case-study') || pathname.startsWith('/insights')));

  const linkColor = (active) =>
    active ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600';

  const chevronColor = (active, open) => {
    if (open || active) return 'text-blue-600';
    return 'text-gray-500';
  };

  function toggleMobileSection(section) {
    setMobileOpenSection((prev) => (prev === section ? null : section));
  }

  const motionClass = isResizing ? '' : 'transition-[box-shadow,border-color,transform] duration-300 ease-out';

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full border-b bg-white ${motionClass} ${
        scrolled ? 'border-gray-200/80 shadow-md' : 'border-gray-100 shadow-sm'
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative flex h-20 items-center justify-between lg:h-[72px]">
          <div className="flex-shrink-0 flex items-center relative z-20">
            <Link href="/" className="flex items-center -ml-2 sm:-ml-4">
              <Image
                src="/logo-dark-t-e1756917561911.png"
                alt="Nexuron Logo"
                width={180}
                height={48}
                className={`h-10 w-auto object-contain sm:h-11 lg:h-12 origin-left ${
                  isResizing ? '' : 'transition-transform duration-300 ease-out'
                } ${scrolled ? 'scale-[0.88] sm:scale-[0.9]' : 'scale-100'}`}
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 lg:space-x-10 h-full" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item);
              const hasMenu = Boolean(item.menu);
              const isOpen = openMenu === item.menu;

              if (hasMenu) {
                return (
                  <div
                    key={item.name}
                    className="h-full flex items-center"
                    onMouseEnter={() => openDropdown(item.menu)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => (isOpen ? closeDropdown() : openDropdown(item.menu))}
                      className={`flex items-center gap-1.5 h-full text-[16px] font-medium lg:text-[17px] ${linkColor(isActive)}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <Chevron open={isOpen} className={chevronColor(isActive, isOpen)} />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center h-full text-[16px] font-medium lg:text-[17px] ${linkColor(isActive)}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="https://calendly.com/nexurontechnologies-info"
              target="_blank"
              rel="noopener noreferrer"
              className={`nexuron-cta-btn rounded-full font-medium text-white shadow-md px-7 py-3 text-[15px] lg:px-8 lg:py-3 lg:text-[16px] ${
                isResizing ? '' : 'transition-transform duration-300 ease-out'
              } ${scrolled ? 'scale-[0.94] origin-right' : 'scale-100'}`}
            >
              <span className="relative z-[1]">Book A 30 Mins Call</span>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_NAV_ID}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop dropdowns — full container width, smooth fade + slide */}
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-50"
          onMouseEnter={() => openMenu && openDropdown(openMenu)}
          onMouseLeave={scheduleCloseDropdown}
        >
          {/* Invisible bridge so the cursor can reach the panel without closing the menu */}
          <div className="h-3" aria-hidden="true" />

          {/* Services mega menu */}
          <div
            className="nav-dropdown-panel absolute left-0 right-0 top-0"
            data-open={openMenu === 'services'}
          >
            <div className="pt-2">
              <div className="bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-b-xl border border-gray-100 border-t-0">
                <div className="flex justify-between p-10 xl:p-12">
                  {servicesMenu.map((column) => (
                    <div key={column.title} className="flex flex-col flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-6 uppercase tracking-wider">
                        {column.title}
                      </h3>
                      <ul className="space-y-5">
                        {column.items.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              onClick={closeDropdown}
                              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group/item"
                            >
                              <ServiceMenuIcon icon={service.icon} iconUrl={service.iconUrl} name={service.name} />
                              <span className="text-[15px] font-medium">{service.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hire mega menu */}
          <div
            className="nav-dropdown-panel absolute left-0 right-0 top-0"
            data-open={openMenu === 'hire'}
          >
            <div className="pt-2">
              <div className="bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-b-xl border border-gray-100 border-t-0">
                <div className="grid grid-cols-3 gap-x-16 p-10 xl:p-12">
                  {hireMenu.map((column, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-10 min-w-0">
                      {column.map((section) => (
                        <div key={section.title}>
                          <h3 className="text-[15px] font-bold text-gray-900 mb-5 uppercase tracking-wide">
                            {section.title}
                          </h3>
                          <ul className="space-y-3.5">
                            {section.items.map((hireItem) => (
                              <li key={`${section.title}-${hireItem.href}-${hireItem.name}`}>
                                <Link
                                  href={hireItem.href}
                                  onClick={closeDropdown}
                                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group/item"
                                >
                                  <ServiceMenuIcon
                                    icon={hireItem.icon}
                                    iconUrl={hireItem.iconUrl}
                                    name={hireItem.name}
                                    size="sm"
                                  />
                                  <span className="text-[14px] font-medium leading-snug">{hireItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resources menu */}
          <div
            className="nav-dropdown-panel absolute left-1/2 -translate-x-1/2 top-0"
            data-open={openMenu === 'resources'}
          >
            <div className="pt-2">
              <div className="bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-xl border border-gray-100 py-2 min-w-[280px]">
                {resourcesMenu.map((resource) => {
                  const Icon = resource.icon;
                  const isResourceActive =
                    pathname === resource.href || pathname.startsWith(`${resource.href}/`);
                  return (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      onClick={closeDropdown}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors duration-200 group/item ${
                        isResourceActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                          isResourceActive ? 'text-blue-600' : 'text-gray-700 group-hover/item:text-blue-600'
                        }`}
                        strokeWidth={1.5}
                      />
                      <div>
                        <span
                          className={`block text-[15px] font-medium ${
                            isResourceActive ? 'text-blue-600' : 'text-gray-800 group-hover/item:text-blue-600'
                          }`}
                        >
                          {resource.name}
                        </span>
                        <span className="block text-[12px] text-gray-500 mt-0.5">{resource.description}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <SmoothCollapse open={isMobileMenuOpen} className="lg:hidden border-t border-gray-100 bg-white">
        <nav id={MOBILE_NAV_ID} aria-label="Mobile" className="max-h-[min(80vh,32rem)] overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item);

              if (item.menu === 'services') {
                const open = mobileOpenSection === 'services';
                return (
                  <li key={item.name} className="border-b border-gray-100 pb-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection('services')}
                      className={`flex min-h-[44px] w-full items-center justify-between py-3 text-left text-[16px] font-medium transition-colors duration-200 ${
                        isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                      }`}
                      aria-expanded={open}
                    >
                      <span>Services</span>
                      <Chevron open={open} className={open ? 'text-blue-600' : 'text-gray-500'} />
                    </button>
                    <SmoothCollapse open={open}>
                      <ul className="pl-2 pb-2">
                        {servicesMenu.flatMap((column) => column.items).map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-2.5 py-2 text-[14px] transition-colors duration-200 ${
                                pathname === service.href ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'
                              }`}
                            >
                              <ServiceMenuIcon icon={service.icon} iconUrl={service.iconUrl} name={service.name} />
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </SmoothCollapse>
                  </li>
                );
              }

              if (item.menu === 'hire') {
                const open = mobileOpenSection === 'hire';
                return (
                  <li key={item.name} className="border-b border-gray-100 pb-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection('hire')}
                      className={`flex min-h-[44px] w-full items-center justify-between py-3 text-left text-[16px] font-medium transition-colors duration-200 ${
                        isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                      }`}
                      aria-expanded={open}
                    >
                      <span>Hire Developer</span>
                      <Chevron open={open} className={open ? 'text-blue-600' : 'text-gray-500'} />
                    </button>
                    <SmoothCollapse open={open}>
                      <div className="pl-2 pb-2 space-y-4">
                        {hireMenu.flatMap((column) => column).map((section) => (
                          <div key={section.title}>
                            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider mb-2">
                              {section.title}
                            </h4>
                            <ul className="space-y-1">
                              {section.items.map((hireItem) => (
                                <li key={`${section.title}-${hireItem.href}-${hireItem.name}`}>
                                  <Link
                                    href={hireItem.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-2 py-2 text-[14px] transition-colors duration-200 ${
                                      pathname === hireItem.href ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'
                                    }`}
                                  >
                                    <ServiceMenuIcon
                                      icon={hireItem.icon}
                                      iconUrl={hireItem.iconUrl}
                                      name={hireItem.name}
                                      size="sm"
                                    />
                                    {hireItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </SmoothCollapse>
                  </li>
                );
              }

              if (item.menu === 'resources') {
                const open = mobileOpenSection === 'resources';
                return (
                  <li key={item.name} className="border-b border-gray-100 pb-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection('resources')}
                      className={`flex min-h-[44px] w-full items-center justify-between py-3 text-left text-[16px] font-medium transition-colors duration-200 ${
                        isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                      }`}
                      aria-expanded={open}
                    >
                      <span>Resources</span>
                      <Chevron open={open} className={open ? 'text-blue-600' : 'text-gray-500'} />
                    </button>
                    <SmoothCollapse open={open}>
                      <ul className="pl-2 pb-2">
                        {resourcesMenu.map((resource) => (
                          <li key={resource.href}>
                            <Link
                              href={resource.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block py-2 text-[14px] transition-colors duration-200 ${
                                pathname === resource.href || pathname.startsWith(`${resource.href}/`)
                                  ? 'text-blue-600 font-medium'
                                  : 'text-gray-600 hover:text-blue-600'
                              }`}
                            >
                              {resource.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </SmoothCollapse>
                  </li>
                );
              }

              return (
                <li key={item.name} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block min-h-[44px] py-3 text-[16px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="https://calendly.com/nexurontechnologies-info"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="nexuron-cta-btn mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium text-white shadow-md transition-all duration-200"
          >
            <span className="relative z-[1]">Book A 30 Mins Call</span>
          </Link>
        </nav>
      </SmoothCollapse>
    </header>
  );
}
