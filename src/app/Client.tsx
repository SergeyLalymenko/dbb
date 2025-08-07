'use client';

import { ComponentType, useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import TabFolders from './TabFolders';
import TabEmpty from './TabEmpty';
import Container from '@/components/Container';
import { IoFolderSharp } from 'react-icons/io5';
import { MdOutlineTableChart, MdOutlineTableRows } from 'react-icons/md';

export type TabNameType = 'folders' | 'tab-2' | 'tab-3';
export type TabConfigType = {
    name: TabNameType;
    Component: ComponentType;
    IconComponent: ComponentType;
    disabled: boolean;
};

const tabConfigs: TabConfigType[] = [
    {
        name: 'folders',
        Component: TabFolders,
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
    const [activeTabName, setActiveTabName] = useState<TabNameType>('folders');
    const activeTabConfig = useMemo(() => {
        return tabConfigs.find((tabConfig) => tabConfig.name === activeTabName)!;
    }, [activeTabName]);

    return (
        <div className="flex">
            <Sidebar tabConfigs={tabConfigs} activeTabName={activeTabName} setActiveTabName={setActiveTabName} />
            <Container className="py-5">
                <activeTabConfig.Component />
                {/*<h1 className="text-3xl font-bold">Криптовалюти</h1>*/}
                {/*<Client coins={coins} />*/}
            </Container>
        </div>
    );
}

export default Client;
