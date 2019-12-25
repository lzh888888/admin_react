import styles from './index.less';
import publicFunction from '../../Doctor/publicFunction';
import { Select } from 'antd';

const { Option } = Select;

export default {

    //获取排班表头
    //strDate => 2019-10
    // fun => 回调函数
    // out => 外层outContainer的点击回调函数
    getScheduleTableHeader: (strDate,fun,outFun) => {
        let showSecletContainer = "none";

        let columns = [
            {
                title: '序号',
                width: 50,
                dataIndex: 'key',
                key: 'key',
                fixed: 'left',
            },
            {
                title: '分组',
                width: 80,
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '岗位',
                dataIndex: 'sex',
                key: 'sex',
                width: 50,
            },
            {
                title: '层级',
                dataIndex: 'age',
                key: 'age',
                width: 50,
            },
            {
                title: '职称',
                dataIndex: 'address',
                key: '',
                width: 80,
            }, 
        ];

        //添加表格项
        let monthDays = publicFunction.getMonthDays(strDate);
        for(let i=1;i<=monthDays;i++){
            columns.push({
                title: `${i}`,
                width: 55,
                align: 'center',
                children: [
                    {
                        title: `${publicFunction.getWeek(strDate,i)}`,
                        dataIndex: `${i}`,
                        key: `${i}`,
                        width: 55,
                        align: 'center',
                        render: (text,record)=>{
                            // return <div style={{background:`${publicFunction.getScheduleContextBgColor(record.classSort[i])}`}} className={styles.tableContainer}>{text}</div>;
                            return (
                                <div onClick={(e)=> outFun(e,record,i)} className={styles.outContainer}>
                                    <div style={{background:`${publicFunction.getScheduleContextBgColor(record.classSort[i])}`}} className={styles.tableContainer}>{text}</div>
                                    <div style={{display:`${showSecletContainer}`}} className={styles.secletContainer}>
          
                                    </div>
                                </div>
                            );
                        }
                    },
                ]
            });
        }

       columns.push({
        title: '',
        dataIndex: '',
        key: '',
        },);

        return columns;
    }
}