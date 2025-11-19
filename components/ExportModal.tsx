
import React, { useState } from 'react';
import type { TiktokShopeeMap } from '../types.ts';

interface ExportModalProps {
    products: TiktokShopeeMap[];
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ products, onClose }) => {
    const [copied, setCopied] = useState(false);

    const generateFileContent = () => {
        return `import type { TiktokShopeeMap } from './types.ts';\n\nexport const initialLinkDatabase: TiktokShopeeMap[] = ${JSON.stringify(products, null, 2)};`;
    };

    const handleCopy = () => {
        const content = generateFileContent();
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const content = generateFileContent();
        const blob = new Blob([content], { type: 'text/typescript;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "data.ts");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Export Data</h2>
                <p className="text-gray-400 mb-6 text-center">Copy this content and replace the content of your <code className="bg-gray-700 p-1 rounded">data.ts</code> file.</p>
                
                <div className="relative">
                    <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto max-h-80 text-xs sm:text-sm">
                        <code>
                            {generateFileContent()}
                        </code>
                    </pre>
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={handleDownload}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Download data.ts
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
