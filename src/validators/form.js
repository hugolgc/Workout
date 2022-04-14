export const formValidator = {
  input(name) {
    return name.length && name.length < 32
  }
}