'use client';

import { TabConfigType, TabNameType } from './Client';
import IconButton from '@/UI/IconButton';
import toast from 'react-hot-toast';

type PropsType = {
    tabConfigs: TabConfigType[];
    activeTabName: TabNameType;
    setActiveTabName: (tabName: TabNameType) => void;
};

function Sidebar({ tabConfigs, activeTabName, setActiveTabName }: PropsType) {
    function onIconButtonClick(tabConfig: TabConfigType) {
        if (tabConfig.disabled) {
            toast('Not implemented');
            return;
        }
        setActiveTabName(tabConfig.name);
    }

    return (
        <div className="sticky top-0 flex flex-col max-h-[100vh] min-h-[100vh] bg-zinc-600 h-full gap-4 py-4 px-4 overflow-y-auto shrink-0">
            {tabConfigs.map((tabConfig) => (
                <IconButton
                    key={tabConfig.name}
                    active={tabConfig.name === activeTabName}
                    disabled={tabConfig.disabled}
                    onClick={() => onIconButtonClick(tabConfig)}
                >
                    <tabConfig.IconComponent />
                </IconButton>
            ))}
        </div>
    );
}

export default Sidebar;
