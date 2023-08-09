import request from '@/utils/request'

// 登录
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 我是谁
export function getInfo(token) {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

// 更新管理员信息
export function setInfo(data){
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
