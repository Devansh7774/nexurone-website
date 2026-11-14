/**
 * Industry page visuals (hero, overview, mosaic, solution cards).
 * Curated Unsplash imagery matched to each vertical.
 */

const u = (photoId, width = 1600) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

function images({ hero, heroAlt, overview, overviewAlt, mosaic, solutions }) {
  return {
    hero: u(hero),
    heroAlt,
    overview: u(overview),
    overviewAlt,
    mosaic: mosaic.map((item) => ({
      ...item,
      src: u(item.photoId, 1000),
    })),
    solutions: solutions.map((photoId) => u(photoId, 1200)),
  };
}

export const INDUSTRY_IMAGES = {
  healthcare: images({
    hero: 'photo-1576091160399-112ba8d25d1d',
    heroAlt: 'Clinician using healthcare technology on a digital tablet',
    overview: 'photo-1516549655169-df83a0774514',
    overviewAlt: 'Hospital corridor with medical professionals at work',
    mosaic: [
      {
        photoId: 'photo-1516549655169-df83a0774514',
        label: 'Hospitals & clinics',
        alt: 'Hospital environment supporting clinical care teams',
      },
      {
        photoId: 'photo-1532187863486-abf9dbad1b69',
        label: 'Pharmaceutical research',
        alt: 'Scientist working in pharmaceutical research laboratory',
      },
      {
        photoId: 'photo-1576091160550-2173dba999ef',
        label: 'AI in healthcare',
        alt: 'Medical technology and AI-assisted healthcare systems',
      },
      {
        photoId: 'photo-1559839734-2b71ea197ec2',
        label: 'Medical professionals',
        alt: 'Doctors collaborating on patient care',
      },
      {
        photoId: 'photo-1587854692152-cbe660dbde88',
        label: 'Pharmacy & medicines',
        alt: 'Pharmaceutical products and pharmacy operations',
      },
      {
        photoId: 'photo-1582719471384-894fbb16e074',
        label: 'Pharma manufacturing',
        alt: 'Pharmaceutical manufacturing and controlled lab production',
      },
    ],
    solutions: [
      'photo-1587854692152-cbe660dbde88',
      'photo-1559839734-2b71ea197ec2',
      'photo-1579684385127-1ef15d508118',
      'photo-1576091160550-2173dba999ef',
    ],
  }),

  education: images({
    hero: 'photo-1522202176988-66273c2fd55f',
    heroAlt: 'Students learning in a modern campus environment',
    overview: 'photo-1509062522246-3755977927d7',
    overviewAlt: 'Teacher and students collaborating in a classroom',
    mosaic: [
      { photoId: 'photo-1522202176988-66273c2fd55f', label: 'Campus life', alt: 'University campus and student community' },
      { photoId: 'photo-1516321318423-f06f85e504b3', label: 'Digital learning', alt: 'Student using digital learning tools' },
      { photoId: 'photo-1523240795612-9a054b0db644', label: 'Student collaboration', alt: 'Students collaborating on academic work' },
      { photoId: 'photo-1454165804606-c3d57bc86b40', label: 'Admin systems', alt: 'Education operations and administration tools' },
    ],
    solutions: [
      'photo-1516321318423-f06f85e504b3',
      'photo-1562774053-701939374585',
      'photo-1523240795612-9a054b0db644',
      'photo-1454165804606-c3d57bc86b40',
    ],
  }),

  'real-estate': images({
    hero: 'photo-1560518883-ce09059eeffa',
    heroAlt: 'Modern residential property exterior for real estate listings',
    overview: 'photo-1560520653-9e0e4c89eb11',
    overviewAlt: 'Real estate agent reviewing property documents',
    mosaic: [
      { photoId: 'photo-1600596542815-ffad4c1539a9', label: 'Property listings', alt: 'Modern home used in property listings' },
      { photoId: 'photo-1560518883-ce09059eeffa', label: 'Brokerage', alt: 'Residential property for brokerage workflows' },
      { photoId: 'photo-1486406146926-c627a92ad1ab', label: 'Commercial assets', alt: 'Commercial real estate building exterior' },
      { photoId: 'photo-1450101499163-c8848c66ca85', label: 'Transactions', alt: 'Document review for property transactions' },
    ],
    solutions: [
      'photo-1600596542815-ffad4c1539a9',
      'photo-1560518883-ce09059eeffa',
      'photo-1450101499163-c8848c66ca85',
      'photo-1486406146926-c627a92ad1ab',
    ],
  }),

  fitness: images({
    hero: 'photo-1534438327276-14e5300c3a48',
    heroAlt: 'People training in a modern fitness gym',
    overview: 'photo-1571019614242-c5c5dee9f50b',
    overviewAlt: 'Personal trainer coaching a member through a workout',
    mosaic: [
      { photoId: 'photo-1534438327276-14e5300c3a48', label: 'Gym floors', alt: 'Fitness gym with active members' },
      { photoId: 'photo-1517836357463-d25dfeac3438', label: 'Strength training', alt: 'Athlete strength training in a gym' },
      { photoId: 'photo-1544367567-0f2fcb009e0b', label: 'Coaching', alt: 'Wellness coaching and guided movement' },
      { photoId: 'photo-1518611012118-696072aa579a', label: 'Studio classes', alt: 'Group fitness studio class environment' },
    ],
    solutions: [
      'photo-1517836357463-d25dfeac3438',
      'photo-1518611012118-696072aa579a',
      'photo-1544367567-0f2fcb009e0b',
      'photo-1434682881908-b43d0467b798',
    ],
  }),

  'retail-ecommerce': images({
    hero: 'photo-1556742049-0cfed4f6a45d',
    heroAlt: 'Shopper browsing products in a retail environment',
    overview: 'photo-1441986300917-64674bd600d8',
    overviewAlt: 'Modern retail store interior with product displays',
    mosaic: [
      { photoId: 'photo-1441986300917-64674bd600d8', label: 'Retail floors', alt: 'Retail store with product displays' },
      { photoId: 'photo-1556742049-0cfed4f6a45d', label: 'Checkout moments', alt: 'Customer completing a retail purchase' },
      { photoId: 'photo-1553413077-190dd305871c', label: 'Fulfillment', alt: 'Warehouse fulfillment for ecommerce orders' },
      { photoId: 'photo-1460925895917-afdab827c52f', label: 'Commerce analytics', alt: 'Ecommerce analytics and merchandising tools' },
    ],
    solutions: [
      'photo-1460925895917-afdab827c52f',
      'photo-1556740758-90de374c12ad',
      'photo-1553413077-190dd305871c',
      'photo-1556740738-b6a63e27c4df',
    ],
  }),

  'media-entertainment': images({
    hero: 'photo-1478720568477-152d9b164e26',
    heroAlt: 'Film and entertainment production lighting on set',
    overview: 'photo-1489599849927-2ee91cede3ba',
    overviewAlt: 'Audience watching content on a large screen',
    mosaic: [
      { photoId: 'photo-1485846234645-a62644f84728', label: 'Production', alt: 'Film production camera on set' },
      { photoId: 'photo-1574375927938-d5a98e8ffe85', label: 'Streaming', alt: 'Streaming and screen entertainment experience' },
      { photoId: 'photo-1611162616475-46b635cb6868', label: 'Audience apps', alt: 'Audience engaging with digital media' },
      { photoId: 'photo-1478720568477-152d9b164e26', label: 'Studio craft', alt: 'Entertainment lighting and studio craft' },
    ],
    solutions: [
      'photo-1485846234645-a62644f84728',
      'photo-1611162616475-46b635cb6868',
      'photo-1574375927938-d5a98e8ffe85',
      'photo-1551818255-e6e10975bc17',
    ],
  }),

  automotive: images({
    hero: 'photo-1492144534655-ae79c964c9d7',
    heroAlt: 'Modern vehicle in a dealership showroom setting',
    overview: 'photo-1486262715619-67b85e0b08d3',
    overviewAlt: 'Automotive service technicians working in a workshop',
    mosaic: [
      { photoId: 'photo-1492144534655-ae79c964c9d7', label: 'Showrooms', alt: 'Vehicle in an automotive showroom' },
      { photoId: 'photo-1486262715619-67b85e0b08d3', label: 'Service bays', alt: 'Technicians working in an auto service bay' },
      { photoId: 'photo-1549317661-bd32c8ce0db2', label: 'Vehicle inventory', alt: 'Cars representing dealership inventory' },
      { photoId: 'photo-1449965408869-eaa3f722e40d', label: 'Ownership journeys', alt: 'Driver on the road after vehicle purchase' },
    ],
    solutions: [
      'photo-1549317661-bd32c8ce0db2',
      'photo-1487754180451-c456f719a1fc',
      'photo-1449965408869-eaa3f722e40d',
      'photo-1492144534655-ae79c964c9d7',
    ],
  }),

  insurance: images({
    hero: 'photo-1450101499163-c8848c66ca85',
    heroAlt: 'Insurance professional reviewing policy documents',
    overview: 'photo-1554224155-6726b3ff858f',
    overviewAlt: 'Advisor discussing coverage details with a client',
    mosaic: [
      { photoId: 'photo-1450101499163-c8848c66ca85', label: 'Policy work', alt: 'Professional reviewing insurance policy documents' },
      { photoId: 'photo-1551836022-d5d88e9218df', label: 'Claims teams', alt: 'Team collaborating on claims operations' },
      { photoId: 'photo-1521791136064-7986c2920216', label: 'Broker partners', alt: 'Business partners discussing insurance distribution' },
      { photoId: 'photo-1563986768609-322da13575f3', label: 'Customer portals', alt: 'Customer accessing digital insurance services' },
    ],
    solutions: [
      'photo-1454165804606-c3d57bc86b40',
      'photo-1551836022-d5d88e9218df',
      'photo-1521791136064-7986c2920216',
      'photo-1563986768609-322da13575f3',
    ],
  }),

  'banking-finance': images({
    hero: 'photo-1507679799987-c73779587ccf',
    heroAlt: 'Person using a secure digital banking application',
    overview: 'photo-1551288049-bebda4e38f71',
    overviewAlt: 'Financial analytics dashboard on a workstation',
    mosaic: [
      { photoId: 'photo-1507679799987-c73779587ccf', label: 'Digital banking', alt: 'Customer using a mobile banking app' },
      { photoId: 'photo-1553729459-efe14ef6055d', label: 'Payments', alt: 'Financial payment and money movement context' },
      { photoId: 'photo-1551288049-bebda4e38f71', label: 'Risk & ops', alt: 'Finance operations dashboard and analytics' },
      { photoId: 'photo-1554224155-8d04cb21cd6c', label: 'Trusted finance', alt: 'Financial planning and advisory workspace' },
    ],
    solutions: [
      'photo-1553729459-efe14ef6055d',
      'photo-1563013544-824ae1b704d3',
      'photo-1454165804606-c3d57bc86b40',
      'photo-1554224155-8d04cb21cd6c',
    ],
  }),

  'design-architecture': images({
    hero: 'photo-1503387762-592deb58ef4e',
    heroAlt: 'Architectural blueprints and design tools on a studio desk',
    overview: 'photo-1497366216548-37526070297c',
    overviewAlt: 'Modern architecture studio workspace',
    mosaic: [
      { photoId: 'photo-1503387762-592deb58ef4e', label: 'Studio planning', alt: 'Architecture blueprints on a design desk' },
      { photoId: 'photo-1487958449943-2429e8be8625', label: 'Built work', alt: 'Modern architectural building exterior' },
      { photoId: 'photo-1497366811353-6870744d04b2', label: 'Client reviews', alt: 'Studio space for client collaboration' },
      { photoId: 'photo-1581094794329-c8112a89af12', label: 'Project assets', alt: 'Technical assets and project documentation' },
    ],
    solutions: [
      'photo-1503387762-592deb58ef4e',
      'photo-1497366811353-6870744d04b2',
      'photo-1487958449943-2429e8be8625',
      'photo-1581094794329-c8112a89af12',
    ],
  }),

  logistics: images({
    hero: 'photo-1586528116311-ad8dd3c8310d',
    heroAlt: 'Warehouse logistics operations with stacked inventory',
    overview: 'photo-1605745341112-85968b19335b',
    overviewAlt: 'Freight trucks coordinating supply chain delivery',
    mosaic: [
      { photoId: 'photo-1586528116311-ad8dd3c8310d', label: 'Warehouses', alt: 'Warehouse racks used in logistics operations' },
      { photoId: 'photo-1601584115197-04ecc0da31d7', label: 'Fleet ops', alt: 'Freight fleet on the road' },
      { photoId: 'photo-1566576912321-d58ddd7a6088', label: 'Shipment flow', alt: 'Packages moving through shipment handling' },
      { photoId: 'photo-1580674285054-bed31e145f59', label: 'Last-mile delivery', alt: 'Delivery operations reaching the customer' },
    ],
    solutions: [
      'photo-1566576912321-d58ddd7a6088',
      'photo-1601584115197-04ecc0da31d7',
      'photo-1553413077-190dd305871c',
      'photo-1580674285054-bed31e145f59',
    ],
  }),

  sports: images({
    hero: 'photo-1471295253337-3ceaaedca402',
    heroAlt: 'Athletes competing in a stadium sports event',
    overview: 'photo-1574629810360-7efbbe195018',
    overviewAlt: 'Fans engaging with a live sports moment',
    mosaic: [
      { photoId: 'photo-1471295253337-3ceaaedca402', label: 'Match day', alt: 'Athletes competing during a sporting event' },
      { photoId: 'photo-1574629810360-7efbbe195018', label: 'Fan energy', alt: 'Fans celebrating at a sports venue' },
      { photoId: 'photo-1540747913346-19e32dc3e97e', label: 'Stadium events', alt: 'Stadium ready for a major sports event' },
      { photoId: 'photo-1540747913346-19e32dc3e97e', label: 'Performance', alt: 'Athlete performance and training moment' },
    ],
    solutions: [
      'photo-1574629810360-7efbbe195018',
      'photo-1431324155629-1a6deb1dec8d',
      'photo-1540747913346-19e32dc3e97e',
      'photo-1540747913346-19e32dc3e97e',
    ],
  }),

  'travel-hospitality': images({
    hero: 'photo-1488646953014-85cb44e25828',
    heroAlt: 'Traveler exploring a scenic destination',
    overview: 'photo-1566073771259-6a8506099945',
    overviewAlt: 'Hospitality welcome experience at a modern hotel',
    mosaic: [
      { photoId: 'photo-1488646953014-85cb44e25828', label: 'Destinations', alt: 'Travel destination explored by a guest' },
      { photoId: 'photo-1566073771259-6a8506099945', label: 'Hospitality', alt: 'Hotel hospitality and guest welcome setting' },
      { photoId: 'photo-1556388158-158ea5ccacbd', label: 'Booking journeys', alt: 'Air travel connected to booking experiences' },
      { photoId: 'photo-1520250497591-112f2f40a3f4', label: 'Operator stays', alt: 'Hospitality property used by travel operators' },
    ],
    solutions: [
      'photo-1556388158-158ea5ccacbd',
      'photo-1520250497591-112f2f40a3f4',
      'photo-1551882547-ff40c63fe5fa',
      'photo-1488085061387-422e29b40080',
    ],
  }),

  'apparel-fashion': images({
    hero: 'photo-1445205170230-053b83016050',
    heroAlt: 'Fashion apparel displayed in a contemporary retail space',
    overview: 'photo-1490481651871-ab68de25d43d',
    overviewAlt: 'Designer clothing on a fashion brand rack',
    mosaic: [
      { photoId: 'photo-1445205170230-053b83016050', label: 'Brand spaces', alt: 'Fashion retail space for brand storytelling' },
      { photoId: 'photo-1469334031218-e382a71b716b', label: 'Runway energy', alt: 'Fashion model representing brand campaigns' },
      { photoId: 'photo-1472851294608-062f824d29cc', label: 'Commerce floors', alt: 'Apparel retail floor with product displays' },
      { photoId: 'photo-1483985988355-763728e1935b', label: 'Shopping journeys', alt: 'Shopper exploring fashion products' },
    ],
    solutions: [
      'photo-1469334031218-e382a71b716b',
      'photo-1472851294608-062f824d29cc',
      'photo-1558769132-cb1aea458c5e',
      'photo-1483985988355-763728e1935b',
    ],
  }),

  'legal-tech': images({
    hero: 'photo-1589829545856-d10d557cf95f',
    heroAlt: 'Legal professional reviewing contracts and case documents',
    overview: 'photo-1450101499163-c8848c66ca85',
    overviewAlt: 'Law firm workspace with legal paperwork and laptop',
    mosaic: [
      { photoId: 'photo-1589829545856-d10d557cf95f', label: 'Contract work', alt: 'Lawyer reviewing contracts and legal documents' },
      { photoId: 'photo-1505664194779-8beaceb93744', label: 'Practice teams', alt: 'Legal practice and courtroom context' },
      { photoId: 'photo-1454165804606-c3d57bc86b40', label: 'Document systems', alt: 'Document-heavy legal operations workspace' },
      { photoId: 'photo-1563986768609-322da13575f3', label: 'Secure access', alt: 'Secure digital access for confidential legal work' },
    ],
    solutions: [
      'photo-1589829545856-d10d557cf95f',
      'photo-1505664194779-8beaceb93744',
      'photo-1454165804606-c3d57bc86b40',
      'photo-1563986768609-322da13575f3',
    ],
  }),

  construction: images({
    hero: 'photo-1504307651254-35680f356dfd',
    heroAlt: 'Construction site with workers and building framework',
    overview: 'photo-1541888946425-d81bb19240f5',
    overviewAlt: 'Engineers reviewing construction plans on site',
    mosaic: [
      { photoId: 'photo-1504307651254-35680f356dfd', label: 'Jobsites', alt: 'Active construction site with structural work' },
      { photoId: 'photo-1541888946425-d81bb19240f5', label: 'Field reviews', alt: 'Engineers reviewing plans on a construction site' },
      { photoId: 'photo-1503387762-592deb58ef4e', label: 'Modernization', alt: 'Technical planning for system modernization' },
      { photoId: 'photo-1581094794329-c8112a89af12', label: 'Resource ops', alt: 'Operational systems supporting field resources' },
    ],
    solutions: [
      'photo-1503387762-592deb58ef4e',
      'photo-1581094794329-c8112a89af12',
      'photo-1454165804606-c3d57bc86b40',
      'photo-1504307651254-35680f356dfd',
    ],
  }),

  martech: images({
    hero: 'photo-1460925895917-afdab827c52f',
    heroAlt: 'Marketing technology dashboard with campaign analytics',
    overview: 'photo-1552664730-d307ca884978',
    overviewAlt: 'Growth team collaborating on digital marketing strategy',
    mosaic: [
      { photoId: 'photo-1460925895917-afdab827c52f', label: 'Campaign analytics', alt: 'Marketing analytics dashboard for growth teams' },
      { photoId: 'photo-1552664730-d307ca884978', label: 'Growth teams', alt: 'Marketing team collaborating on campaign strategy' },
      { photoId: 'photo-1557804506-669a67965ba0', label: 'Content systems', alt: 'Content and channel planning workspace' },
      { photoId: 'photo-1611162616305-c69b3fa7fbe0', label: 'Channel publishing', alt: 'Social and digital channel publishing context' },
    ],
    solutions: [
      'photo-1557804506-669a67965ba0',
      'photo-1551288049-bebda4e38f71',
      'photo-1677442136019-21780ecad995',
      'photo-1611162616305-c69b3fa7fbe0',
    ],
  }),
};

export function getIndustryImages(slug) {
  return INDUSTRY_IMAGES[slug] ?? null;
}
