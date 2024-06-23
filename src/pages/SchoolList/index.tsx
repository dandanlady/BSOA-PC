import { addRule, rule, updateRule } from '@/services/pc/api';
import { PlusOutlined , InboxOutlined} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Button, message, Upload, Modal } from 'antd';
import React, { useRef, useState } from 'react';
const { Dragger } = Upload;

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


const TableList: React.FC = () => {
  // 批量上传窗口的弹窗
  const [uploadModalOpen, handleUploadModalOpen] = useState<boolean>(false);
 // 新增/编辑窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<{show:boolean, type?:"add"| "edit"| null}>({show:false});

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "院校编号",
      dataIndex: 'num',
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "院校名称",
      dataIndex: 'name',
    },
    {
      title: "队员人数",
      dataIndex: 'group',
    },
    {
      title: "领队",
      dataIndex: 'count',
      hideInSearch:true,
    },
    
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // handleUpdateModalOpen(true);
            setCurrentRow(record);
            handleModalOpen({show:true,type:"edit"});
          }}
        >
          编辑
        </a>
      ],
    },
  ];

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount:1,
    accept: ".xlsx, .xls",
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"赛事列表"}
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
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen({show:true,type:"add"});
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
          <Button
            type="default"
            key="primary"
            onClick={() => {
              handleUploadModalOpen(true)
            }}
          >
          批量导入
          </Button>,
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
      {uploadModalOpen && <Modal title="上传院校" open={!!uploadModalOpen} onCancel={() => handleUploadModalOpen(false)}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
          仅支持xls、xlsx表格格式
          </p>
        </Dragger>
      </Modal>}
    </PageContainer>
  );
};

export default TableList;
