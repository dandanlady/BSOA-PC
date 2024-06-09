/* eslint-disable @typescript-eslint/no-unused-vars */
import { addRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined , InboxOutlined} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Card, List, Button, message } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 新增
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
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

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

const TableList: React.FC = () => {
  // 批量上传窗口的弹窗
  // const [uploadModalOpen, handleUploadModalOpen] = useState<boolean>(false);
 // 新增/编辑窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<{show:boolean, type?:"add"| "edit"| null}>({show:false});

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  


  return (
    <PageContainer>
       <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
       />
      <ModalForm
        title={createModalOpen.type === "edit"? "编辑院校":"新增院校"}
        width="400px"
        key={createModalOpen.type}
        open={createModalOpen.show}
        initialValues={createModalOpen.type === "edit"?currentRow:{}}
        onOpenChange={() => {handleModalOpen({show:false});setCurrentRow({}) }}
        onFinish={async (value) => {
          const success = createModalOpen.type === "add" ? await handleAdd(value as API.RuleListItem) : await handleUpdate({...currentRow, ...value});
          if (success) {
            handleModalOpen({show:false});
            if (actionRef.current) {
              actionRef.current.reload();
            }
            
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: "请输入",
            },
          ]}
          width="md"
          name="name"
          label="院校名称"
        />
        <ProFormText width="md" 
          rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
            name="count" 
            label="领队"
          />
      </ModalForm>
     
    </PageContainer>
  );
};

export default TableList;
