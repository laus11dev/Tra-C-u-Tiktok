
import React, { useState } from 'react';
import type { SearchResult } from '../types.ts';
import { ShopeeIcon, LinkIcon, CopyIcon } from './Icons.tsx';

interface ResultDisplayProps {
  result: SearchResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    if (!result) return null;

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
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
            <h3 className="text-lg font-semibold mb-6 text-center text-shopee-orange">Kết quả của bạn ({result.products.length} sản phẩm)</h3>
            
            <div className="space-y-8">
                {result.products.map((product, index) => (
                    <div key={index} className={`bg-gray-700/30 p-4 rounded-lg border border-gray-600 ${index > 0 ? 'mt-6' : ''}`}>
                        <div className="mb-3 text-sm sm:text-base text-white font-bold uppercase tracking-wide border-b border-gray-600 pb-2">
                            {product.productName || `Sản phẩm #${index + 1}`}
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <ShopeeIcon className="w-4 h-4 mr-2" />
                                    Mã Sản Phẩm
                                </label>
                                <div className="flex items-center">
                                    <p className="flex-grow p-3 bg-gray-700 rounded-l-md border border-r-0 border-gray-600 font-mono select-all text-sm sm:text-base">
                                        {product.shopeeCode}
                                    </p>
                                    <button 
                                        onClick={() => handleCopy(product.shopeeCode, index)}
                                        className="p-3 bg-shopee-orange text-white rounded-r-md hover:bg-orange-700 transition-colors flex-shrink-0 w-[100px] flex justify-center items-center"
                                        aria-label="Copy code"
                                    >
                                    {copiedIndex === index ? 'Đã chép!' : (
                                        <>
                                            <CopyIcon className="w-5 h-5 mr-1" /> Copy
                                        </>
                                    )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Link Shopee
                                </label>
                                <a
                                    href={product.shopeeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-tiktok-blue rounded-md transition-colors text-center font-medium text-sm break-all flex items-center justify-center gap-2 group"
                                >
                                    <span>Đến Shopee ngay</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-400 italic">
                Nàng Xinh copy mã hoặc ấn vào link để xem sản phẩm nhé
            </div>
        </div>
    );
};

export default ResultDisplay;