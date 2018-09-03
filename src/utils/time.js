// 时间处理方法
// 小于10 前面加0
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

// 格式化时间
function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export {
  formatTime
}
