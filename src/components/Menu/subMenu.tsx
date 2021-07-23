import React, {useContext , useState, FunctionComponentElement} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
    index?:string;
    title:string;
    className?: string;
}

const SubMenu:React.FC<SubMenuProps> = ({index,title,children,className})=>{
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpened, setMenuOpened] = useState(isOpened)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })
    const handleClick = (e: React.MouseEvent) => {
        // e.preventDefault()
        setMenuOpened(!menuOpened)
    }
    let toggleTimer:any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(toggleTimer);
        e.preventDefault()
        toggleTimer = setTimeout(()=>{
            setMenuOpened(toggle)
        },150)
    }
    const clickEvents = context.mode === 'vertical'? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    } : {}
    const renderChildren = ()=>{
        const subMenuClasses = classNames('marmot-submenu',{
            'menu-opened': menuOpened
        })
        const childrenComponent = React.Children.map(children, (child,i)=>{
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName ==='MenuItem') {
                return React.cloneElement(childElement, {
                    index : `${index}-${i}`
                })
            } else {
                console.error('Warning: Elements in sub menu can only be menu items')
            }
        })
        return <ul className={subMenuClasses}>
            {childrenComponent}
        </ul>
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu