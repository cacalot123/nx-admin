import request from '@/utils/request'

export function roleEdit({id, name, permissions, status}) {
  return request({
    url: '/role/edit', method: 'post', data: {
      id,
      name,
      permissions,
      status
    }
  })
}

export function roleDel({id, name}) {
  return request({
    url: '/role/edit', method: 'post', data: {
      id,
      name,
      status: 0
    }
  })
}

export function roleList({name} = {}) {
  return request({
    url: '/role/list', method: 'post', data: {
      name
    }
  })
}
