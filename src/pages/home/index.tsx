import React, { useState } from 'react';
import logo from '@/images/logo.png';
import './index.less';

const Home: React.FC<any> = () => {
  return (
    <div className="home">
      <img src={logo} alt="logo" className="home-logo" />
      <p className="home-content">Home</p>
    </div>
  );
};

export default Home;
