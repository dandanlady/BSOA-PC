
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { getGradeList, deleteGrade} from '@/services/pc/api';
import { useRef } from 'react'




export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};



const GradeList: React.FC<{data:any}> = ({data}) =>  {
  const actionRef:any = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '排名',
      dataIndex: 'rank',
      render: (_) => <a>{_}</a>,
      hideInSearch:true,
    },
    {
      title: '姓名',
      dataIndex: 'runnerName',
      // align: 'right',
      // sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '成绩',
      dataIndex: 'raceTimeStr',
      hideInSearch:true,
    },
    {
      title: '分数',
      dataIndex: 'raceScore',
      hideInSearch:true,
    },
    {
      title: '身份证号',
      dataIndex: 'identityId',
      hideInSearch:true,
    },
    {
      title: '性别',
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
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
          <Popconfirm  key="clear" title="确认删除" onConfirm={async () => { handleRemove(record,false) }}>
              <Button type="link" danger>删除</Button>
          </Popconfirm>,
      ],
    },
  ];


/**
 * 删除
 * @param selectedRow
 */
 const handleRemove = async (selectedRow: any, clearAll:boolean) => {
  const hide = message.loading(clearAll ? '正在清空':'正在删除');
  if (!selectedRow) return true;
  try {
    await deleteGrade({ scoreId:selectedRow?.id, groupId:data?.id, clearAll:clearAll || false});
    hide();
    actionRef.current && actionRef.current.reload()
    message.success('操作成功');
    return true;
  } catch (error:any) {
    hide();
    return false;
  }
};

  return (
    <ProTable<TableListItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
      const runnerName = params.keyword;
      return await getGradeList({...params,runnerName, groupId:data?.id});
      }}
      toolbar={{
        // search: {
        //   onSearch: (value: string) => {
        //     alert(value);
        //     actionRef.current && actionRef.current.
        //   }
        // },
        // filter: (
        //   <LightFilter>
        //     <ProFormDatePicker name="startdate" label="响应日期" />
        //   </LightFilter>
        // ),
        actions: [
            <Popconfirm  key="clear" title="确认清空" onConfirm={async () => { handleRemove({},true) }}>
                <Button type="primary">清空成绩</Button>
            </Popconfirm>,
        ],
        settings: []
      }}
      options={{
        search: true,
      }}
      rowKey="key"
      search={false}

    />
  );
};

export default GradeList;