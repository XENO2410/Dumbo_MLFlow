export interface UserProfile {
  _id?: string;
  name?: string;
  age?: number;
  phoneNumber?: string;
  sex?: string;
  email?: string;
  maritalStatus?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  annualIncome?: number;
  location?: string;
  familySize?: number;
  residenceType?: string;
  category?: string;
  isDifferentlyAbled?: boolean;
  disabilityPercentage?: number;
  isMinority?: boolean;
  isStudent?: boolean;
  employmentStatus?: string;
  isGovernmentEmployee?: boolean;
  documents?: string[];
  
  // New fields for college students
  stateOfResidence?: string;
  casteCommunity?: string;
  cgpaOr12Percentage?: number; // Use this for CGPA or 12th percentage
  familyIncome?: number;
  isSingleChild?: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}