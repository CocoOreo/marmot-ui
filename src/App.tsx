import React from 'react';
import './App.css'
import Button from './components/Button/button'
import Alert from './components/Alert/alert'

function App() {
  return (
    // 展示Button组件
    <div>
      <div className="container">
        <Button btnType='primary' onClick={() => { alert('This is a primary button') }}>Large Primary</Button>
        <Button btnType='danger'>Danger</Button>
        <Button btnType='link' href='https://www.baidu.com'>Baidu</Button>
        <Button >Default</Button>
      </div>
      <div className='container'>
        <Alert type="success" title="Success" desc="Success Description" closeable={true} onClose={() => alert('close')}/>
        <Alert type="info" title="Info" desc="Info Description"/>
        <Alert type="error" title="Error" desc="Error Description"/>
        <Alert type="warning" title="Warning" desc="Warning Description"/>
      </div>
    </div>
  );
}

export default App;
