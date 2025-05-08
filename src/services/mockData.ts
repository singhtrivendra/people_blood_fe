
import { DonorInfo } from '../components/DonorCard';
import { BloodRequest } from '../components/RequestCard';
import { HealthInfo } from '../components/HealthCard';

export const mockDonors: DonorInfo[] = [
  {
    id: '1',
    name: 'John Doe',
    bloodType: 'A+',
    lastDonation: '2023-04-15',
    donations: 8,
    location: 'New York, NY',
    status: 'available',
    distance: 2.4
  },
  {
    id: '2',
    name: 'Jane Smith',
    bloodType: 'O-',
    lastDonation: '2023-05-22',
    donations: 12,
    location: 'Boston, MA',
    status: 'unavailable',
    distance: 3.8
  },
  {
    id: '3',
    name: 'Michael Johnson',
    bloodType: 'B+',
    lastDonation: '2023-03-10',
    donations: 5,
    location: 'Chicago, IL',
    status: 'available',
    distance: 1.5
  },
  {
    id: '4',
    name: 'Emily Davis',
    bloodType: 'AB+',
    lastDonation: '2023-06-05',
    donations: 3,
    location: 'Los Angeles, CA',
    status: 'pending',
    distance: 4.2
  },
  {
    id: '5',
    name: 'Robert Wilson',
    bloodType: 'O+',
    lastDonation: '2023-05-30',
    donations: 15,
    location: 'Seattle, WA',
    status: 'available',
    distance: 2.9
  },
  {
    id: '6',
    name: 'Sarah Thompson',
    bloodType: 'A-',
    lastDonation: '2023-04-25',
    donations: 7,
    location: 'Denver, CO',
    status: 'available',
    distance: 3.3
  },
  {
    id: '7',
    name: 'David Miller',
    bloodType: 'B-',
    lastDonation: '2023-06-10',
    donations: 2,
    location: 'Austin, TX',
    status: 'unavailable',
    distance: 5.1
  },
  {
    id: '8',
    name: 'Jennifer Brown',
    bloodType: 'AB-',
    lastDonation: '2023-03-28',
    donations: 6,
    location: 'Portland, OR',
    status: 'pending',
    distance: 2.3
  }
];

export const mockRequests: BloodRequest[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    bloodType: 'O-',
    hospital: 'Central Hospital',
    location: 'New York, NY',
    urgency: 'critical',
    createdAt: '2 hours ago',
    unitsNeeded: 3,
    unitsReceived: 1,
    reason: 'Trauma accident victim requiring immediate surgery'
  },
  {
    id: '2',
    patientName: 'Mark Williams',
    bloodType: 'A+',
    hospital: 'Memorial Medical Center',
    location: 'Boston, MA',
    urgency: 'high',
    createdAt: '5 hours ago',
    unitsNeeded: 2,
    unitsReceived: 0
  },
  {
    id: '3',
    patientName: 'Robert Davis',
    bloodType: 'B+',
    hospital: 'Mercy Hospital',
    location: 'Chicago, IL',
    urgency: 'medium',
    createdAt: '8 hours ago',
    unitsNeeded: 2,
    unitsReceived: 1
  },
  {
    id: '4',
    patientName: 'Lisa Thompson',
    bloodType: 'AB+',
    hospital: 'University Medical Center',
    location: 'Los Angeles, CA',
    urgency: 'low',
    createdAt: '1 day ago',
    unitsNeeded: 1,
    unitsReceived: 0
  },
  {
    id: '5',
    patientName: 'James Wilson',
    bloodType: 'O+',
    hospital: 'St. Mary\'s Hospital',
    location: 'Seattle, WA',
    urgency: 'high',
    createdAt: '12 hours ago',
    unitsNeeded: 4,
    unitsReceived: 2,
    reason: 'Major surgery scheduled for tomorrow morning'
  },
  {
    id: '6',
    patientName: 'Emma Brown',
    bloodType: 'A-',
    hospital: 'Presbyterian Hospital',
    location: 'Denver, CO',
    urgency: 'medium',
    createdAt: '1 day ago',
    unitsNeeded: 2,
    unitsReceived: 1
  }
];

export const mockHealthArticles: HealthInfo[] = [
  {
    id: '1',
    title: 'Benefits of Regular Blood Donation',
    excerpt: 'Discover how regular blood donation can improve your health while saving lives.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000',
    readTime: 5,
    slug: 'benefits-regular-blood-donation'
  },
  {
    id: '2',
    title: 'Understanding Blood Types and Compatibility',
    excerpt: 'Learn about different blood types and why compatibility matters for transfusions.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1626202373152-8db1760c8f61?q=80&w=1000',
    readTime: 8,
    slug: 'understanding-blood-types'
  },
  {
    id: '3',
    title: 'Preparing for Your First Blood Donation',
    excerpt: 'Tips and advice for first-time donors to ensure a smooth donation experience.',
    category: 'Tips',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000',
    readTime: 6,
    slug: 'preparing-first-blood-donation'
  },
  {
    id: '4',
    title: 'Post-Donation Care: What to Do After Giving Blood',
    excerpt: 'Important steps to take after donating blood to ensure quick recovery.',
    category: 'Health',
    imageUrl: '/images/todo_after_donate.jpg',
    readTime: 4,
    slug: 'post-donation-care'
  },
  {
    id: '5',
    title: 'Blood Donation Myths Debunked',
    excerpt: 'Common misconceptions about blood donation and the truth behind them.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?q=80&w=1000',
    readTime: 7,
    slug: 'blood-donation-myths'
  },
  {
    id: '6',
    title: 'How Blood Donations Help During Emergencies',
    excerpt: 'The critical role of blood supply during natural disasters and emergencies.',
    category: 'Emergency',
    imageUrl: '/images/Donationshelp.jpg',
    readTime: 6,
    slug: 'blood-donations-emergencies'
  }
];
