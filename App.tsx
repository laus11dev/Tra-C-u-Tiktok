
import React, { useState, useCallback } from 'react';
import LinkInput from './components/LinkInput';
import ResultDisplay from './components/ResultDisplay';
import type { SearchResult } from './types';
import { initialLinkDatabase } from './data';

const App: React.FC = () => {
  const products = initialLinkDatabase;
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [appError, setAppError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useCallback((link: string) => {
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
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
            <ol className="space-y-2 text-gray-400 text-left max-w-md mx-auto">
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">1.</span><span>Trên video TikTok, nhấn vào nút <span className="font-semibold text-white">"Share"</span> (Chia sẻ).</span></li>
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">2.</span><span>Chọn <span className="font-semibold text-white">"Sao chép liên kết"</span> từ các tùy chọn.</span></li>
                <li className="flex items-start">
                    <span className="font-bold text-tiktok-blue mr-3">3.</span>
                    <span>Dán liên kết vào trình duyệt bất kì (*chrome, cốc cốc,.. ) để lấy link có dạng </span>
                </li>
                <li><code className="bg-gray-700 p-1 rounded text-xs break-all">https://www.tiktok.com/@gocnhonhamunn/video/abc </code></li>
                <li className="flex items-start"><span className="font-bold text-tiktok-blue mr-3">4.</span><span>Dán link vào ô bên trên và nhấn <span className="font-semibold text-white">"Lấy Link & Code"</span>.</span></li>
            </ol>
        </div>
      </main>
    </div>
  );
};

export default App;
