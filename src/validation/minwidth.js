const validateMinimumImageWidth = (file, width) => {
  const URL = window.URL || window.webkitURL
  return new Promise(resolve => {
    const image = new Image()
    image.onerror = () => resolve({ valid: false })
    image.onload = () => resolve({
      valid: image.width >= Number(width)
    })

    image.src = URL.createObjectURL(file)
  })
}

export default (files, width) => {
  const list = []
  for (let i = 0; i < files.length; i++) {
    // if file is not an image, reject.
    if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
      return false
    }

    list.push(files[i])
  }

  return Promise.all(list.map(file => validateMinimumImageWidth(file, width)))
}
