import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function mergeClasses(...inputs: any[]): string {
    return twMerge(clsx(...inputs));
}

export default mergeClasses;
