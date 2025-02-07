import Image from 'next/image';
import { useState } from 'react';

interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

interface CountrySelectorProps {
  countries: Country[];
  onSelect: (country: Country) => void;
  onClose: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-[390px] h-full flex flex-col shadow-lg">
        <div className="flex items-center">
          <div className="relative flex-1 pl-4 pt-4 pr-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 pl-3 pr-10 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
              <button
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                onClick={() => setSearch('')}
              >
                <Image src="/close.svg" alt="close" width={38} height={38} />
              </button>
            ) : (
              <span className="absolute right-6 top-6 text-gray-400">
                <Image src="/search.svg" alt="close" width={32} height={32} />
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 mt-4 hover:text-gray-900 text-lg mr-3"
          >
            <Image src="/close.svg" alt="close" width={50} height={50} />
          </button>
        </div>

        {/* Country List */}
        <div className="flex-1 overflow-y-auto p-3">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.code}
                className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-100 rounded-lg"
                onClick={() => onSelect(country)}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium">{country.dial_code}</span>
                <span className="text-gray-600">{country.name}</span>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center">No countries found</p>
          )}
        </div>
      </div>
    </div>
  );
};
