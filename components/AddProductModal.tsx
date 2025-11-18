
import React, { useState, useEffect, useMemo } from 'react';
import type { TiktokShopeeMap } from '../types';

interface ProductModalProps {
  onClose: () => void;
  onSave: (product: TiktokShopeeMap) => void;
  productToEdit: TiktokShopeeMap | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState<TiktokShopeeMap>({
    tiktokLink: '',
    tiktokId: '', // Initialize with empty ID
    shopeeCode: '',
    shopeeLink: '',
  });

  const isShortLink = useMemo(() => {
    return formData.tiktokLink.includes('vt.tiktok.com');
  }, [formData.tiktokLink]);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ tiktokLink: '', tiktokId: '', shopeeCode: '', shopeeLink: '' });
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.tiktokLink && formData.shopeeCode && formData.shopeeLink) {
      onSave(formData);
    } else {
      alert("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const isEditing = productToEdit !== null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tiktokLink" className="block mb-2 text-sm font-medium text-gray-400">TikTok Link</label>
            <input
              type="url"
              id="tiktokLink"
              value={formData.tiktokLink}
              onChange={handleChange}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              placeholder="https://www.tiktok.com/... hoặc https://vt.tiktok.com/..."
              required
            />
            {isShortLink ? (
               <div className="mt-3 p-3 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-sm transition-all duration-300 ease-in-out">
                <strong className="font-semibold">⚠️ Cảnh báo link rút gọn!</strong>
                <p className="mt-1">Để đảm bảo tìm kiếm chính xác nhất, bạn <strong className="text-yellow-200">phải</strong> dùng link đầy đủ. Vui lòng:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Mở link rút gọn trong một tab trình duyệt mới.</li>
                  <li>Sao chép link <strong className="text-yellow-200">đầy đủ</strong> từ thanh địa chỉ (sẽ có dạng <code className="bg-gray-700 text-tiktok-blue px-1 rounded text-xs">.../video/ID_VIDEO</code>).</li>
                  <li>Dán link đầy đủ đó vào ô bên trên.</li>
                </ol>
              </div>
            ) : (
                <p className="text-xs text-gray-500 mt-1">Ưu tiên dán link đầy đủ (có /video/...) để tìm kiếm chính xác hơn.</p>
            )}
          </div>
          <div>
            <label htmlFor="shopeeCode" className="block mb-2 text-sm font-medium text-gray-400">Shopee Code</label>
            <input
              type="text"
              id="shopeeCode"
              value={formData.shopeeCode}
              onChange={handleChange}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              placeholder="ABC-XYZ-123"
              required
            />
          </div>
          <div>
            <label htmlFor="shopeeLink" className="block mb-2 text-sm font-medium text-gray-400">Shopee Link</label>
            <input
              type="url"
              id="shopeeLink"
              value={formData.shopeeLink}
              onChange={handleChange}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              placeholder="https://s.shopee.vn/..."
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 text-sm font-medium text-gray-400 bg-gray-700 rounded-lg border border-gray-600 hover:text-white hover:bg-gray-600 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-500"
            >
                Hủy
            </button>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isEditing ? 'Lưu thay đổi' : 'Lưu sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
