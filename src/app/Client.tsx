'use client';

import { ComponentType, useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import TabEntries from './TabEntries';
import TabEmpty from './TabEmpty';
import Container from '@/components/Container';
import { IoFolderSharp } from 'react-icons/io5';
import { MdOutlineTableChart, MdOutlineTableRows } from 'react-icons/md';
import { useDropboxStore } from '@/store/dropbox';
import { Dropbox } from 'dropbox';

export type TabNameType = 'entries' | 'tab-2' | 'tab-3';
export type TabConfigType = {
    name: TabNameType;
    Component: ComponentType;
    IconComponent: ComponentType;
    disabled: boolean;
};

const tabConfigs: TabConfigType[] = [
    {
        name: 'entries',
        Component: TabEntries,
        IconComponent: IoFolderSharp,
        disabled: false,
    },
    {
        name: 'tab-2',
        Component: TabEmpty,
        IconComponent: MdOutlineTableChart,
        disabled: false,
    },
    {
        name: 'tab-3',
        Component: TabEmpty,
        IconComponent: MdOutlineTableRows,
        disabled: true,
    },
];

function Client() {
    const { setDropbox } = useDropboxStore();
    const [activeTabName, setActiveTabName] = useState<TabNameType>('entries');
    const activeTabConfig = useMemo(() => {
        return tabConfigs.find((tabConfig) => tabConfig.name === activeTabName)!;
    }, [activeTabName]);

    useEffect(() => {
        const dropbox = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN });
        setDropbox(dropbox);
    }, []);

    return (
        <div className="flex">
            <Sidebar tabConfigs={tabConfigs} activeTabName={activeTabName} setActiveTabName={setActiveTabName} />
            <Container className="py-5">
                <activeTabConfig.Component />
            </Container>
        </div>
    );
}

export default Client;
