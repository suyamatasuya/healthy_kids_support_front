import React from 'react';
import LoginButton from '../components/LoginButton';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-primary-light min-h-screen text-center text-gray-800 w-full flex flex-col justify-center items-center">
      <header className="header mb-8 w-full text-primary-light">
        <h1 className="text-5xl font-bold text-primary-dark font-sans">
          すこやかキッズサポート
        </h1>
      </header>
      <main className="main flex flex-col items-center w-full">
        <p className="text-2xl font-medium mb-4">
          遊んで学ぼう!親子で楽しむすこやかキッズ応援アプリ
        </p>
        <img
          src="/images/main.webp"
          alt="すこやかキッズサポート ロゴ"
          className="w-full max-w-lg mb-8 rounded-xl"
        />
        <div className="w-full p-6 bg-white rounded-xl shadow-lg max-w-sm">
          <LoginButton />
        </div>
      </main>
      <footer className="footer mt-12 w-full">
        <p className="text-sm text-primary-light">
          &copy; 2024 Healthy Kids Support. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
