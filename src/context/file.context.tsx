import { FileEntry } from '../types/directory.type'
import React, { useState } from 'react'

export type FileContextType = {
  selectedFile: FileEntry | null
  setSelectedFile: (file: FileEntry) => void
}

export const FileContext = React.createContext<FileContextType | null>(null)

export const FileProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null)

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </FileContext.Provider>
  )
}
