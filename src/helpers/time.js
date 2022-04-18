export const timeHelper = {
  secondesInMinutes(secondes) {
    const minutes = Math.floor(secondes / 60)
    return minutes ? `${ minutes }min ${ secondes - (minutes * 60) }s` : `${ secondes }s`
  }
}