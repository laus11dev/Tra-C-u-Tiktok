import React, { useState, useCallback, useEffect } from 'react';
import LinkInput from './components/LinkInput';
import ResultDisplay from './components/ResultDisplay';
import PasswordModal from './components/PasswordModal';
import AdminView from './components/AdminView';
import ProductModal from './components/AddProductModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import ExportModal from './components/ExportModal';
import type { TiktokShopeeMap, SearchResult } from './types';
import { initialLinkDatabase } from './data';

const PASSWORD_KEY = 'admin_password_hash';
const DEFAULT_PASSWORD = 'Vinh3141$$';

const App: React.FC = () => {
  // State is now initialized directly from the imported data file.
  const [products, setProducts] = useState<TiktokShopeeMap[]>(initialLinkDatabase);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [appError, setAppError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const initPassword = async () => {
      if (!localStorage.getItem(PASSWORD_KEY)) {
        const defaultHash = await hashPassword(DEFAULT_PASSWORD);
        localStorage.setItem(PASSWORD_KEY, defaultHash);
      }
    };
    initPassword();
  }, []);

  const handleSearch = useCallback((link: string) => {
    if (link === 'admin@gocnhonhamunn') {
      setShowPasswordModal(true);
      return;
    }

    setIsLoading(true);
    setSearchResult(null);
    setAppError(null);

    const getPathname = (urlString: string): string | null => {
        try {
            const fullUrl = urlString.startsWith('http') ? urlString : `https://${urlString}`;
            const url = new URL(fullUrl);
            return url.pathname.replace(/\/$/, '');
        } catch (e) {
            console.error("Invalid URL:", e);
            return null;
        }
    };

    const inputPath = getPathname(link);
    
    if (!inputPath) {
        setAppError("Link TikTok không hợp lệ. Vui lòng kiểm tra lại.");
        setIsLoading(false);
        return;
    }

    setTimeout(() => {
      const found = products.find(item => {
          const itemPath = getPathname(item.tiktokLink);
          return itemPath === inputPath;
      });

      if (found) {
        setSearchResult(found);
      } else {
        setSearchResult({ notFound: true });
      }
      setIsLoading(false);
    }, 500);
  }, [products]);

  const handlePasswordSubmit = async (password: string) => {
    const storedHash = localStorage.getItem(PASSWORD_KEY);
    const inputHash = await hashPassword(password);
    if (inputHash === storedHash) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setInputValue('');
    } else {
      alert('Mật khẩu không đúng!');
    }
  };
  
  const handleChangePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    const storedHash = localStorage.getItem(PASSWORD_KEY);
    const oldPassHash = await hashPassword(oldPass);
    if (oldPassHash !== storedHash) {
        alert('Mật khẩu cũ không đúng!');
        return false;
    }
    const newPassHash = await hashPassword(newPass);
    localStorage.setItem(PASSWORD_KEY, newPassHash);
    alert('Đổi mật khẩu thành công!');
    setShowChangePasswordModal(false);
    return true;
  };

  const handleLogout = () => {
      setIsAdmin(false);
  }

  const handleSaveProduct = (product: TiktokShopeeMap) => {
    if (editingProductIndex !== null) {
      // Edit
      setProducts(prev => prev.map((p, i) => i === editingProductIndex ? product : p));
    } else {
      // Add
      setProducts(prev => [...prev, product]);
    }
    setShowProductModal(false);
    setEditingProductIndex(null);
  };

  const handleDeleteProduct = (index: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        setProducts(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (isAdmin) {
    return (
        <>
            <AdminView 
                products={products} 
                onLogout={handleLogout} 
                onAddProductClick={() => { setEditingProductIndex(null); setShowProductModal(true); }}
                onEditProductClick={(index) => { setEditingProductIndex(index); setShowProductModal(true); }}
                onDeleteProductClick={handleDeleteProduct}
                onChangePasswordClick={() => setShowChangePasswordModal(true)}
                onExportClick={() => setShowExportModal(true)}
            />
            {showProductModal && (
                <ProductModal 
                    onClose={() => { setShowProductModal(false); setEditingProductIndex(null); }}
                    onSave={handleSaveProduct}
                    productToEdit={editingProductIndex !== null ? products[editingProductIndex] : null}
                />
            )}
            {showChangePasswordModal && (
                <ChangePasswordModal
                    onClose={() => setShowChangePasswordModal(false)}
                    onSubmit={handleChangePassword}
                />
            )}
            {showExportModal && (
                <ExportModal
                    products={products}
                    onClose={() => setShowExportModal(false)}
                />
            )}
        </>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {showPasswordModal && (
        <PasswordModal 
          onSubmit={handlePasswordSubmit} 
          onClose={() => {
            setShowPasswordModal(false);
            setInputValue('');
          }} 
        />
      )}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Xin chào Nàng Xinh đã ghé thăm
        </h1>
        <p className="text-gray-400 mt-2">
          Để thuận tiện cho việc tìm kiếm sản phẩm ưng ý, nàng xinh vui lòng dán link video tiktok của Munn vào ô bên dưới để nhận sản phẩm nhá
        </p>
      </header>

      <main className="w-full flex flex-col items-center">
        {appError && (
          <div className="w-full max-w-lg bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Lỗi: </strong>
            <span className="block sm:inline">{appError}</span>
          </div>
        )}
        
        <LinkInput 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            inputValue={inputValue}
            setInputValue={setInputValue}
        />
        <ResultDisplay result={searchResult} />
        
        <div className="w-full max-w-lg mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-300">Hướng dẫn lấy link</h3>
            <ol className="space-y-2 text-gray-400 text-left max-w-sm mx-auto">
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">1.</span><span>Trên video TikTok, nhấn vào nút <span className="font-semibold text-white">"Share"</span> (Chia sẻ).</span></li>
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">2.</span><span>Chọn <span className="font-semibold text-white">"Sao chép liên kết"</span> từ các tùy chọn.</span></li>
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">3.</span><span>Dán link vào ô bên trên và nhấn <span className="font-semibold text-white">"Lấy Link & Code"</span>.</span></li>
            </ol>
        </div>
      </main>
    </div>
  );
};

export default App;
