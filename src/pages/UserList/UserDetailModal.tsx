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
  ProDescriptions
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, message, Popconfirm,Modal } from 'antd';
import React, { useRef, useState } from 'react';


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

const TableList: React.FC<{onClose:() => void}> = ({onClose}) => {
  const actionRef = useRef<ActionType>();

  // 列表配置项
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "日期",
      dataIndex: 'num',
      // tip: 'The rule name is the unique key',
    },
    {
      title: "赛事名称",
      dataIndex: 'name',
    },
    {
      title: "组别",
      dataIndex: 'sex',
    },
    {
      title: "成绩",
      dataIndex: 'smallName',
    },
    {
      title: "积分",
      dataIndex: 'school',
    },
    {
      title: "实力榜",
      dataIndex: 'group',
    },
    
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm  key="clear" title="确认清空" onConfirm={() => {handleRemove(record)}}>
            <Button type="link" danger>删除</Button>
        </Popconfirm>,
      ],
    },
  ];
  // 用户信息展示项， key对应的是接口参数名
  const userInfoFields = [
      {label:"用户编号", key:'num1', value: "12345678"},
      {label:"姓名", key:'num2', value: "-"},
      {label:"昵称", key:'num3', value: "-"},
      {label:"证件类型", key:'num4', value: "-"},
      {label:"手机号", key:'num5', value: "-"},
      {label:"证件号", key:'num6', value: "-"},
      {label:"状态", key:'num7', value: "-"},
      {label:"性别", key:'num8', value: "-"},
      {label:"所属院校", key:'num9', value: "-"},
      {label:"参赛场次", key:'num10', value: "-"},
      {label:"实力分", key:'num11', value: "-"},
      {label:"积分", key:'num12', value: "-"},
  ]

  return (
      <Modal title="个人信息" footer={null} onCancel={onClose} open={true}  width={900} height={"90vh"} >
        <PageContainer  style={{padding:0}}>
            <>
        <ProDescriptions
            column={2}
            // title="个人信息"
            // tooltip="包含了从服务器请求，columns等功能"
        >
            {userInfoFields.map((t, _index) =>  
                <ProDescriptions.Item
                    key={t.key}
                    label={t.label}
                    valueType="text"
                    >
                        {t.value}
                    </ProDescriptions.Item>
                )}
        </ProDescriptions>
        </>
        <ProTable<API.RuleListItem, API.PageParams>
            // headerTitle={"用户列表"}
            actionRef={actionRef}
            rowKey="key"
            search={false}
            toolbar={{
            settings: []
            }}
            pagination={{ pageSize: 10}}
            request={rule}
            columns={columns}
            style={{padding:0}}
        />
        </PageContainer>
    </Modal>
  );
};

export default TableList;
