import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallBack;
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    mode?: MenuMode;
    onSelect?: SelectCallBack;
    defaultOpenSubMenus?:string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    // props.children 表示组件的所有子节点
    const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props;
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('marmot-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Elemnts in Menu can only be Menu items')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '0',
    defaultOpenSubMenus:[],
}

export default Menu