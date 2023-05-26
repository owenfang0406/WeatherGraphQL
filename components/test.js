function findFirstAppearanceIndex(mainString, searchString) {
  for (let i = 0; i < mainString.length; i++) {
    if (mainString[i] === searchString[0]) {
      let match = true

      for (let j = 0; j < searchString.length; j++) {
        if (
          mainString[i + j] !== searchString[j] ||
          i + j >= mainString.length ||
          mainString[i + j] === "\0"
        ) {
          match = false
          break
        }
      }

      if (match) {
        return i
      }
    }
  }

  return -1
}

const mainString = "It's aa pencil.\0"
const searchString = "a pen"
const index = findFirstAppearanceIndex(mainString, searchString)
console.log(index)
