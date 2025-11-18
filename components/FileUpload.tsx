
import React, { useState, useCallback } from 'react';
import type { TiktokShopeeMap } from '../types';
import { UploadIcon } from './Icons';

interface FileUploadProps {
  onFileParsed: (data: TiktokShopeeMap[]) => void;
  onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileParsed, onError }) => {
  const [isDragging, setIsDragging] = useState(false);

  const parseCSV = (csvText: string): TiktokShopeeMap[] => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
      throw new Error("Tệp CSV phải có ít nhất một dòng tiêu đề và một dòng dữ liệu.");
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const tiktokIndex = headers.indexOf('tiktokLink');
    const codeIndex = headers.indexOf('shopeeCode');
    const linkIndex = headers.indexOf('shopeeLink');

    if (tiktokIndex === -1 || codeIndex === -1 || linkIndex === -1) {
      throw new Error("Tiêu đề tệp CSV phải chứa 'tiktokLink', 'shopeeCode', và 'shopeeLink'.");
    }

    return lines.slice(1).map((line, i) => {
      const values = line.split(',');
      const tiktokLink = values[tiktokIndex]?.trim();
      const shopeeCode = values[codeIndex]?.trim();
      const shopeeLink = values[linkIndex]?.trim();

      if (!tiktokLink || !shopeeCode || !shopeeLink) {
          console.warn(`Dòng ${i+2} có dữ liệu không hợp lệ, đang bỏ qua.`);
          return null;
      }
      return { tiktokLink, shopeeCode, shopeeLink };
    }).filter((item): item is TiktokShopeeMap => item !== null);
  };

  const handleFile = useCallback((file: File) => {
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsedData = parseCSV(text);
          if (parsedData.length === 0) {
            onError("Không có dữ liệu hợp lệ nào được tìm thấy trong tệp.");
          } else {
            onFileParsed(parsedData);
          }
        } catch (error) {
          if (error instanceof Error) {
            onError(error.message);
          } else {
            onError("Đã xảy ra lỗi không xác định khi xử lý tệp.");
          }
        }
      };
      reader.onerror = () => {
        onError("Không thể đọc tệp.");
      };
      reader.readAsText(file);
    } else {
      onError("Vui lòng tải lên một tệp có định dạng .csv");
    }
  }, [onFileParsed, onError]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
          handleFile(files[0]);
      }
  };

  return (
    <div className="w-full max-w-lg">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragging ? 'border-tiktok-blue bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Nhấn để tải lên</span> hoặc kéo thả
          </p>
          <p className="text-xs text-gray-500">Tệp CSV (tiktokLink, shopeeCode, shopeeLink)</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default FileUpload;
