import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { createPortal } from 'react-dom';
import { CountrySelector } from './CountrySelector';
import { useFormStore } from '../store/useFormStore';
import Image from 'next/image';

const countries = [
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'IE', name: 'Ireland', dial_code: '+353', flag: '🇮🇪' },
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'AU', name: 'Australia', dial_code: '+61', flag: '🇦🇺' },
  { code: 'AF', name: 'Afghanistan', dial_code: '+93', flag: '🇦🇫' },
  { code: 'DZ', name: 'Algeria', dial_code: '+213', flag: '🇩🇿' },
  { code: 'MK', name: 'Macedonia', dial_code: '+389', flag: '🇲🇰' },
];

const getPhoneSchema = (countryCode: string) =>
  z.object({
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine((value) => {
        const phoneNumber = parsePhoneNumberFromString(value, countryCode);
        return phoneNumber && phoneNumber.isValid();
      }, 'Invalid phone number'),
  });

export const PhoneInput = () => {
  const { phoneNumber, country, setFormData, setSubStep } = useFormStore();
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTermsCondition, setTermsAndCondition] = useState(false);
  const [privacypolicy, setPrivacyPolicy] = useState(false);

  useEffect(() => {
    setFormData({ country: selectedCountry });
  }, [selectedCountry]);

  const schema = getPhoneSchema(selectedCountry.code);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { phoneNumber }, // Load data from Zustand
  });

  const onSubmit = (data: { phoneNumber: string }) => {
    setFormData({ phoneNumber: data.phoneNumber });
    setSubStep(3);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label>Phone number</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex relative items-center gap-4 p-2 border-2 focus:outline-none rounded-full w-32 justify-between ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            onClick={() => setIsModalOpen(true)}
          >
            <div>{selectedCountry.dial_code}</div>{' '}
            <Image
              src="/arrow-down.svg"
              className="absolute right-2"
              alt="arrow"
              height={24}
              width={24}
            />
          </button>

          <input
            {...register('phoneNumber')}
            type="tel"
            className={`p-2 border-2 rounded-full w-full focus:outline-none focus:border-blue-500 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
            onChange={() => clearErrors('phoneNumber')}
          />
        </div>

        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}

        <div className="text-sm">
          By clicking ‘Continue’ you confirm that you agree to our
          <span
            onClick={() => setTermsAndCondition(true)}
            className="text-blue-500 font-bold"
          >
            {' '}
            terms and conditions
          </span>
           and{' '}
          <span
            onClick={() => setPrivacyPolicy(true)}
            className="text-blue-500 font-bold"
          >
            privacy policy
          </span>
           
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Continue
        </button>

        {isModalOpen &&
          createPortal(
            <CountrySelector
              countries={countries}
              onSelect={(country) => {
                setSelectedCountry(country);
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />,
            document.body
          )}

        {openTermsCondition &&
          createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="flex flex-col h-screen w-[390px] bg-white">
                <div className="flex justify-end pt-4 pr-4">
                  <button onClick={() => setTermsAndCondition(false)}>
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>

                <div className="flex flex-col p-4 overflow-y-scroll">
                  <div className="font-bold text-xl mb-2">
                    Terms & conditions
                  </div>
                  <div>
                    Pirate ipsum arrgh bounty warp jack. Clipper driver the
                    sloop anchor. Coast coxswain anchor jennys just furl pin
                    gangway yellow. Ahoy timbers dead tender guns of arr round
                    down bilge. Sink black avast plate tell her tender. Road
                    tales halter grog gun. Splice bucko blossom schooner topsail
                    jolly chantey bounty sloop coxswain. Or aft o'nine run the
                    dock belaying clipper. Hang ballast down topsail scurvy
                    grog. Heave halter to spot log dock rat heave hands ipsum.
                    Locker yer coxswain gold gangway. Grog pink deck men jones'
                    yawl yard fer. Lugsail starboard plate crack topsail. On
                    starboard blow sail bow grog just arr. Pinnace privateer
                    just american prey spot. Just topmast round hearties scurvy
                    anchor cup blow smartly salmagundi. Sink shrouds belaying
                    pay cutlass gangplank jolly killick lass. Parrel american
                    six arr jack line. Starboard cog seas coffer hang rig boom
                    belay to. Buccaneer blow piracy parrel down black timbers
                    rig. Tails nipperkin ketch boom gold. Pirate topgallant
                    plate jolly sheet dead. Crimp black crack boatswain men. Pin
                    ipsum shot boat arr. Mizzen prey scurvy no crow's. Log roger
                    schooner yer gangway coast piracy gunwalls. Chase yarr
                    chains down arrgh hands spirits gun. Salmagundi scurvy yarr
                    lugsail aye or bow shiver. Lass dock pin driver poop rat.
                    Avast sail bilge rat gunwalls topsail pink.
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

        {privacypolicy &&
          createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="flex flex-col h-screen w-[390px] bg-white">
                <div className="flex justify-end pt-4 pr-4">
                  <button onClick={() => setPrivacyPolicy(false)}>
                    {' '}
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>

                <div className="flex flex-col p-4 overflow-y-scroll">
                  <div className="font-bold text-xl mb-2">Privacy & Policy</div>
                  <div>
                    Pirate ipsum arrgh bounty warp jack. Clipper driver the
                    sloop anchor. Coast coxswain anchor jennys just furl pin
                    gangway yellow. Ahoy timbers dead tender guns of arr round
                    down bilge. Sink black avast plate tell her tender. Road
                    tales halter grog gun. Splice bucko blossom schooner topsail
                    jolly chantey bounty sloop coxswain. Or aft o'nine run the
                    dock belaying clipper. Hang ballast down topsail scurvy
                    grog. Heave halter to spot log dock rat heave hands ipsum.
                    Locker yer coxswain gold gangway. Grog pink deck men jones'
                    yawl yard fer. Lugsail starboard plate crack topsail. On
                    starboard blow sail bow grog just arr. Pinnace privateer
                    just american prey spot. Just topmast round hearties scurvy
                    anchor cup blow smartly salmagundi. Sink shrouds belaying
                    pay cutlass gangplank jolly killick lass. Parrel american
                    six arr jack line. Starboard cog seas coffer hang rig boom
                    belay to. Buccaneer blow piracy parrel down black timbers
                    rig. Tails nipperkin ketch boom gold. Pirate topgallant
                    plate jolly sheet dead. Crimp black crack boatswain men. Pin
                    ipsum shot boat arr. Mizzen prey scurvy no crow's. Log roger
                    schooner yer gangway coast piracy gunwalls. Chase yarr
                    chains down arrgh hands spirits gun. Salmagundi scurvy yarr
                    lugsail aye or bow shiver. Lass dock pin driver poop rat.
                    Avast sail bilge rat gunwalls topsail pink.
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </form>
    </>
  );
};
