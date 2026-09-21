/** Hero images shared with `/services/*` pages — keep in sync with each service page HERO_IMAGE. */
export const HIRE_WHY_SECTION_IMAGE =
  'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/nexuron-assets/Gemini_Generated_Image_v35lzgv35lzgv35l-1-scaled.png';

/** Overview section images for /services/* pages */
export const SERVICE_OVERVIEW_IMAGES = {
  flutter:
    'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/0aab3981-d51b-420a-b2eb-df251aea56d8.png',
};

export const SERVICE_HERO_IMAGES = {
  'mean-mern': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/eba4d604-f343-4138-acdd-ba47f4634247.png',
  'dot-net': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ec7e9f1f-dd2f-4f54-83f7-e508eacca0fb.png',
  laravel: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/f34e2088-83be-4711-8fff-91eb3444a05f.png',
  php: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/540ba240-f0c7-4b32-b7f5-7667a90f080a.png',
  wordpress: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/16a54958-52c5-481e-986d-7e2cd0429603.png',
  frontend: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/8a5f06db-fc2a-4fd0-b075-76958cba0be8.png',
  flutter: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/117eaf57-76a6-42b4-b3fd-142eefb97421.png',
  'react-native': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/b7ec1831-38c7-4083-b77d-246bf50e10ee.png',
  android: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/9f9e966c-8b5a-43f0-902a-f1dcf3535efc.png',
  ios: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/7012d1b4-6811-4f57-8662-5a0c29d5d318.png',
  iot: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/1f634492-a4d6-4346-91fd-d41867896ec1.png',
  devops: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/47b29b94-7b0d-4a92-9151-8c9e16c24d4c.png',
  'ai-ml': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ddb5122d-0b1c-4065-a79d-72fee3f7215b.png',
  'ui-ux': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/f5347a15-bcb6-4e56-ba41-57fd26bd862a.png',
  graphic: 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/8d3675ba-e652-4660-9f5b-299a62d75eca.png',
  '3d': 'https://pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev/ec4112f1-2bf2-4627-9ec1-1e884ac353f0.png',
};

/** Maps `/hire/*` slugs to the matching `/services/*` hero image. */
export const HIRE_TO_SERVICE = {
  'javascript-developer': 'mean-mern',
  'angular-developer': 'frontend',
  'react-developer': 'frontend',
  'vuejs-developer': 'frontend',
  'wordpress-developer': 'wordpress',
  'woocommerce-developer': 'wordpress',
  'wix-developer': 'wordpress',
  'shopify-developer': 'wordpress',
  'dotnet-developer': 'dot-net',
  'laravel-developer': 'laravel',
  'nodejs-developer': 'mean-mern',
  'php-developer': 'php',
  'python-developer': 'ai-ml',
  'devops-developer': 'devops',
  'ai-developer': 'ai-ml',
  'n8n-developer': 'ai-ml',
  'zapier-developer': 'ai-ml',
  'python-aiml-developer': 'ai-ml',
  'flutter-developer': 'flutter',
  'react-native-developer': 'react-native',
};

export function getServiceHeroImage(serviceSlug) {
  return SERVICE_HERO_IMAGES[serviceSlug] ?? null;
}

export function getServiceOverviewImage(serviceSlug) {
  return SERVICE_OVERVIEW_IMAGES[serviceSlug] ?? SERVICE_OVERVIEW_IMAGES.flutter ?? null;
}

export function getHireHeroImage(hireSlug) {
  const serviceSlug = HIRE_TO_SERVICE[hireSlug];
  return serviceSlug ? getServiceHeroImage(serviceSlug) : null;
}
