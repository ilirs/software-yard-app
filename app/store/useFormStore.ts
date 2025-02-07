import { create } from 'zustand';

interface FormState {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  country: { code: string; name: string; dial_code: string; flag: string };
  step: number;
  subStep: number;
  setFormData: (data: Partial<FormState>) => void;
  setStep: (step: number) => void;
  setSubStep: (subStep: number) => void;
}

const initialState: Omit<FormState, 'setFormData' | 'setStep' | 'setSubStep'> =
  {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    country: {
      code: 'GB',
      name: 'United Kingdom',
      dial_code: '+44',
      flag: '🇬🇧',
    },
    step: 1,
    subStep: 1,
  };

export const useFormStore = create<FormState>((set) => ({
  ...initialState,
  setFormData: (data) => set((state) => ({ ...state, ...data })),
  setStep: (step) => set({ step }),
  setSubStep: (subStep) => set({ subStep }),
}));
