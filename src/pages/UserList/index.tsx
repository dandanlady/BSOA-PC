/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserList } from '@/services/pc/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import UserDetailModal from './UserDetailModal';
import { jsonToQueryString } from '../../utils/helper'
import { baseURL } from '../../../config/const';



const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前查看用户数据，有数据则展示用户弹窗，没有则不展示
  const [currentRow, setCurrentRow] = useState<any>();
  // 请求参数
  const [searchParams, setSearchParams] = useState<any>();
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "用户编号",
      dataIndex: 'num',
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "用户姓名",
      dataIndex: 'realName',
    },
    {
      title: "性别",
      dataIndex: 'gender',
      hideInSearch:true,
      valueEnum:{
        1: {
          text: "男",
        },
        2: {
          text: "女",
        },
      }
    },
    {
      title: "昵称",
      dataIndex: 'nickName',
      hideInSearch:true,
    },
    {
      title: "所属院校",
      dataIndex: 'collegeName',
    },
    {
      title: "参赛场次",
      dataIndex: 'competitionNum',
      hideInSearch:true,
    },
    {
      title: "实力分",
      dataIndex: 'strengthScore',
      hideInSearch:true,
    },
    {
      title: "积分",
      dataIndex: 'tally1y',
      hideInSearch:true,
    },
    {
      title: "注册时间",
      dataIndex: 'createAt',
      valueType:"date"
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        '':{
          text: "全部",
          status: 'Default',
        },
        0: {
          text: "未认证",
          status: 'Warning',
        },
        1: {
          text: "已认证",
          status: 'Success',
        },
      },
    }, 
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          查看
        </a>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"用户列表"}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          settings: []
        }}
        toolBarRender={(...b) => [
          <Button
          type="default"
          key="primary"
          onClick={(a:any) => {
            // handleModalOpen(true);
            const {current,pageSize, ...params} = searchParams
            console.log('1111', a,b,actionRef.current, searchParams)
            window.open(baseURL+ '/admin/user/export?'+ jsonToQueryString(params))
          }}
        >
         导出
        </Button>,
        ]}
        request={(params) => { setSearchParams(params); return getUserList(params)}}
        columns={columns}
      />
      {!!currentRow?.id && <UserDetailModal onClose={() => setCurrentRow(null)} data={currentRow} />}
    </PageContainer>
  );
};

export default TableList;
