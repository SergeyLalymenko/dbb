import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import mergeClasses from '@/utils/mergeClasses';

const poppinsSans = Poppins({
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'DBB',
    description: 'DBB description',
};

type PropsType = {
    children: ReactNode;
};

function RootLayout({ children }: PropsType) {
    return (
        <html lang="en">
            <body className={mergeClasses('flex flex-col min-h-screen text-gray-100', poppinsSans.variable)}>
                {children}
            </body>
        </html>
    );
}

export default RootLayout;
