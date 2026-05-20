export const refreshPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

export const haptic = () => {
  if (navigator.vibrate) {
    navigator.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000])
  } else {
    const element = document.createElement('div')
    const id = Math.random().toString(36).slice(2)
    element.innerHTML =
      `<input type="checkbox" id="` +
      id +
      `" switch /><label for="` +
      id +
      `"></label>`
    element.setAttribute(
      'style',
      'display:none !important;opacity:0 !important;visibility:hidden !important;',
    )
    document.querySelector('body')?.appendChild(element)
    element.querySelector('label')?.click()
    setTimeout(function () {
      element.remove()
    }, 1500)
  }
}

export function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}
