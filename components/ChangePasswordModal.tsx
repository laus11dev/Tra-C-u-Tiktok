
import React, { useState } from 'react';

interface ChangePasswordModalProps {
  onSubmit: (oldPass: string, newPass: string) => Promise<boolean>;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onSubmit, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp.');
      return;
    }
    if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
        return;
    }
    setError('');
    setIsSubmitting(true);
    await onSubmit(oldPassword, newPassword);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* FIX: Removed invalid 'a' property from label element. */}
            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-400">Mật khẩu cũ</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              required
              autoFocus
            />
          </div>
           <div>
            {/* FIX: Removed invalid 'a' property from label element. */}
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-400">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              required
            />
          </div>
           <div>
            {/* FIX: Removed invalid 'a' property from label element. */}
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-400">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-tiktok-blue focus:border-tiktok-blue"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
             <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 text-sm font-medium text-gray-400 bg-gray-700 rounded-lg border border-gray-600 hover:text-white hover:bg-gray-600"
            >
                Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-gradient-to-r from-tiktok-pink to-tiktok-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;