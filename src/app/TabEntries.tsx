'use client';

import { useState, useEffect } from 'react';
import { useDropboxStore } from '@/store/dropbox';
import EntryRow from './EntryRow';
import EntriesBreadcrumbs from './EntriesBreadcrumbs';
import { DropboxEntryType } from '@/services/dropboxService';
import { fetchEntries as fetchEntriesService, fetchEntry as fetchEntryService } from '@/services/dropboxService';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';

export type PathConfigType = {
    pathLower: string;
    pathDisplay: string;
};

export const rootPathConfig: PathConfigType = {
    pathLower: '',
    pathDisplay: 'Root',
};

function TabEntries() {
    const { dropbox, isLoadError } = useDropboxStore();

    const [pathConfig, setPathConfig] = useState<PathConfigType>(
        typeof window !== 'undefined'
            ? getFromLocalStorage<PathConfigType>('pathConfig') || rootPathConfig
            : rootPathConfig
    );
    const [entries, setEntries] = useState<DropboxEntryType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setToLocalStorage('pathConfig', pathConfig);
        fetchEntries();
    }, [pathConfig.pathLower, dropbox]);

    async function fetchEntries() {
        if (!dropbox) {
            setEntries([]);
            return;
        }

        setIsLoading(true);
        const newEntries = await fetchEntriesService(dropbox, pathConfig.pathLower);
        setEntries(newEntries);
        setIsLoading(false);
    }

    async function fetchEntry(path: string) {
        if (!dropbox) return;
        const newEntry = await fetchEntryService(dropbox, path);
        if (!newEntry) return;
        setEntries((prevEntries) => {
            return prevEntries.map((entry) => (entry.path_lower === newEntry?.path_lower ? newEntry : entry));
        });
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl">Entries:</h1>
            {isLoadError ? (
                <p>Dropbox load error!</p>
            ) : !dropbox ? (
                <p>Dropbox loading...</p>
            ) : (
                <div className="flex flex-col mt-4">
                    <EntriesBreadcrumbs pathConfig={pathConfig} setPathConfig={setPathConfig} />
                    <div className="flex flex-col mt-2">
                        {isLoading ? (
                            <p>Entries loading...</p>
                        ) : !entries.length ? (
                            <p>Empty!</p>
                        ) : (
                            entries.map((entry: DropboxEntryType, i) => (
                                <EntryRow
                                    entry={entry}
                                    isFirst={i === 0}
                                    setPathConfig={setPathConfig}
                                    fetchEntry={fetchEntry}
                                    key={'id' in entry ? entry.id : (entry.path_lower ?? i)}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TabEntries;
