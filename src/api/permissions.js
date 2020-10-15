import request from '@/utils/request'

export function permissionsList() {
  return request({
    url: '/permissions/list', method: 'post'
  })
}
