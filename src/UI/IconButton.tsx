import { ReactNode } from 'react';
import mergeClasses from '@/utils/mergeClasses';

type PropsType = {
    children: ReactNode;
    variant?: 'primary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    active?: boolean;
    disabled?: boolean;
    className?: string;
};

const sizeStyles = {
    sm: 'text-base p-1',
    md: 'text-lg p-2',
    lg: 'text-xl p-3',
};

const variantStyles = {
    primary: {
        default: 'bg-blue-600 text-white',
        hover: 'hover:bg-blue-700',
        disabled: 'opacity-50',
        active: 'bg-blue-700',
    },
};

function IconButton({
    children,
    variant = 'primary',
    size = 'lg',
    onClick = () => {},
    type = 'button',
    active = false,
    disabled = false,
    className = '',
}: PropsType) {
    function getVariantStyles() {
        const stylesConfig = variantStyles[variant];
        return mergeClasses(
            stylesConfig.default,
            !disabled && !active && stylesConfig.hover,
            active && stylesConfig.active,
            disabled && stylesConfig.disabled
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={mergeClasses(
                'rounded transition-colors duration-200 cursor-pointer',
                sizeStyles[size],
                getVariantStyles(),
                disabled && 'cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}

export default IconButton;
