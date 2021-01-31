const isEmpty = (arr) => {
  return !arr.length
}

const parseAvailability = (xmlPayload) => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(xmlPayload, 'text/xml')
  return dom.getElementsByTagName('INSTOCKVALUE')[0].childNodes[0].nodeValue
}

export default {
  isEmpty,
  parseAvailability,
}
