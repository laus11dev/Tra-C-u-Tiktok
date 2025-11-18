
import React, { useState, useCallback, useEffect } from 'react';
import LinkInput from './components/LinkInput';
import ResultDisplay from './components/ResultDisplay';
import PasswordModal from './components/PasswordModal';
import AdminView from './components/AdminView';
import ProductModal from './components/AddProductModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import ExportModal from './components/ExportModal'; // Import the new component
import type { TiktokShopeeMap, SearchResult } from './types';
import { initialLinkDatabase } from './data';

const PASSWORD_KEY = 'admin_password_hash';
const DEFAULT_PASSWORD = 'Vinh3141$$';

// Moved outside the component to ensure it's a stable function.
const extractTiktokId = (url: string): string | null => {
  // Matches video IDs in URLs like:
  // - https://www.tiktok.com/@username/video/7374653584732048648
  // - https://www.tiktok.com/@username/photo/7374653584732048648
  // - Or just the ID itself
  const regex = /(?:video|photo)\/(\d+)|^\d{19,}$/;
  const match = url.match(regex);
  return match ? match[1] || match[0] : null;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<TiktokShopeeMap[]>(initialLinkDatabase);
  const [loadingState, setLoadingState] = useState<'' | 'resolving' | 'searching'>('');
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [appError, setAppError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false); // State for the new export modal
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
  }, [hashPassword]);

  const handleSearch = useCallback(async (link: string) => {
    if (link === 'admin@gocnhonhamunn') {
        setShowPasswordModal(true);
        return;
    }

    setSearchResult(null);
    setAppError(null);

    let videoIdToSearch: string | null = null;

    // ----------------------------------------
    // CASE 1: LINK RÚT GỌN vt.tiktok.com
    // ----------------------------------------
    if (link.includes("vt.tiktok.com")) {
        setLoadingState("resolving");

        try {
            const params = new URLSearchParams({ url: link });

            const response = await fetch(
                `http://localhost:3001/resolve-tiktok?${params.toString()}`
            );

            const raw = await response.text();

            if (!response.ok) {
                throw new Error(raw || `Server error ${response.status}`);
            }

            let data;
            try {
                data = JSON.parse(raw);
            } catch {
                throw new Error("Backend trả dữ liệu không phải JSON:\n" + raw);
            }

            if (!data.id) {
                throw new Error("Không tìm thấy ID video.");
            }

            videoIdToSearch = data.id;

        } catch (error: any) {
            console.error("Failed to resolve TikTok link:", error);
            setAppError(`Lỗi khi xử lý link rút gọn: ${error.message}`);
            setLoadingState("");
            return;
        }
    }

    // ----------------------------------------
    // CASE 2: LINK ĐẦY ĐỦ / HOẶC ID TỰ NHẬP
    // ----------------------------------------
    else {
        videoIdToSearch = extractTiktokId(link);
    }

    // ----------------------------------------
    // SEARCH PRODUCT MATCHING ID
    // ----------------------------------------
    setLoadingState("searching");

    if (!videoIdToSearch) {
        setSearchResult({ notFound: true });
        setLoadingState("");
        return;
    }

    const found = products.find(p => p.tiktokId === videoIdToSearch);

    if (found) {
        setSearchResult(found);
    } else {
        setSearchResult({ notFound: true });
    }

    setLoadingState("");
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
    const productWithId = {
      ...product,
      tiktokId: extractTiktokId(product.tiktokLink) || '',
    };

    if (editingProductIndex !== null) {
      // Edit
      setProducts(prev => prev.map((p, i) => i === editingProductIndex ? productWithId : p));
    } else {
      // Add
      setProducts(prev => [...prev, productWithId]);
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
          onExportClick={() => setShowExportModal(true)} // Pass handler for export button
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
        {showExportModal && ( // Render the new export modal
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
          loadingState={loadingState}
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
