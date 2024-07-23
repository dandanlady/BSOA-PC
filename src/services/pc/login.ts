// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录  */
export async function getLogin(
  data:any
) {
  return request<API.FakeCaptcha>('/admin/user/login', {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
