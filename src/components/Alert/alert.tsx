import React from 'react'
import classNames from 'classnames';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface BaseAlertProps {
    type?: AlertType;
    title?: string;
    desc?: string;
    className?: string;
    closeable?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    afterClose?: () => void;
}

// type AlertProps = BaseAlertProps

const Alert: React.FC<BaseAlertProps> = (props) => {
    const [closed, setClosed] = React.useState(false);
    const {
        type,
        title,
        desc,
        className,
        closeable,
        onClose,
        onClick,
        afterClose,
        ...restProps
    } = props
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    }, {'invisible': closed})
    const handleClose = (e:React.MouseEvent<HTMLButtonElement>) => {
        setClosed(true)
        props.onClose?.(e)
    }
    const renderCloseIcon = () => {
        if(closeable) {
            return (
                <button
                onClick={handleClose}
                className="close-icon"
                >
                    X
                </button>
            )
        }
    }
    return (
        <div className={classes} {...restProps}>
            <div className="content">
                <div className='alert-message'>{title}</div>
                <div className='alert-description'>{desc}</div>
            </div>
            {renderCloseIcon()}
        </div>
    )
}
Alert.defaultProps = {
    type: 'info'
}
export default Alert