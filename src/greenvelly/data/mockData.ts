export const kProjects = [
  {
    id: '1',
    name: 'Green Valley Phase 2',
    type: 'Residential',
    status: 'Under Construction',
    location: 'Pune, Maharashtra',
    priceRange: '₹45L - ₹85L',
    units: 120,
    availableUnits: 45,
    amenities: ['Swimming Pool', 'Gym', 'Garden', 'Parking'],
    color: '#1E40AF',
  },
  {
    id: '2',
    name: 'Skyline Towers',
    type: 'Luxury',
    status: 'Ready to Move',
    location: 'Mumbai, Maharashtra',
    priceRange: '₹1.2Cr - ₹2.5Cr',
    units: 80,
    availableUnits: 12,
    amenities: ['Club House', 'Security', 'Power Backup'],
    color: '#F97316',
  },
  {
    id: '3',
    name: 'Sunrise Plots',
    type: 'Plots',
    status: 'Launching Soon',
    location: 'Ahmedabad, Gujarat',
    priceRange: '₹25L - ₹60L',
    units: 200,
    availableUnits: 180,
    amenities: ['24/7 Water', 'Garden'],
    color: '#10B981',
  },
]

export const kTodayFollowUps = [
  { id: '1', contact_name: 'Rajesh Kumar', phone: '9876543210', project: 'Green Valley', follow_up_type: 'Call', done: false, scheduled_at: new Date().toISOString() },
  { id: '2', contact_name: 'Priya Shah', phone: '9876543211', project: 'Skyline Towers', follow_up_type: 'Site Visit', done: true, scheduled_at: new Date().toISOString() },
]

export const kMissedFollowUps = [
  { id: '3', contact_name: 'Amit Patel', phone: '9876543212', project: 'Green Valley', follow_up_type: 'WhatsApp', done: false, scheduled_at: new Date(Date.now() - 86400000).toISOString() },
]

export const pipelineLeads: Record<string, Array<{ name: string; requirement: string; project: string; budget: string }>> = {
  'New Lead': [
    { name: 'Anita Desai', requirement: '2 BHK', project: 'Green Valley', budget: '₹45L - ₹50L' },
    { name: 'Vikram Singh', requirement: '3 BHK', project: 'Skyline Towers', budget: '₹80L - ₹85L' },
    { name: 'Neha Kapoor', requirement: 'Plot', project: 'Sunrise Plots', budget: '₹25L - ₹30L' },
    { name: 'Rahul Mehta', requirement: '2 BHK', project: 'Green Valley', budget: '₹50L - ₹55L' },
  ],
  'Follow-up': [
    { name: 'Suresh Iyer', requirement: '3 BHK', project: 'Skyline Towers', budget: '₹1Cr+' },
    { name: 'Kavita Rao', requirement: '2 BHK', project: 'Green Valley', budget: '₹45L - ₹50L' },
    { name: 'Deepak Jain', requirement: 'Commercial', project: 'Green Valley', budget: 'Above ₹1Cr' },
  ],
  'Site Visit Done': [
    { name: 'Meera Nair', requirement: '2 BHK', project: 'Green Valley', budget: '₹45L - ₹50L' },
    { name: 'Arjun Reddy', requirement: '3 BHK', project: 'Skyline Towers', budget: '₹95L - ₹1Cr' },
  ],
  'Not Interested': [
    { name: 'Sanjay Gupta', requirement: '1 BHK', project: 'Green Valley', budget: 'Below ₹5L' },
    { name: 'Pooja Sharma', requirement: '2 BHK', project: 'Skyline Towers', budget: '₹60L - ₹65L' },
  ],
  'Closed / Booked': [
    { name: 'Ravi Verma', requirement: '2 BHK', project: 'Green Valley', budget: '₹45L - ₹50L' },
    { name: 'Sunita Joshi', requirement: '3 BHK', project: 'Skyline Towers', budget: '₹80L - ₹85L' },
    { name: 'Karan Malhotra', requirement: 'Plot', project: 'Sunrise Plots', budget: '₹30L - ₹35L' },
  ],
}
