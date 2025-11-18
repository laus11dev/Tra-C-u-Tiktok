import React, { useState, useEffect } from 'react';
import type { TiktokShopeeMap } from '../types';

interface ProductModalProps {
  onClose: () => void;
  onSave: (product: TiktokShopeeMap) => void;
  productToEdit: TiktokShopeeMap | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onSave, productToEdit }) => {
  const [product, setProduct] = useState<TiktokShopeeMap>({
    tiktokLink: '',
    shopeeCode: '',
    shopeeLink: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.tiktokLink && product.shopeeCode && product.shopeeLink) {
        onSave(product);
    } else {
        alert("Vui lòng điền đầy đủ thông tin.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">{productToEdit ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tiktokLink" className="block mb-2 text-sm font-medium text-gray-300">TikTok Link</label>
            <input
              type="text"
              name="tiktokLink"
              id="tiktokLink"
              value={product.tiktokLink}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="shopeeCode" className="block mb-2 text-sm font-medium text-gray-300">Shopee Code</label>
            <input
              type="text"
              name="shopeeCode"
              id="shopeeCode"
              value={product.shopeeCode}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="shopeeLink" className="block mb-2 text-sm font-medium text-gray-300">Shopee Link</label>
            <input
              type="text"
              name="shopeeLink"
              id="shopeeLink"
              value={product.shopeeLink}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
