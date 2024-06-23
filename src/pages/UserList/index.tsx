/* eslint-disable @typescript-eslint/no-unused-vars */
import { addRule, removeRule, rule, updateRule } from '@/services/pc/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import UserDetailModal from './UserDetailModal';

/**
 * 新增
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请稍后再试');
    return false;
  }
};

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('更新中');
  try {
    await updateRule(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，稍后重视');
    return false;
  }
};

/**
 * 删除
 * @param selectedRows
 */
const handleRemove = async (selectedRow: API.RuleListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    await removeRule({
      key: selectedRow.key
    });
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    message.error('操作失败，请稍后再试');
    return false;
  }
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 当前查看用户数据，有数据则展示用户弹窗，没有则不展示
  const [currentRow, setCurrentRow] = useState<API.RuleListItem|null>();
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "用户编号",
      dataIndex: 'num',
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "用户姓名",
      dataIndex: 'name',
    },
    {
      title: "性别",
      dataIndex: 'sex',
      hideInSearch:true,
    },
    {
      title: "昵称",
      dataIndex: 'smallName',
      hideInSearch:true,
    },
    {
      title: "所属院校",
      dataIndex: 'school',
    },
    {
      title: "参赛场次",
      dataIndex: 'group',
      hideInSearch:true,
    },
    {
      title: "实力分",
      dataIndex: 'count',
      hideInSearch:true,
    },
    {
      title: "积分",
      dataIndex: 'count2',
      hideInSearch:true,
    },
    {
      title: "注册时间",
      dataIndex: 'count2',
      valueType:"dateRange"
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
        toolBarRender={() => [
          <Button
          type="default"
          key="primary"
          onClick={() => {
            // handleModalOpen(true);
          }}
        >
         导出
        </Button>,
        ]}
        request={rule}
        columns={columns}
      />
      {!!currentRow?.name && <UserDetailModal onClose={() => setCurrentRow(null)} />}
    </PageContainer>
  );
};

export default TableList;
