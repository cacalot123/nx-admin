export const setAmount = (val) => {
  const amount = (val / 100).toLocaleString('zh', {minimumFractionDigits: 2});
  return `￥${amount}`
}
