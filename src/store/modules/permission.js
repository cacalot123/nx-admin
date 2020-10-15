import {constantRouterMap} from '@/router'

function convertKeyValue(permissions = []) {
  const keyValue = {};
  permissions.map((v) => {
    Object.assign(keyValue, {
      [v.match]: {
        parent_id: v.parent_id,
        id: v.id
      }
    })
  })
  return keyValue;
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    // console.log('roles[route.name]', roles[route.name])
    return roles[route.name]
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // console.log('roles', roles)
    // console.log('route', route)
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, {asyncRouterList, permissions}) {
      return new Promise((resolve) => {
        // loop(asyncRouterList, convertKeyValue(permissions))
        // const permissionsTree = listToTree(resRouter, null, 0);
        const permissionsTree = filterAsyncRouter(asyncRouterList, convertKeyValue(permissions))
        commit('SET_ROUTERS', permissionsTree)
        resolve(permissionsTree)
      })
    }
  }
}

export default permission
