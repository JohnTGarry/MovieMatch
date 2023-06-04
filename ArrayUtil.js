export const getCommonElements = (array1, array2) => {
  const commonArray = []
  array1.forEach((element) => {
    if (array2.indexOf(element) !== -1) {
      commonArray.push(element)
    }
  })

  return commonArray
}

export const getCommonElementsAsObjects = (array1, array2) => {
  const arrayKeys1 = objectArrayToArrayOfValues(array1)
  const arrayKeys2 = objectArrayToArrayOfValues(array2)
  const commonKeys = getCommonElements(arrayKeys1, arrayKeys2)

  let commonArray = []
  commonArray = concatObjectsWithKeys(commonKeys, array1, commonArray)
  commonArray = concatObjectsWithKeys(commonKeys, array2, commonArray)

  return commonArray
}

export const concatObjectsWithKeys = (keys, objectArray, objectsWithKeys) => {
  objectArray.forEach((element) => {
    if (keys.indexOf(element.key) !== -1) {
      if (
        objectArrayToArrayOfValues(objectsWithKeys).indexOf(element.key) === -1
      ) {
        objectsWithKeys.push(element)
      }
    }
  })

  return objectsWithKeys
}

export const stringToArray = (str) => {
  return str.split(', ')
}

export const arrayToArrayOfActorObjects = (array, images) => {
  const arrayOfObjects = []
  let i = 0
  array.forEach((element) => {
    arrayOfObjects.push({
      key: element,
      imagePath: images[i],
    })
    i++
  })

  return arrayOfObjects
}

export const arrayToArrayOfMovieObjects = (array) => {
  const arrayOfObjects = []
  array.forEach((element) => {
    arrayOfObjects.push({
      key: element,
    })
  })

  return arrayOfObjects
}

export const objectArrayToArrayOfValues = (array) => {
  const arrayOfValues = []
  array.forEach((element) => {
    arrayOfValues.push(element.key)
  })

  return arrayOfValues
}

export const getYearFromDate = (date) => {
  if (!date) return ''

  const dateMonthYearArray = date.split('-')

  return dateMonthYearArray[0]
}
