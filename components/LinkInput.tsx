import React from 'react';
import { TiktokIcon } from './Icons';

interface LinkInputProps {
  onSearch: (link: string) => void;
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const LinkInput: React.FC<LinkInputProps> = ({ onSearch, isLoading, inputValue, setInputValue }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <TiktokIcon className="w-5 h-5 text-gray-400"/>
        </div>
        <input
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full p-4 pl-10 pr-44 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue placeholder-gray-400"
          placeholder="Dán link TikTok vào đây..."
          required
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
            <button
              type="submit"
              disabled={isLoading || !inputValue}
              className="text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? 'Đang tìm...' : 'Lấy Link & Code'}
            </button>
        </div>
      </div>
    </form>
  );
};

export default LinkInput;