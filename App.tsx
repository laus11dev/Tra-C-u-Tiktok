
import React, { useState, useCallback } from 'react';
import LinkInput from './components/LinkInput';
import ResultDisplay from './components/ResultDisplay';
import type { TiktokShopeeMap, SearchResult } from './types';

// Hardcoded database updated with the provided CSV data
const linkDatabase: TiktokShopeeMap[] = [
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/photo/7571313097198030087', shopeeCode: 'CHL-EHH-MAZ', shopeeLink: 'https://s.shopee.vn/6fZYfSAMDp' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/photo/7571522585914068232', shopeeCode: 'CDG-CHX-SLD', shopeeLink: 'https://s.shopee.vn/9zq0db6L2r' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/photo/7571649853671935250', shopeeCode: 'BMJ-KCS-BKQ', shopeeLink: 'https://s.shopee.vn/8KhmeYtaZF' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/photo/7571657235667979527', shopeeCode: 'CKV-UMW-RSW', shopeeLink: 'https://s.shopee.vn/9Utk2ixxJ5' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7571660165624352008', shopeeCode: 'CKV-UMW-RSW', shopeeLink: 'https://s.shopee.vn/9Utk2ixxJ5' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7571662555018464519', shopeeCode: 'AGS-CHD-JDZ', shopeeLink: 'https://s.shopee.vn/804wG06qSe' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7571738425615797525', shopeeCode: 'CKV-UMW-RSW', shopeeLink: 'https://s.shopee.vn/9Utk2ixxJ5' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572231159845883143', shopeeCode: 'CMQ-GHD-GSC', shopeeLink: 'https://s.shopee.vn/30gGIqTboy' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572238598355815698', shopeeCode: 'BRZ-SVQ-AMM', shopeeLink: 'https://s.shopee.vn/7AVpGWi4Xi' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572526990385843464', shopeeCode: 'BJY-LNN-KBJ', shopeeLink: 'https://s.shopee.vn/qbliuk8Gt' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572584841229749522', shopeeCode: 'BJY-LNN-KBJ', shopeeLink: 'https://s.shopee.vn/qbliuk8Gt' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572613758082878728', shopeeCode: 'CHL-EHH-MAZ', shopeeLink: 'https://s.shopee.vn/6fZYfSAMDp' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572658530793098514', shopeeCode: 'BNT-AYR-FMS', shopeeLink: 'https://s.shopee.vn/2B79JOe6x5' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572808458001517832', shopeeCode: 'AQE-YTA-CUK', shopeeLink: 'https://s.shopee.vn/5q0Rg9Pszv' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7573389177232919815', shopeeCode: 'CCG-FGR-CUP', shopeeLink: 'https://s.shopee.vn/10vBvI3oPC' },
  { tiktokLink: 'https://www.tiktok.com/@gocnhonhamunn/video/7572836732568096018', shopeeCode: 'APT-TAX-EBW', shopeeLink: 'https://s.shopee.vn/7plW3rqJnJ' },
];


const App: React.FC = () => {
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
            // Prepend https if protocol is missing, as URL constructor needs it
            const fullUrl = urlString.startsWith('http') ? urlString : `https://${urlString}`;
            const url = new URL(fullUrl);
            return url.pathname.replace(/\/$/, ''); // also remove any trailing slash
        } catch (e) {
            console.error("Invalid URL:", e);
            return null; // Invalid URL
        }
    };

    const inputPath = getPathname(link);
    
    if (!inputPath) {
        setAppError("Link TikTok không hợp lệ. Vui lòng kiểm tra lại.");
        setIsLoading(false);
        return;
    }

    // Artificial delay for UX
    setTimeout(() => {
      const found = linkDatabase.find(item => {
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
  }, []);
  
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
