/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import { getLogin } from '@/services/pc/login';
import { useState } from 'react';
import { AnyNode } from 'postcss';
const Page = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        // logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="BSOA"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="翻山越岭  遇见更好的自己！"
        onFinish={async (params:any) => {
          // 创建FormData实例
          const formData = new FormData();
          formData.append('userName', params.username); // 添加表单字段
          formData.append('password', params.password); // 添加表单字段
          const res:any = await getLogin(params);
          console.log('login res', params , res);
          if(res){
            localStorage.setItem("token", res?.data?.token)
            history.go(-1)
          }   
        }}
        // activityConfig={{
        //   style: {
        //     boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: 'rgba(255,255,255,0.25)',
        //     backdropFilter: 'blur(4px)',
        //   },
          // title: '活动标题，可配置图片',
          // subTitle: '活动介绍说明文字',
          // action: (
          //   <Button
          //     size="large"
          //     style={{
          //       borderRadius: 20,
          //       background: token.colorBgElevated,
          //       color: token.colorPrimary,
          //       width: 120,
          //     }}
          //   >
          //     去看看
          //   </Button>
          // ),
        // }}
        // actions={
        //   <div
        //     style={{
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       flexDirection: 'column',
        //     }}
        //   >
        //   </div>
        // }
      >
      
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        
        
        {/* <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div> */}
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};