import request from '@/utils/request'

export function loginPwd({name, password}) {
  return request({
    url: '/user/login', method: 'post', data: {
      login_name: name,
      pwd: password
    }
  })
}

export function userInfo({id} = {}) {
  return request({
    url: '/user/info', method: 'post',
    data: {
      id
    }
  })
}

export function changePwd({oldPwd, newPwd}) {
  return request({
    url: '/user/change/pwd', method: 'post', data: {
      old_pwd: oldPwd,
      new_pwd: newPwd
    }
  })
}

export function userList({name, type, limit, page}) {
  return request({
    url: '/user/list', method: 'post',
    data: {
      display_name: name,
      type,
      limit,
      page
    }
  })
}

export function userEdit({id, loginName, mobile, displayName, type, typeId, roleId, status, visibleUserIds}) {
  return request({
    url: '/user/edit', method: 'post',
    data: {
      id,
      login_name: loginName,
      mobile,
      display_name: displayName,
      type,
      type_id: typeId,
      role_id: roleId,
      status,
      visible_user_ids: visibleUserIds
    }
  })
}

export function resetPwd({userId, pwd}) {
  return request({
    url: '/user/reset/pwd', method: 'post',
    data: {
      user_id: userId,
      pwd
    }
  })
}

