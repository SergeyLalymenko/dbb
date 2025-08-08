import { Dropbox, files } from 'dropbox';

export type DropboxEntryType =
    | files.FileMetadataReference
    | files.FolderMetadataReference
    | files.DeletedMetadataReference;

export async function fetchEntries(dropbox: Dropbox, path: string): Promise<DropboxEntryType[]> {
    try {
        const res = await dropbox.filesListFolder({ path, include_deleted: true });
        return res.result.entries;
    } catch {
        return [];
    }
}

export async function downloadFile(
    dropbox: Dropbox,
    path: string
): Promise<{ fileBlob: Blob; fileName: string } | null> {
    try {
        const res = await dropbox.filesDownload({ path });
        const fileBlob = (res.result as any).fileBlob as Blob;
        return {
            fileBlob,
            fileName: res.result.name,
        };
    } catch {
        return null;
    }
}

export async function restoreFile(dropbox: Dropbox, path: string): Promise<boolean> {
    try {
        const revisions = await dropbox.filesListRevisions({
            path,
            limit: 1,
        });
        if (!revisions.result.entries.length) return false;

        const latestRevision = revisions.result.entries[0].rev;
        await dropbox.filesRestore({
            path,
            rev: latestRevision,
        });
        return true;
    } catch {
        return false;
    }
}

export async function deleteFile(dropbox: Dropbox, path: string): Promise<boolean> {
    try {
        await dropbox.filesDeleteV2({ path });
        return true;
    } catch {
        return false;
    }
}

export async function fetchEntry(dropbox: Dropbox, path: string) {
    try {
        const res = await dropbox.filesGetMetadata({ path, include_deleted: true });
        return res.result;
    } catch {
        return null;
    }
}
