import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormDigit,
  ProFormUploadDragger,
  ProFormDateTimeRangePicker,
  ProTable,
  ProFormTextArea
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import GradeList from './components/GradeList'

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

/**
 * 删除
 * @param selectedRow
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
  // 新增/编辑窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<{show:boolean, type?:"add"| "edit"| null}>({show:false});
  const actionRef = useRef<ActionType>();
  // 当前操作项
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  // 上传成绩弹窗
  const [uploadGradesRow, setUploadGradesRow] = useState<any>(null);
  //  成绩管理弹窗
  const [gradesManageRow, setGradesManageRow] = useState<any>(null);
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "组别编号",
      dataIndex: 'num',
      hideInForm:true,
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "组别名",
      dataIndex: 'name',
      hideInForm:true,
    },
    {
      title: "积分",
      dataIndex: 'group',
      hideInForm:true,
    },
    {
      title: "距离",
      dataIndex: 'discount',
      hideInForm:true,
    },
    {
      title: "组别描述",
      dataIndex: 'desc',
      hideInForm:true,
    },
    {
      title: "参赛人数",
      dataIndex: 'count',
      hideInForm:true,
    },
    {
      title: "比赛时间",
      dataIndex: 'time',
      hideInForm:true,
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm:true,
      valueEnum: {
        0: {
          text: "待上传",
          status: 'Default',
        },
        1: {
          text: "已上传",
          status: 'success',
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
            // handleUpdateModalOpen(true);
            setCurrentRow(record);
            handleModalOpen({show:true,type:"edit"});
          }}
        >
          编辑
        </a>,
        <Popconfirm key="delete" title="确认删除" onConfirm={()=>{handleRemove(record)}}>
           <a key="subscribeAlert" style={{color:"red"}} >
            删除
          </a>
        </Popconfirm>, 
        <a key="config" onClick={() => setUploadGradesRow(record)}>上传成绩</a>,
        <a key="config" onClick={() => setGradesManageRow(record)}>管理</a>,
       
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"组别管理"}
        actionRef={actionRef}
        rowKey="key"
        search={false}
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
        title={ createModalOpen.type === "add" ? "新建组别" : "编辑组别"}
        width="500px"
        layout="horizontal"
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
        <ProFormText rules={[{required: true, message: "请输入"}]} width="md" name="name" label="组别名称" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="discount" label="距离(km)" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="d1" label="累计爬升" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="d2" label="累计下降" />
        <ProFormDateTimeRangePicker width="md" rules={[{required: true, message: "请输入"}]} name="time" label="赛事时间" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="d3" label="参赛人数" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="d4" label="补充点数" />
        <ProFormTextArea rules={[{required: true, message: "请输入"}]} width="md" name="d5" label="级别描述" />
      </ModalForm>
      {uploadGradesRow && <Modal title="上传成绩" open={!!uploadGradesRow} onCancel={() => setUploadGradesRow(null)} onClose={() => setUploadGradesRow(null)}>
        <p>{uploadGradesRow? uploadGradesRow.name : ""}</p>
        <ProFormUploadDragger accept="xlsx,xls" title="单击或拖拽文件到此区域上传成绩" name="file" description="仅支持xls、xlsx表格格式"/>
      </Modal>}
      {gradesManageRow && <Modal title="管理成绩" width={1000} open={!!gradesManageRow} onCancel={() => setGradesManageRow(null)} footer={null}><GradeList /></Modal>}
    </PageContainer>
  );
};

export default TableList;
