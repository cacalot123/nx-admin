import request from '@/utils/request'

export function status() {
  return request({
    url: '/other/status', method: 'post', data: {}
  })
}
