interface DownloadFileProps {
  data: any
  filename: string
  mime: any
  bom: any
}

const downloadFile = ({data, filename, mime, bom}: DownloadFileProps) => {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, {type: mime || 'application/octet-stream'})

  const blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)

  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }

  document.body.appendChild(tempLink)
  tempLink.click()

  // Fixes "webkit blob resource error 1"
  setTimeout(() => {
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }, 200)
}

export {downloadFile}
