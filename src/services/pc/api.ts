// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取赛事列表 */
export async function getMatchList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
   /** 其他参数 */
  [key: string]: any;
},
options?: { [key: string]: any }) {
  const res = await request<any>('/admin/competition/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  return {
    total:res.data.total,
    data:res.data.list
  };
}


/** 新建/编辑赛事 /api/rule */
export async function saveOrUpdateMatch(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/admin/competition/saveOrUpdate', {
    method: 'POST',
    data:{
      ...(options || {}),
    }
  });
}

/** 删除辑赛事 */
export async function deleteMatch(id:any) {
  return request<API.RuleListItem>('/admin/competition/delete', {
    method: 'POST',
    data:{
    id
    }
  });
}

/** 获取组别列表 */
export async function getGroupList(params: {
  // query
  /** 组别id */
  competitionId?: any;
   /** 其他参数 */
  [key: string]: any;
},
options?: { [key: string]: any }) {
  const res = await request<any>('/admin/competition/group/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  console.log('res', res)
  return {
    total:res.data?.length,
    data:res.data
  };
}


/** 新建/编辑赛事 /api/rule */
export async function saveOrUpdateGroup(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/admin/competition/group/saveOrUpdate', {
    method: 'POST',
    data:{
      ...(options || {}),
    }
  });
}

/** 删除辑赛事 */
export async function deleteGroup(groupId:any) {
  return request<any>('/admin/competition/group/delete', {
    method: 'POST',
    data:{
      groupId
    }
  });
}

/** 获取成绩列表 */
export async function getGradeList(params: {
  // query
  /** 组别id */
  groupid?: any;
   /** 其他参数 */
  [key: string]: any;
},
options?: { [key: string]: any }) {
  const res = await request<any>('/admin/competition/group/record/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  console.log('res', res)
  return {
    total:res.data?.total,
    data:res.data?.list
  };
}




/** 删除辑赛事 */
export async function deleteGrade(data:{scoreId:any, groupId:any, clearAll: boolean}) {
  return request<any>('/admin/competition/group/record/delete', {
    method: 'POST',
    data
  });
}


/** 获取成绩列表 */
export async function getUserList(params: any,options?: { [key: string]: any }) {
  const res = await request<any>('/admin/user/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  console.log('res', res)
  return {
    total:res.data?.total,
    data:res.data?.list
  };
}


/** 获取学校列表 */
export async function getSchoolList(params: any,options?: { [key: string]: any }) {
  const res = await request<any>('/admin/college/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  console.log('res', res)
  return {
    total:res.data?.total,
    data:res.data?.list
  };
}


/** 新建/编辑院校 /api/rule */
export async function saveOrUpdateSchool(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/admin/college/saveOrUpdate', {
    method: 'POST',
    data:{
      ...(options || {}),
    }
  });
}

/** 删除辑赛事 */
export async function deleteSchool(id:any) {
  return request<any>(`/admin/college/delete/${id}`, {
    method: 'POST',
  });
}



/** 获取学校列表 */
export async function getBannerList(params: any,options?: { [key: string]: any }) {
  const res = await request<any>('/admin/banner/list', {
    method: 'GET',
    params: {
      ...params,
      pageNo:params.current
    },
    ...(options || {}),
  });
  console.log('res', res)
  return {
    total:res.data?.total,
    data:res.data?.list
  };
}


/** 删除辑赛事 */
export async function deleteBanner(id:any) {
  return request<any>(`/admin/banner/delete/${id}`, {
    method: 'POST'
  });
}


/** 新建/编辑院校 */
export async function saveOrUpdateBanner(data: any ) {
  return request<any>('/admin/banner/saveOrUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
  });
}






/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}
