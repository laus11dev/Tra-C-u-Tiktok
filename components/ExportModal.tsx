
import React, { useState, useMemo } from 'react';
import type { TiktokShopeeMap } from '../types';

interface ExportModalProps {
  products: TiktokShopeeMap[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ products, onClose }) => {
  const [copied, setCopied] = useState(false);

  const formattedData = useMemo(() => {
    // Recreate the array with specific field order for better readability
    const orderedProducts = products.map(p => ({
        tiktokLink: p.tiktokLink,
        tiktokId: p.tiktokId,
        shopeeCode: p.shopeeCode,
        shopeeLink: p.shopeeLink,
    }));
    const dataString = JSON.stringify(orderedProducts, null, 2);
    return `import type { TiktokShopeeMap } from './types';\n\nexport const initialLinkDatabase: TiktokShopeeMap[] = ${dataString};`;
  }, [products]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Export Dữ liệu sản phẩm</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        <p className="text-gray-400 mb-4 flex-shrink-0">
          Sao chép toàn bộ đoạn mã dưới đây và dán đè lên nội dung file <code className="bg-gray-700 text-tiktok-blue px-1 rounded">data.ts</code> để cập nhật danh sách sản phẩm.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-auto flex-grow relative">
          <pre><code className="text-white text-sm whitespace-pre-wrap break-all">{formattedData}</code></pre>
        </div>
        <div className="flex justify-end space-x-4 pt-6 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 text-sm font-medium text-gray-400 bg-gray-700 rounded-lg border border-gray-600 hover:text-white hover:bg-gray-600"
          >
            Đóng
          </button>
          <button
            onClick={handleCopy}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors w-32"
          >
            {copied ? 'Đã chép!' : 'Sao chép mã'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;