export const formValidator = {
  text(name) {
    return name.length && name.length < 32
  },
  number(value) {
    const number = parseFloat(value)
    return number && number > 0
  }
}