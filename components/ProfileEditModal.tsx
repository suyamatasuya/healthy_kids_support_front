import React, { useState } from 'react';

export const ProfileEditModal: React.FC<{ onClose: () => void, onSave: (name: string) => void }> = ({ onClose, onSave }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (username.trim() === '') {
      setError('ユーザー名を入力してください');
      return;
    }

    setError(null);
    onSave(username);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">プロフィールを編集</h2>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">ユーザー名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2" onClick={onClose}>
            キャンセル
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
