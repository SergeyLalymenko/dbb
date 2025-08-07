'use client';

import { useState, useEffect } from 'react';
import { useDropboxStore } from '@/store/dropbox';

function TabFolders() {
    const { dropbox } = useDropboxStore();

    const [path, setPath] = useState<string>('');
    const [entries, setEntries] = useState<any[]>([]);

    useEffect(() => {
        async function fetchEntries() {
            if (!dropbox) {
                setEntries([]);
                return;
            }

            try {
                console.log(dropbox);
                const res = await dropbox.filesListFolder({ path });
                setEntries(res.result.entries);
                console.log('Entries:', res.result.entries);
            } catch {
                setEntries([]);
            }
        }
        fetchEntries();
    }, [path, dropbox]);

    if (!dropbox) return <p>Loading...</p>;

    return <div>{JSON.stringify(entries)}</div>;
}

export default TabFolders;
