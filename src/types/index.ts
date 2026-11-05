export interface JourneyStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  plumbingScenario: string;
  systemAction: string;
  operationalBoundary: string;
}

export interface PainPoint {
  id: string;
  tag: string;
  title: string;
  impact: string;
  realWorldScenario: string;
  solution: string;
}

export interface CallLogItem {
  id: string;
  timeAgo: string;
  caller: string;
  phone: string;
  issue: string;
  urgency: 'Standard' | 'Urgent' | 'Emergency';
  status: 'Recovered & Routed' | 'Follow-up Sent' | 'Awaiting Callback';
  verifiedBooking: boolean;
  notes: string;
}

export interface EstimateItem {
  id: string;
  customer: string;
  service: string;
  amount: number;
  daysOpen: number;
  status: 'In Sequence' | 'Customer Replied' | 'Opted Out' | 'Verified Booked';
  lastAction: string;
}

export interface SystemHealthEvent {
  id: string;
  timestamp: string;
  component: string;
  status: 'Healthy' | 'Flagged Failure' | 'Resolved';
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'System' | 'Compliance' | 'Call Handling' | 'Pricing';
}

export interface AuditFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  truckCount: string;
  state: string;
  biggestChallenge: string;
  notes?: string;
}

export type CallIntakeMode = '24_7_ai_intake' | 'after_hours_overflow' | 'instant_sms_auto';
export type FollowUpCadence = 'aggressive' | 'standard' | 'manual';

export interface OnboardingIntakeData {
  // Step 1: Qualification & Identity
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  truckCount: string;
  currentSoftware: string;

  // Step 2: Diagnostic & Financials
  missedCalls: number;
  avgTicket: number;
  selectedChallenges: string[];

  // Step 3: Ollie Intake Configuration
  callIntakeMode: CallIntakeMode;
  followUpCadence: FollowUpCadence;
  enableReviews: boolean;
  enableGmbSync: boolean;
  emergencyDispatchPhone: string;
  notes?: string;
}

