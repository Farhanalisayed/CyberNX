import { create } from 'zustand';
import { dummyJobs } from '../data'
// import { Job } from '../types';

interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  company: string;
  postedDate: string;
}


interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
  company?: string;
}

interface StoreState {
  users: User[];
  applications: Application[];
  jobs: Job[];
  currentUser: User | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  loadUsersFromStorage: () => void;
  addJob: (job: Job) => void;
  applyToJob: (jobId: string) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  users: [],
  currentUser: null,
  isDarkMode: false,
  applications: [],
  jobs: dummyJobs,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setCurrentUser: (user) => set({ currentUser: user }),

  addUser: (user) =>
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    }),

  loadUsersFromStorage: () => {
    const usersFromStorage = JSON.parse(localStorage.getItem('users') || '[]');
    set({ users: usersFromStorage });
  },

  addJob: (newJob) =>
    set((state) => ({
      jobs: [
        ...state.jobs,
        {
          ...newJob,
          type: 'Full-time',
          salary: '$100,000 - $120,000',
          requirements: ['To be filled by employer'],
          postedDate: new Date().toISOString().split('T')[0], // e.g. 2025-04-15
        },
      ],
    })),

    logout: () => {
      set({ currentUser: null });
      localStorage.removeItem('currentUser');
    },
  

  applyToJob: (jobId: string) => {
    const { currentUser, applications } = get();
    if (!currentUser) return;

    const alreadyApplied = applications.some(
      (app) => app.userId === currentUser.id && app.jobId === jobId
    );

    if (!alreadyApplied) {
      const newApplication: Application = {
        id: Date.now().toString(),
        userId: currentUser.id,
        jobId,
        status: 'pending',
        appliedDate: new Date().toLocaleDateString(),
      };

      set({ applications: [...applications, newApplication] });
    }
  },
}));
