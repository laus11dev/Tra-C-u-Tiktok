
import React from 'react';
import type { TiktokShopeeMap } from '../types';

interface AdminViewProps {
  products: TiktokShopeeMap[];
  onLogout: () => void;
  onAddProductClick: () => void;
  onEditProductClick: (index: number) => void;
  onDeleteProductClick: (index: number) => void;
  onChangePasswordClick: () => void;
  onExportClick: () => void; // New prop for the export button
}

const AdminView: React.FC<AdminViewProps> = ({ 
    products, 
    onLogout, 
    onAddProductClick, 
    onEditProductClick, 
    onDeleteProductClick,
    onChangePasswordClick,
    onExportClick // Destructure the new prop
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full p-4 md:p-8">
      <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Admin Panel
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={onExportClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Export Dữ liệu
          </button>
          <button
            onClick={onChangePasswordClick}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Đổi mật khẩu
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main>
        <div className="flex justify-end mb-4">
            <button 
                onClick={onAddProductClick}
                className="text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Thêm sản phẩm mới
            </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">TikTok Link</th>
                  <th className="py-3 px-6 text-left">TikTok ID</th>
                  <th className="py-3 px-6 text-left">Shopee Code</th>
                  <th className="py-3 px-6 text-left">Shopee Link</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <a href={product.tiktokLink} target="_blank" rel="noopener noreferrer" className="hover:text-tiktok-blue break-all">{product.tiktokLink}</a>
                    </td>
                     <td className="py-3 px-6 text-left font-mono">
                      {product.tiktokId}
                    </td>
                    <td className="py-3 px-6 text-left font-mono">
                      {product.shopeeCode}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <a href={product.shopeeLink} target="_blank" rel="noopener noreferrer" className="hover:text-shopee-orange break-all">{product.shopeeLink}</a>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                            <button onClick={() => onEditProductClick(index)} className="w-8 h-8 rounded bg-yellow-600 hover:bg-yellow-700 text-white flex items-center justify-center" aria-label="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </button>
                             <button onClick={() => onDeleteProductClick(index)} className="w-8 h-8 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminView;