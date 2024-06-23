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
export async function deleteGroup(id:any) {
  return request<any>('/admin/competition/group/delete', {
    method: 'POST',
    data:{
    id
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
