
import React, { useState } from 'react';

interface PasswordModalProps {
  onSubmit: (password: string) => void;
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue placeholder-gray-400"
            placeholder="••••••••"
            required
            autoFocus
          />
          <button
            type="submit"
            className="w-full mt-6 text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
