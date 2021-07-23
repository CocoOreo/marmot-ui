import React from "react";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from "./subMenu";

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVertical: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    onSelect: jest.fn(),
    className: 'test-vertical',
    defaultOpenSubMenus: ['3']
}
const CreateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem  >
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                Item 3
            </MenuItem>
            <SubMenu title="drop down">
                <MenuItem>
                    drop down 1
                </MenuItem>
                <MenuItem>
                    drop down 2
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const creatStyleFile = () => {
    const cssFile: string = `
        .marmot-submenu {
            display: none;
        }
        .marmot-submenu.menu-opened {
            display:block
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile;
    return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and Menu Item components', () => {
    beforeEach(() => {
        wrapper = render(CreateMenu(testProps))
        wrapper.container.append(creatStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct components basedon default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('marmot-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('active style should be changed and callback function should be called when click', () => {
        const thirdItem = wrapper.getByText('Item 3')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical menu when mode equals to vertical', () => {
        cleanup()
        const wrapper = render(CreateMenu(testVertical))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show sub menu items when mouse hover on the sub menu', async () => {
        //  use query when element could be null, and use get when you're sure that element is existed
        expect(wrapper.queryByText('drop down 1')).not.toBeVisible()
        const dropDownElement = wrapper.getByText('drop down')
        fireEvent.mouseEnter(dropDownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('drop down 1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop down 1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropDownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('drop down 1')).not.toBeVisible()
        })
    })
    it('should show vertical sub menu items when default opened and when clicked', ()=> {
        cleanup()
        const wrapper = render(CreateMenu(testVertical))
        wrapper.container.append(creatStyleFile())
        expect(wrapper.getByText('drop down 1')).toBeVisible()
        fireEvent.click(wrapper.getByText('drop down'))
        expect(wrapper.getByText('drop down 1')).not.toBeVisible()
    })
})
