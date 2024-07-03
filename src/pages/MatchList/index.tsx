import { getMatchList,saveOrUpdateMatch, deleteMatch } from '@/services/pc/api';
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
import dayjs from "dayjs";
import { baseURL } from '../../../config/const';
import { jsonToQueryString } from '../../utils/helper'

/**
 * 新增
 * @param fields
 */
const handleAddOrUpdate = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await saveOrUpdateMatch({ ...fields });
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    message.error('操作失败，请稍后再试!');
    return false;
  }
};


/**
 * 删除
 * @param selectedRows
 */
const handleRemove = async (selectedRow: any) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    await deleteMatch(selectedRow.id);
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
  /**
      新增/编辑窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<{show:boolean, type?:"add"| "edit"| null}>({show:false});
 // 请求参数
 const [searchParams, setSearchParams] = useState<any>();

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: "赛事编号",
      dataIndex: 'code',
      // tip: 'The rule name is the unique key',
      
    },
    {
      title: "赛事名称",
      dataIndex: 'name',
    },
    {
      title: "组别",
      dataIndex: 'location',
      hideInForm:true,
    },
    {
      title: "参赛人数",
      dataIndex: 'playerNum',
      hideInForm:true,
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: "全部",
          status: 'Default',
        },
        1: {
          text: "待上传成绩",
          status: 'Processing',
        },
        2: {
          text: "已完成",
          status: 'Success',
        },
      },
    },
    {
      title: "赛事日期",
      dataIndex: 'startTime',
      valueType: "dateRange",
      render: (_, record:any) => dayjs(record.startTime).format("YYYY-MM-DD")
    },
    
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record:any) => [
        <a
          key="config"
         href={`/matchlist/groupelist?id=${record?.id}`}
        >
          管理
        </a>,
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
         <Popconfirm key="delete" title="确认删除" onConfirm={async ()=>{ await handleRemove(record); actionRef.current && actionRef.current.reload();}}>
         <a key="subscribeAlert" style={{color:"red"}} >
          删除
        </a>
      </Popconfirm>
      ],
    },
  ];

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
            const {current,pageSize, ...params} = searchParams
            window.open(baseURL+ '/admin/competition/export?'+ jsonToQueryString(params))
        }}
        >
         导出
        </Button>,
        ]}
        request={(params) => { setSearchParams(params); return getMatchList(params)}}
        columns={columns}
      />
      <ModalForm
        title="新建赛事"
        width="400px"
        key={createModalOpen.type}
        open={createModalOpen.show}
        initialValues={createModalOpen.type === "edit"?currentRow:{}}
        onOpenChange={() => {handleModalOpen({show:false});setCurrentRow({}) }}
        onFinish={async (value) => {
          const success = await handleAddOrUpdate(createModalOpen.type === "add" ?value: {...currentRow, ...value});
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
              message: "输入赛事名称",
            },
          ]}
          width="md"
          name="name"
          label="赛事名称"
        />
        <ProFormText width="md" 
          rules={[
              {
                required: true,
                message: "输入参赛人数",
              },
            ]}
            name="playerNum" 
            label="参赛人数"
          />
          <ProFormDatePicker width="md" 
            rules={[
                {
                  required: true,
                  message: "输入时间",
                },
              ]} 
              name="startTime" 
              label="赛事时间"
            />
          <ProFormText width="md" 
          rules={[
              {
                required: true,
                message: "输入地点",
              },
            ]} 
            name="location" 
            label="赛事地点"
          />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
