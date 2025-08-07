import { ReactNode } from 'react';
import mergeClasses from '@/utils/mergeClasses';

type PropsType = {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const sizeStyles = {
    sm: 'max-w-[768px]',
    md: 'max-w-[1024px]',
    lg: 'max-w-[1280px]',
    xl: 'max-w-[1600px]',
    full: '',
};

function Container({ children, className = '', size = 'lg' }: PropsType) {
    return (
        <div className={mergeClasses('flex flex-col w-full mx-auto px-4', sizeStyles[size], className)}>{children}</div>
    );
}

export default Container;
