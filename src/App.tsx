import React from 'react';
import './App.css'
import Button from './components/Button/button'

function App() {
  return (
    // 展示Button组件
    <div className="container">
      <Button btnType='primary' onClick={() => {alert('This is a primary button')}}>Large Primary</Button>
      <Button btnType='danger'>Danger</Button>
      <Button btnType='link' href='https://www.baidu.com'>Baidu</Button>
      <Button >Default</Button>
    </div>
  );
}

export default App;
