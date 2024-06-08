/* eslint-disable @typescript-eslint/no-unused-vars */

// import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Card } from 'antd';
import styles from './index.module.less'
import {numList} from './utils'
import RankList from './components/RankList'
import Pie from './components/Pie'


export default () => {
    return <div className={styles.container}>
         <div className={styles.container_left}>
            <div className={`${styles.num_con} ${styles.card}`}>
                {numList.map((t:any) => (
                <div className={styles.num_item} key={t.title}>
                    <img src={t.icon}/>
                    <div className={styles.num_card_content}>
                        <p className={styles.title}>{t.title}</p>
                        <p>{t.value}<span>个</span></p>
                    </div>
                </div>))}
            </div>
            <div className={styles.left_bottom}>
                <Card className={`${styles.card}`} title="院校数据排行榜" extra={<a>查看更多</a>}>
                    <RankList />
                </Card>
                <Card className={`${styles.card}`} title="用户性别占比" extra={<a>查看更多</a>}>
                    <div className={styles.pie_container}><Pie /></div>
                </Card>
            </div>
         </div>
         {/* <div className={styles.container_right}></div> */}
    </div>
  };