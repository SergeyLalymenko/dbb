import { useState } from 'react';
import { DropboxEntryType } from '@/services/dropboxService';
import { IoFolderSharp } from 'react-icons/io5';
import { FaFileAlt } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import mergeClasses from '@/utils/mergeClasses';
import { rootPathConfig, PathConfigType } from './TabEntries';
import { downloadFile, restoreFile, deleteFile } from '@/services/dropboxService';
import { useDropboxStore } from '@/store/dropbox';
import IconButton from '@/UI/IconButton';
import { MdOutlineSettingsBackupRestore, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

type PropsType = {
    entry: DropboxEntryType;
    isFirst: boolean;
    setPathConfig: (pathConfig: PathConfigType) => void;
    fetchEntry: (path: string) => void;
};

function EntryRow({ entry, isFirst, setPathConfig, fetchEntry }: PropsType) {
    const { dropbox } = useDropboxStore();
    const [isLoading, setIsLoading] = useState(false);

    function getEntryIcon() {
        switch (entry['.tag']) {
            case 'folder':
                return <IoFolderSharp className="text-2xl text-blue-700 shrink-0" />;
            case 'file':
                return <FaFileAlt className="text-2xl text-blue-700 shrink-0" />;
            case 'deleted':
                return <TiDeleteOutline className="text-2xl text-blue-700 shrink-0" />;
        }
    }

    function getEntryName() {
        switch (entry['.tag']) {
            case 'folder':
                return (
                    <p
                        className="ml-4 mr-2 transition-all duration-200 hover:opacity-70 cursor-pointer"
                        onClick={moveToFolder}
                    >
                        {entry.name}
                    </p>
                );
            case 'file':
                return (
                    <p
                        className="ml-4 mr-2 transition-all duration-200 hover:opacity-70 cursor-pointer"
                        onClick={openFile}
                    >
                        {entry.name}
                    </p>
                );
            case 'deleted':
                return <p className="ml-4 mr-2 opacity-70">{entry.name}</p>;
        }
    }

    function moveToFolder() {
        if (!entry.path_lower || !entry.path_display) return;

        setPathConfig({
            pathLower: `${rootPathConfig.pathLower}${entry.path_lower}`,
            pathDisplay: `${rootPathConfig.pathDisplay}${entry.path_display}`,
        });
    }

    async function openFile() {
        if (!dropbox || !entry.path_lower) return;
        setIsLoading(true);
        const res = await downloadFile(dropbox, entry.path_lower);
        if (!res) {
            setIsLoading(false);
            return;
        }

        const { fileBlob, fileName } = res;
        const mimeType = fileBlob.type;

        if (mimeType.startsWith('image/') || mimeType === 'application/pdf') {
            const url = URL.createObjectURL(fileBlob);
            window.open(url, '_blank');
        } else {
            const url = URL.createObjectURL(fileBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        }
        setIsLoading(false);
    }

    function getEntryActions() {
        switch (entry['.tag']) {
            case 'folder':
                return (
                    <>
                        <IconButton className="gap-1 font-semibold" size="sm" variant="delete" onClick={onDeleteFile}>
                            <p>Delete</p>
                            <MdDelete />
                        </IconButton>
                    </>
                );
            case 'file':
                return (
                    <>
                        <IconButton className="gap-1 font-semibold" size="sm" variant="delete" onClick={onDeleteFile}>
                            <p>Delete</p>
                            <MdDelete />
                        </IconButton>
                    </>
                );
            case 'deleted':
                const isFile = entry.name.includes('.');
                return (
                    <>
                        {isFile && (
                            <IconButton
                                className="gap-1 font-semibold"
                                size="sm"
                                variant="success"
                                onClick={onRestoreFile}
                            >
                                <p>Restore</p>
                                <MdOutlineSettingsBackupRestore />
                            </IconButton>
                        )}
                    </>
                );
        }
    }

    async function onDeleteFile() {
        if (!dropbox || !entry.path_lower) return;
        setIsLoading(true);
        const isSuccess = await deleteFile(dropbox, entry.path_lower);
        if (!isSuccess) {
            toast('Delete file error');
            setIsLoading(false);
            return;
        }
        await fetchEntry(entry.path_lower);
        setIsLoading(false);
    }

    async function onRestoreFile() {
        if (!dropbox || !entry.path_lower) return;
        setIsLoading(true);
        const isSuccess = await restoreFile(dropbox, entry.path_lower);
        if (!isSuccess) {
            toast('Restore file error');
            setIsLoading(false);
            return;
        }
        await fetchEntry(entry.path_lower);
        setIsLoading(false);
    }

    return (
        <div
            className={mergeClasses(
                'flex items-center border-b border-solid border-zinc-500 py-2',
                isFirst && 'border-y',
                isLoading && 'pointer-events-none opacity-70'
            )}
        >
            {getEntryIcon()}
            {getEntryName()}
            <div className="flex items-center gap-2 ml-auto">{getEntryActions()}</div>
        </div>
    );
}

export default EntryRow;
