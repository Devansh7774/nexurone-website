export const APP_NAME = 'SiteManage X'
export const APP_TAGLINE = 'Builder Inquiry Management'

export const STORAGE_KEYS = {
  authToken: 'authToken',
  user: 'user',
  role: 'role',
  onboardingCompleted: 'onboardingCompleted',
  isDarkMode: 'isDarkMode',
} as const

export const LEAD_SOURCES = [
  'Facebook',
  'OLX',
  'Reference',
  'WhatsApp',
  'Google Ads',
  'Instagram',
  'Walk-in',
  'Other',
]

export const REQUIREMENT_TYPES = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  'Plot',
  'Commercial',
  'Villa',
  'Duplex',
  'Penthouse',
]

export const INQUIRY_PROPERTY_TYPES = [
  'Bungalows',
  'Row Bungalow',
  'Row House',
  'Flats',
  'Commercial',
  'Other',
]

export const OPTION_OTHER = 'Other'

export const BUDGET_RANGES = (() => {
  const ranges = ['Below ₹5L']
  for (let start = 5; start < 95; start += 5) {
    ranges.push(`₹${start}L - ₹${start + 5}L`)
  }
  ranges.push('₹95L - ₹1Cr', 'Above ₹1Cr', OPTION_OTHER)
  return ranges
})()

export const AMENITIES = [
  'Swimming Pool',
  'Gym',
  'Club House',
  'Garden',
  'Parking',
  'Security',
  '24/7 Water',
  'Power Backup',
  'Children Play Area',
  'Jogging Track',
  'Sports Court',
  'Community Hall',
]

export const FOLLOW_UP_TYPES = ['Call', 'Meeting', 'Site Visit', 'WhatsApp', 'Email']

export const LEAD_STATUSES = [
  'New Lead',
  'Follow-up',
  'Site Visit Done',
  'Not Interested',
  'Closed / Booked',
]
