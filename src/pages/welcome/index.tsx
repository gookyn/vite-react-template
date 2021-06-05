import React, { useState } from 'react';
import logo from '@/images/logo.png';
import './index.less';

const Welcome: React.FC<any> = () => {
  return (
    <div className="welcome">
      <img src={logo} alt="logo" className="hello-logo" />
      <p className="hello-content">Hello Vite + React!</p>
    </div>
  );
};

export default Welcome;
