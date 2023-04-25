declare global {
  interface Window {
    showDirectoryPicker: () => Promise<{ values: () => FileSystemHandle[] }>
  }
}

const Sidebar = () => {
  const pickDirectory = async () => {
    const directory = await window.showDirectoryPicker()
    for await (const entry of directory.values()) {
      console.log(entry)
    }
  }

  return (
    <div className="mx-1">
      <div className="my-1 text-center">
        <h4>JSON Editor</h4>
      </div>

      <button className="btn btn-primary" onClick={pickDirectory}>
        PICK STUFF
      </button>
    </div>
  )
}

export default Sidebar
