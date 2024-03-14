import React from 'react'
import { Directory, DirectoryEntry } from '../types/directory.type'
import DirectoryTree from './directory-tree.component'

declare global {
  interface Window {
    showDirectoryPicker: () => Promise<DirectoryEntry>
  }
}

const Sidebar = () => {
  const [directory, setDirectory] = React.useState<Directory | null>(null)

  const pickDirectory = async () => {
    const directory = await window.showDirectoryPicker()
    const directoryTree = await Directory.buildDirectoryTree(directory)
    setDirectory(directoryTree)

    for (const file of directoryTree.files) {
      const content = await file.getFile().then((file) => file.text())
      console.log(content)
    }
  }

  return (
    <div className="mx-3">
      <div className="my-1 mt-4 text-center">
        <h4>JSON Editor</h4>
      </div>

      {!directory && (
        <>
          <div className="text-primary text-center mb-2">
            <p className="fs-6">You have not yet opened a folder.</p>
          </div>

          <div className="text-center">
            <button className="btn btn-secondary w-100" onClick={pickDirectory}>
              Open Folder
            </button>
          </div>
        </>
      )}

      {directory && (
        <>
          <div className="text-center">
            <button className="btn btn-secondary w-100" onClick={pickDirectory}>
              Open Another Folder
            </button>
          </div>

          <DirectoryTree directory={directory} />
        </>
      )}
    </div>
  )
}

export default Sidebar
