import request from '@/utils/request'

// 分页获取文章
export function findBlog(page=1,limit=10){
    // page页码数
    // limit每页显示的数量
    return request({
        url:"/api/blog",
        method:"get",
        params:{
            page,
            limit
        }
    })
}

// 删除文章
export function deleteOneBlog(id){
    return request({
        url:`/api/blog/${id}`,
        method:"delete",
    })
}

// 添加文章
export function addBlog(data){
    return request({
        url:"/api/blog",
        method:"post",
        data
    })
}

// 编辑文章
export function editBlog(blogInfo){
    return request({
        url:`/api/blog/${blogInfo.id}`,
        method:"put",
        data:blogInfo.data
    })
}

// 根据id查找某一篇文章
export function findOneBlog(id){
    return request({
        url:`/api/blog/${id}`,
        method:"get"
    })
}