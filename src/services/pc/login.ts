// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    userName?: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/admin/login', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
