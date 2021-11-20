import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends React.ComponentProps<typeof FontAwesomeIcon> {
    theme?: ThemeProps;
}

export const Icon: React.FC<IconProps> = (props) => {
    // icon-primary
    const { className, theme, ...restProps } = props;
    const classes = classNames('marmot-icon', className, {
        [`icon-${theme}`]: theme,
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon;