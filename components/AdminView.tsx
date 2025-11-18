import React from 'react';
import type { TiktokShopeeMap } from '../types';
import { TiktokIcon, ShopeeIcon } from './Icons';

interface AdminViewProps {
  products: TiktokShopeeMap[];
  onLogout: () => void;
  onAddProductClick: () => void;
  onEditProductClick: (index: number) => void;
  onDeleteProductClick: (index: number) => void;
  onChangePasswordClick: () => void;
  onExportClick: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
    products, 
    onLogout, 
    onAddProductClick, 
    onEditProductClick, 
    onDeleteProductClick,
    onChangePasswordClick,
    onExportClick
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={onChangePasswordClick} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Đổi Mật Khẩu
            </button>
            <button onClick={onExportClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Export Data
            </button>
            <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Đăng xuất
            </button>
          </div>
        </header>
        
        <div className="mb-6">
          <button onClick={onAddProductClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors w-full sm:w-auto">
            + Thêm Sản Phẩm Mới
          </button>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">TikTok Link</th>
                <th scope="col" className="px-6 py-3">Shopee Code</th>
                <th scope="col" className="px-6 py-3">Shopee Link</th>
                <th scope="col" className="px-6 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <a href={product.tiktokLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-tiktok-blue break-all">
                      <TiktokIcon className="w-5 h-5 flex-shrink-0" />
                      <span>{product.tiktokLink}</span>
                    </a>
                  </td>
                  <td className="px-6 py-4 font-mono">{product.shopeeCode}</td>
                  <td className="px-6 py-4">
                     <a href={product.shopeeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-shopee-orange break-all">
                      <ShopeeIcon className="w-5 h-5 flex-shrink-0" />
                       <span>{product.shopeeLink}</span>
                    </a>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button onClick={() => onEditProductClick(index)} className="font-medium text-blue-500 hover:underline">Sửa</button>
                    <button onClick={() => onDeleteProductClick(index)} className="font-medium text-red-500 hover:underline">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
            <p className="text-center text-gray-400 mt-8">Chưa có sản phẩm nào. Hãy thêm một sản phẩm!</p>
        )}
      </div>
    </div>
  );
};

export default AdminView;
