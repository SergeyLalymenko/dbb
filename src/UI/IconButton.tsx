import { ReactNode } from 'react';
import mergeClasses from '@/utils/mergeClasses';

type PropsType = {
    children: ReactNode;
    variant?: 'primary' | 'success' | 'delete';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
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
    success: {
        default: 'bg-green-700 text-white',
        hover: 'hover:bg-green-600',
        disabled: 'opacity-50',
        active: 'bg-green-600',
    },
    delete: {
        default: 'bg-red-700 text-white',
        hover: 'hover:bg-red-600',
        disabled: 'opacity-50',
        active: 'bg-red-600',
    },
};

function IconButton({
    children,
    variant = 'primary',
    size = 'lg',
    onClick = () => {},
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
        <div
            onClick={onClick}
            className={mergeClasses(
                'flex items-center rounded transition-colors duration-200 cursor-pointer',
                sizeStyles[size],
                getVariantStyles(),
                disabled && 'cursor-not-allowed',
                className
            )}
        >
            {children}
        </div>
    );
}

export default IconButton;
