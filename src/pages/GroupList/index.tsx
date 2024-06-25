/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteGroup, getGroupList, saveOrUpdateGroup } from '@/services/pc/api';
import { PlusOutlined , InboxOutlined} from '@ant-design/icons';
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
import type { UploadProps } from 'antd';
import { Button, message, Popconfirm, Modal, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import GradeList from './components/GradeList'
const { Dragger } = Upload;

/**
 * 新增
 * @param fields
 */
const handleAddOrUpdate = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await saveOrUpdateGroup({ ...fields });
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};



/**
 * 删除
 * @param selectedRow
 */
const handleRemove = async (selectedRow: any) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    await deleteGroup(selectedRow.id);
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
  const [currentRow, setCurrentRow] = useState<any>();
  // 上传成绩弹窗
  const [uploadGradesRow, setUploadGradesRow] = useState<any>(null);
  //  成绩管理弹窗
  const [gradesManageRow, setGradesManageRow] = useState<any>(null);
  const [searchParams]= useSearchParams()
  const  competitionId = searchParams.get('id')
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "组别编号",
      dataIndex: 'groupCode',
      hideInForm:true,
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "组别名",
      dataIndex: 'groupName',
      hideInForm:true,
    },
    {
      title: "积分",
      dataIndex: 'racePoint',
      hideInForm:true,
    },
    {
      title: "距离",
      dataIndex: 'distance',
      hideInForm:true,
    },
    {
      title: "组别描述",
      dataIndex: 'groupDescribe',
      hideInForm:true,
    },
    {
      title: "参赛人数",
      dataIndex: 'participantsNum',
      hideInForm:true,
    },
    {
      title: "比赛时间",
      dataIndex: 'startTime',
      hideInForm:true,
    },
    {
      title: "状态",
      dataIndex: 'groupStatus',
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

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount:1,
    data: {groupId: uploadGradesRow?.id},
    accept: ".xlsx, .xls",
    action: 'http://47.102.137.240:8777/admin/competition/group/scoreImport',
    onChange(info) {
      console.log('2222 info', info)
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功.`);
        setUploadGradesRow(null)
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    
  };

  console.log('competitionId', competitionId)

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"组别管理"}
        actionRef={actionRef}
        rowKey="key"
        search={false}
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
            // handleModalOpen(true);
          }}
        >
         导出
        </Button>,
        ]}
        request={(params) => getGroupList({...params, competitionId})}
        columns={columns}
      />
      <ModalForm
        title={ createModalOpen.type === "add" ? "新建组别" : "编辑组别"}
        width="500px"
        layout="horizontal"
        key={createModalOpen.type}
        open={createModalOpen.show}
        initialValues={createModalOpen.type === "edit"?{...currentRow, time:[currentRow?.startTime, currentRow?.finishTime]}:{}}
        onOpenChange={() => {handleModalOpen({show:false});setCurrentRow({}) }}
        onFinish={async (value) => {
         const [startTime, finishTime] = value.time
         value = {...value, startTime, finishTime, competitionId}
         delete value.time;
          const success = await handleAddOrUpdate(createModalOpen.type === "add" ?value: {...currentRow, ...value});
          if (success) {
            handleModalOpen({show:false});
            if (actionRef.current) {
              actionRef.current.reload();
            }
            
          }
        }}
      >
        <ProFormText rules={[{required: true, message: "请输入"}]} width="md" name="groupName" label="组别名称" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="distance" label="距离(km)" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="elevationGain" label="累计爬升" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="elevationLoss" label="累计下降" />
        <ProFormDateTimeRangePicker width="md" rules={[{required: true, message: "请输入"}]} name="time" label="赛事时间" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="participantsNum" label="参赛人数" />
        <ProFormDigit rules={[{required: true, message: "请输入"}]} width="md" name="cpNum" label="补充点数" />
        <ProFormTextArea rules={[{required: true, message: "请输入"}]} width="md" name="groupDescribe" label="级别描述" />
      </ModalForm>
      {uploadGradesRow && <Modal key={uploadGradesRow?.id} title="上传成绩" open={!!uploadGradesRow} onCancel={() => setUploadGradesRow(null)} onClose={() => setUploadGradesRow(null)}>
        <p>{uploadGradesRow? uploadGradesRow.name : ""}</p>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖拽文件到此区域上传成绩</p>
          <p className="ant-upload-hint">
          仅支持xls、xlsx表格格式
          </p>
        </Dragger>
      </Modal>}
      {gradesManageRow && <Modal title="管理成绩" width={1000} open={!!gradesManageRow} onCancel={() => setGradesManageRow(null)} footer={null}><GradeList key={gradesManageRow?.groupId} data={gradesManageRow}/></Modal>}
    </PageContainer>
  );
};

export default TableList;
