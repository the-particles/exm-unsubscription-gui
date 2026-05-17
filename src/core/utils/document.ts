export const refreshPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}
