import request from '@/utils/request'

export function channelList({limit, page}) {
  return request({
    url: '/channel/list', method: 'post',
    data: {
      size: limit,
      page: page
    }
  })
}

export function channelEdit({id, name}) {
  return request({
    url: '/channel/edit', method: 'post',
    data: {
      id,
      name
    }
  })
}

