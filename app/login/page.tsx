'use client';

import Image from 'next/image';
import LoginForm from '../components/LoginForm';
import { PhoneInput } from '../components/PhoneInput';
import { useFormStore } from '../store/useFormStore';

export default function LoginPage() {
  const { step, setStep, subStep, setSubStep } = useFormStore();

  return (
    <div className="flex flex-col items-center">
      {subStep !== 3 && (
        <div className="relative flex flex-col items-center mb-6 mt-6">
          {step !== 1 && (
            <Image
              alt="arrow"
              src="/arrow-left.svg"
              width={28}
              height={28}
              className="absolute left-0 top-0"
              onClick={() => setStep(1)}
            />
          )}
          <Image alt="logo" src="/logo.png" width={56} height={56} />

          {/* Header section */}
          <div className="flex mt-2 space-x-2 items-center">
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                step === 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              1
            </span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                step === 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              2
            </span>
          </div>
        </div>
      )}

      <div className="relative w-[390px] overflow-hidden">
        {/* Wrapper for all screens */}
        <div
          className={`flex w-[1170px] h-screen transition-transform duration-200 ${
            step === 1 && subStep === 1
              ? 'translate-x-0'
              : step === 1 && subStep === 2
              ? '-translate-x-1/3'
              : '-translate-x-2/3'
          }`}
        >
          {/* First Screen */}
          <div className="w-[390px] p-4">
            <LoginForm />
          </div>

          {/* Second Screen */}
          <div className="w-[390px] p-4">
            <div className="font-bold text-xl mb-2">
              Let&apos;s validate your number
            </div>
            <PhoneInput />
          </div>

          {/* Third Screen */}
          <div className="w-[390px] p-4 flex items-center justify-center flex-col">
            <Image
              src="/check-circle-success.png"
              alt="circle"
              width={120}
              height={120}
            />
            <div className="font-bold text-xl mb-2">Congratulations</div>
            <p>Welcome to your very own 25</p>
            <button
              className="text-blue-500 font-bold mt-2 text-sm"
              onClick={() => setSubStep(1)}
            >
              Back to start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
