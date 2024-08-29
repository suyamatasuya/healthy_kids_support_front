import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="header mb-8 w-full bg-white flex justify-between items-center p-4 shadow">
      <img
        src="/images/header.icon.png"
        alt="ヘッダーアイコン"
        className="h-10 ml-4"
      />
      {!session ? (
        <a
          href="/api/auth/signin"
          className="font-medium text-white hover:underline ml-6 text-lg"
          style={{ fontFamily: '"Kosugi Maru", sans-serif' }}
        >
          Googleでログインする
        </a>
      ) : (
        <div className="flex items-center">
          <a
            href="/profile"
            className="menu-item font-medium text-white hover:underline ml-6 text-lg"
            style={{ fontFamily: '"Kosugi Maru", sans-serif' }}
          >
            プロフィール
          </a>
          <a
            href="#"
            onClick={() => signOut()}
            className="menu-item font-medium text-white hover:underline ml-6 text-lg"
            style={{ fontFamily: '"Kosugi Maru", sans-serif' }}
          >
            ログアウト
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
