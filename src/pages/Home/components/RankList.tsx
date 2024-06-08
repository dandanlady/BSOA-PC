/* eslint-disable @typescript-eslint/no-unused-vars */

// import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import styles from './index.module.less'
import {numList} from '../utils'

interface DataType {
    // key: React.Key;
    num1: number;
    school: string;
    num2: number;
  }
  
  const columns: TableColumnsType<DataType> = [
    {
      title: '排名',
      dataIndex: 'num1',
      width: '10%',
    },
    {
      title: '院校名',
      dataIndex: 'school',
    },
    {
      title: '认证用户数',
      dataIndex: 'num2',
      width: '30%',
    },
  ];
  
  const data: DataType[] = [...new Array(10)].map((_t,_index)=> ({num1:_index+1, school:"学校名称111"+_index, num2: _index * 100}))

export default () => {
    return <Table columns={columns} dataSource={data.splice(0,5)} pagination={false}/>
  };