/* eslint-disable @typescript-eslint/no-unused-vars */
import { saveOrUpdateBanner, getBannerList, deleteBanner, updateRule } from '@/services/pc/api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Card, List, Popconfirm, message } from 'antd';
import React, { useReducer, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
const { Meta } = Card;


// getBannerList




const TableList: React.FC = () => {
  // 批量上传窗口的弹窗
  // const [uploadModalOpen, handleUploadModalOpen] = useState<boolean>(false);
 // 新增/编辑窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<{show:boolean, type?:"add"| "edit"| null}>({show:false});

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  // banner列表
  const {data:bannerList, run:refresh} = useRequest(async () => {
    const res = await getBannerList({pageNo:1, pageSize:20});
    return res.data
  })

  /**
 * 新增
 * @param fields
 */
const handleRemove= async (data: any) => {
  const hide = message.loading('正在删除');
  try {
    await deleteBanner(data?.id);
    hide();
    message.success('操作成功');
    refresh && refresh()
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
  

/**
 * 新增
 * @param fields
 */
 const handleAddOrUpdate = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await saveOrUpdateBanner({ ...fields });
    hide();
    message.success('操作成功');
    refresh && refresh()
    return true;
  } catch (error) {
    hide();
    return false;
  }
};


  return (
    <PageContainer>
       <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={bannerList}
          
          renderItem={(item:any) => (
            <List.Item key={item.id}>
              <Card
                cover={
                  <img
                    alt="example"
                    src={item?.coverPath}
                  />
                }
                actions={[
                  <Popconfirm key="delete" title="确认删除" onConfirm={()=>{handleRemove(item)}}><DeleteOutlined type="delete" /></Popconfirm>,
                  <EditOutlined key="edit" onClick={() => {setCurrentRow(item); handleModalOpen({type:"edit",show:true})}} />,
                ]}
                >
                <Meta
                  title={item.name} 
                  description={<><p>{item.link}</p><p>播放顺序：{item.seq}</p></>}
                />
              </Card>
            </List.Item>
          )}
       />
      <ModalForm
        title={createModalOpen.type === "edit"? "编辑banner":"新增banner"}
        width="400px"
        key={createModalOpen.type}
        open={createModalOpen.show}
        initialValues={createModalOpen.type === "edit"?currentRow:{}}
        onOpenChange={() => {handleModalOpen({show:false});setCurrentRow({}) }}
        onFinish={async (value) => {
          const success = await handleAddOrUpdate(createModalOpen.type === "add" ?value: {...currentRow, ...value});
          if (success) {
            handleModalOpen({show:false});
            refresh && refresh()
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
          label="名称"
        />
        <ProFormText width="md" 
          rules={[
              {
                required: true,
                message: "请输入",
              },
            ]}
            name="link" 
            label="链接"
          />

<ProFormUploadButton
        name="upload"
        label="封面图"
        max={2}
        fieldProps={{
          name: 'coverPath',
          listType: 'picture-card',
        }}
        action="/upload.do"
        extra="支持1M以内jpg、png格式"
      />

          <ProFormText width="md" 
            rules={[
                {
                  required: true,
                  message: "请输入",
                },
              ]}
              name="seq" 
              label="播放顺序"
            />    
      </ModalForm>
     
    </PageContainer>
  );
};

export default TableList;
