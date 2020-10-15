export const download = (resList, name) => {
  const blobUrl = URL.createObjectURL(new Blob([resList], {
    // 后台传递的文件类型 - 此处我是直接从后台获取的
    // 也可以根据文件类型添加
    type: 'application/octet-stream'
  }));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl;
  link.setAttribute('download', `${name}.csv`)
  document.body.appendChild(link)
  link.click();
  document.body.removeChild(link);
}
