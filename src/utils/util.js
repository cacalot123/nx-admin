/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 设置浏览器头部标题
 */
export const setTitle = (title) => {
  const tit = title ? `${title}-` : '';
  const system = 'XXXX运营后台';
  window.document.title = `${tit}${system}`
  localStorage.setItem('title', system)
}

