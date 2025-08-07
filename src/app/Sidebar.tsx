'use client';

import { useEffect } from 'react';
import { Dropbox } from 'dropbox';
import { TabConfigType, TabNameType } from './Client';
import IconButton from '@/UI/IconButton';
import { useDropboxStore } from '@/store/dropbox';

type PropsType = {
    tabConfigs: TabConfigType[];
    activeTabName: TabNameType;
    setActiveTabName: (tabName: TabNameType) => void;
};

function Sidebar({ tabConfigs, activeTabName, setActiveTabName }: PropsType) {
    const { setDropbox } = useDropboxStore();

    useEffect(() => {
        const dropboxInstance = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN });
        setDropbox(dropboxInstance);
    }, []);

    return (
        <div className="flex flex-col max-h-[100vh] min-h-[100vh] bg-zinc-600 h-full gap-4 py-4 px-4">
            {tabConfigs.map((tabConfig) => (
                <IconButton
                    key={tabConfig.name}
                    active={tabConfig.name === activeTabName}
                    disabled={tabConfig.disabled}
                    onClick={() => setActiveTabName(tabConfig.name)}
                >
                    <tabConfig.IconComponent />
                </IconButton>
            ))}
            <div>1</div>
            <div>1</div>
        </div>
    );
}

export default Sidebar;
