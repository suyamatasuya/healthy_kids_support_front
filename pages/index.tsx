import React from 'react';
import LoginButton from '../components/LoginButton';

const Home: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Healthy Kids Support</h1>
      </header>
      <main className="main">
        <p>Welcome to the Healthy Kids Support App!</p>
        <LoginButton />
      </main>
      <footer className="footer">
        <p>&copy; 2024 Healthy Kids Support. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
