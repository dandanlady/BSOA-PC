
import type { ProColumns } from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '排名',
    dataIndex: 'index',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    // align: 'right',
    // sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '成绩',
    dataIndex: 'score1',
  },
  {
    title: '分数',
    dataIndex: 'score',
  },
  {
    title: '身份证号',
    dataIndex: 'num2',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
        <Popconfirm  key="clear" title="确认删除" onConfirm={() => {alert('删除啦')}}>
            <a key="link">删除</a>
        </Popconfirm>,
    ],
  },
];

const GradeList: React.FC = () =>  {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        // filter: (
        //   <LightFilter>
        //     <ProFormDatePicker name="startdate" label="响应日期" />
        //   </LightFilter>
        // ),
        actions: [
            <Popconfirm  key="clear" title="确认清空" onConfirm={() => {alert('清空啦')}}>
                <Button type="primary">清空成绩</Button>
            </Popconfirm>,
        ],
        settings: []
      }}
      rowKey="key"
      search={false}
    />
  );
};

export default GradeList;