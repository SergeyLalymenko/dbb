export function getFromLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
        return JSON.parse(data) as T;
    } catch {
        return null;
    }
}

export function setToLocalStorage(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
}
