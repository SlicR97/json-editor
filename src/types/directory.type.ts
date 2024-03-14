export type File = {
  text: () => Promise<string>
}

export type DirectoryEntry = {
  kind: 'directory'
  name: string
  values: () => (FileEntry | DirectoryEntry)[]
}

export type FileEntry = {
  kind: 'file'
  name: string
  getFile: () => Promise<File>
}

export namespace FileEntry {
  export const create = (entry: FileEntry): FileEntry => ({
    kind: 'file',
    name: entry.name,
    getFile: entry.getFile.bind(entry),
  })
}

export type Directory = {
  directories: Directory[]
  files: FileEntry[]
  name: string
}

export namespace Directory {
  export const buildDirectoryTree = async (
    directory: DirectoryEntry,
  ): Promise<Directory> => {
    const tree: Directory = {
      directories: [],
      files: [],
      name: directory.name,
    }

    for await (const entry of directory.values()) {
      if (entry.kind === 'directory') {
        tree.directories.push(await buildDirectoryTree(entry))
      } else {
        tree.files.push(FileEntry.create(entry))
      }
    }

    return tree
  }
}
