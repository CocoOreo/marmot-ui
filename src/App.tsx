import React from 'react';
import './App.css'
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
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
        <Alert type="success" title="Success" desc="Success Description" closeable={true} onClose={() => alert('close')} />
        <Alert type="info" title="Info" desc="Info Description" />
        <Alert type="error" title="Error" desc="Error Description" />
        <Alert type="warning" title="Warning" desc="Warning Description" />
      </div>
      <div className="container">
        <Menu onSelect={(index) => alert(index)}>
          <MenuItem >
            link 1
          </MenuItem>
          <MenuItem disabled>
            link 2
          </MenuItem>
          <SubMenu title="drop down">
            <MenuItem>
              drop down 1
            </MenuItem>
            <MenuItem>
              drop down 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            link 3
          </MenuItem>
        </Menu>
        <Menu mode='vertical' defaultOpenSubMenus={['2']}>
          <MenuItem >
            link 1
          </MenuItem>
          <MenuItem disabled>
            link 2
          </MenuItem>
          <SubMenu title="drop down">
            <MenuItem>
              drop down 1
            </MenuItem>
            <MenuItem>
              drop down 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            link 3
          </MenuItem>
        </Menu>
      </div>
      <div className="container">
        <Icon icon={'coffee'} theme={'primary'} size={'2x'}/>
        <Icon icon={'check'} theme={'danger'} size={'2x'}/>
        <Icon icon={'square'} theme={'warning'} size={'2x'}/>
        <Icon icon={'arrow-left'} theme={'info'} size={'2x'}/>
      </div>
    </div>
  );
}

export default App;
