
import React, { useState } from 'react';
import type { SearchResult } from '../types';
import { ShopeeIcon, LinkIcon, CopyIcon } from './Icons';

interface ResultDisplayProps {
  result: SearchResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    const [copied, setCopied] = useState(false);

    if (!result) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if ('notFound' in result) {
        return (
            <div className="w-full max-w-lg mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg text-center animate-fade-in">
                <p className="text-red-400">Không tìm thấy link Shopee tương ứng cho video này.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 text-center text-shopee-orange">Kết quả của bạn</h3>
            <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center">
                        <ShopeeIcon className="w-5 h-5 mr-2" />
                        Mã giảm giá
                    </label>
                    <div className="flex items-center">
                        <p className="flex-grow p-3 bg-gray-700 rounded-l-md border border-r-0 border-gray-600 font-mono select-all">
                            {result.shopeeCode}
                        </p>
                        <button 
                            onClick={() => handleCopy(result.shopeeCode)}
                            className="p-3 bg-shopee-orange text-white rounded-r-md hover:bg-orange-700 transition-colors"
                            aria-label="Copy code"
                        >
                           {copied ? 'Đã chép!' : <CopyIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center">
                        <LinkIcon className="w-5 h-5 mr-2" />
                        Link Shopee
                    </label>
                    <a
                        href={result.shopeeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-shopee-orange text-white rounded-md hover:bg-orange-700 transition-colors text-center font-semibold break-all"
                    >
                        Đi đến Shopee
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
