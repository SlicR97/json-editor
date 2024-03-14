import './directory-tree.component.scss'

import { Directory, FileEntry } from '../types/directory.type'
import { Collapse } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { FileContext } from '../context/file.context'

type Props = {
  directory: Directory
}

const RenderDirectoryTree = (
  directory: Directory,
  activeFile: FileEntry | null,
  setActiveFile: (fileEntry: FileEntry) => void,
) => {
  const [open, setOpen] = useState(true)

  const _setActiveFile = (file: FileEntry) => {
    setActiveFile(file)
    console.log(file)
  }

  return (
    <>
      <div
        className="text-primary text-start directory"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faFolder} className="me-2" />
        {directory.name}
      </div>

      <Collapse in={open} timeout={0}>
        <ul>
          {directory.directories.map((entry, index) => (
            <li key={index}>
              {RenderDirectoryTree(entry, activeFile, setActiveFile)}
            </li>
          ))}

          {directory.files.map((entry, index) => (
            <li
              className={classNames('file', { active: entry === activeFile })}
              key={index}
              onClick={() => _setActiveFile(entry)}
            >
              <FontAwesomeIcon icon={faFile} className="me-2" />
              {entry.name}
            </li>
          ))}
        </ul>
      </Collapse>
    </>
  )
}

const DirectoryTree = ({ directory }: Props) => {
  const fileContext = useContext(FileContext)

  if (!fileContext) return <></>

  return (
    <div className="mt-3">
      {RenderDirectoryTree(
        directory,
        fileContext.selectedFile,
        fileContext.setSelectedFile,
      )}
    </div>
  )
}

export default DirectoryTree
