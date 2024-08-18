import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProfileEditModal from '../components/ProfileEditModal';

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      // IDでユーザー情報を取得
      fetch(`http://localhost:3001/users/${session.user.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => setUser(data.user))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [session, status]);

  const handleSave = (updatedName: string) => {
    if (!user) return;

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
        return response.json();
      })
      .then(data => setUser(data.user))
      .catch(error => console.error('Error updating user:', error));

    setIsModalOpen(false);
  };

  if (status === 'loading') {
    return <p>ロード中...</p>;
  }

  return (
    <div className="profile flex flex-col items-center py-10">
      {user && (
        <>
          <h1 className="text-4xl font-bold mb-6">{user.name}</h1>
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="w-full bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">スタンプの取得状況</h2>
              {/* スタンプの取得状況のコンテンツをここに追加 */}
              <p>スタンプの情報をここに表示</p>
            </div>
            <div className="w-full bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">進捗状況</h2>
              {/* 現在の進捗状況のコンテンツをここに追加 */}
              <p>進捗状況の情報をここに表示</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            プロフィールを編集
          </button>
        </>
      )}

      {isModalOpen && (
        <ProfileEditModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Profile;
