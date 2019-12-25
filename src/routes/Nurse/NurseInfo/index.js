
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Card, Dropdown, Menu, Icon, Divider, Form, Input, Button, Row, Col, message, notification, Modal } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import { reduce } from 'zrender/lib/core/util';
import nurseinfo from '../../../models/nurseinfo';

import pubiclFunction from '../../Doctor/publicFunction';

const { confirm } = Modal;

import Edit from './edit';
import Add from './Add';
import detail from './Detail';
import Detail from './Detail';
import publicFunction from '../../Doctor/publicFunction';

// import http from '../../utils/http';

@connect(({
    user,
    nurseinfo,
    loading,
  }) => ({
    user,
    nurseinfo,
    getLoading: !!loading.effects['nurseinfo/get'],
    // delLoading: !!loading.effects['consumption/del'],
  }))


export default class extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            data: [], //表格数据
            total: 0, //
        };
        this.columns = [
            {
              title: '姓名',
              width: 100,
              dataIndex: 'name',
              key: 'name',
              fixed: 'left',
            },
            {
              title: '性别',
              width: 40,
              dataIndex: 'sex',
              key: 'sex',
              render: (text) => publicFunction.getSexContext(text)
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              width: 40,
            },
            {
              title: '出生日期',
              dataIndex: 'birthday',
              key: 'birthday',
              width: 150,
              render: (text) => pubiclFunction.sliceDate(text)
            },
            {
              title: '籍贯',
              dataIndex: 'nativePlace',
              key: 'nativePlace',
              width: 100,
            },
            {
              title: '政治面貌',
              dataIndex: 'political',
              key: 'political',
              width: 100,
              render: (text) => pubiclFunction.getpoliticalContext(text),
            },
            {
              title: '首次参加工作时间',
              dataIndex: 'fristWorkingDate',
              key: 'fristWorkingDate',
              width: 150,
              render: (text) => pubiclFunction.sliceDate(text)
            },
            {
              title: '文化程度',
              dataIndex: 'education',
              key: 'education',
              width: 150,
              render: (text) => pubiclFunction.getEducationContext(text)
            },
            {
              title: '毕业院校',
              dataIndex: 'graduateSchool',
              key: 'graduateSchool',
              width: 150,
            },
            { 
                title: '证件类型', 
                dataIndex: 'certificateType', 
                key: 'certificateType',
                render: (text) => pubiclFunction.getCertificateTypeContext(text)
            },
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 120,
              render: (text, record) => {
                let menu = (
                    <Menu>
                      <Menu.Item>
                        <a onClick={()=> this.gotoEdit(record)}>编辑</a>
                      </Menu.Item>
                      <Menu.Item>
                        <a onClick={()=> this.gotoDelete(record)}>删除</a>
                      </Menu.Item>
                    </Menu>
                );
                return (
                    <div>
                        <span onClick={()=>this.gotoDetail(record)}>详情</span>
                        <Divider type="vertical" />
                        <Dropdown overlay={menu}>
                            <span className="ant-dropdown-link">更多<Icon type="down" /></span>
                        </Dropdown>
                    </div>
                );
            }
            },
        ];   
    }

    gotoAdd = () => {
        this.props.dispatch({
            type: 'nurseinfo/_showModal',
            payload: { type: 'Add', item: {} },
        });
    }

    // 编辑
    gotoEdit = (text) => {
        this.props.dispatch({
            type: 'nurseinfo/_showModal',
            payload: { type: 'Edit', item: text },
        });
    }

    // 详情
    gotoDetail = (text) => {
        this.props.dispatch({
            type: 'nurseinfo/_showModal',
            payload: { type: 'Detail', item: text },
        });
    }

    //删除
    gotoDelete = (text) => {
        this.showConfirm(text);
    }

    //删除确认
    showConfirm = (text)=> {
        const {
            user,
            dispatch,
          } = this.props;
        confirm({
            title: `你确定要删除${text.name}的信息吗？`,
            content: `你确定要删除${text.name}的信息吗？`,
            onOk() {
                dispatch({ type: 'nurseinfo/del', payload: { id: text.id } });
            },
            onCancel() {
                message.info('已取消删除');
            },
        });
    }

    componentWillMount(){
        this.getList();  
    }


     // 获取数据
     getList = () => {
        this.props.dispatch({ type: 'nurseinfo/get' });
    }

    componentDidUpdate(){
        console.log("ddddddddddd");
        const {
            nurseinfo: { listData, activeItem },
        } = this.props;
        this.setState({
            data: listData.list.list,
            total: listData.total
        });
        let scheduleData = [];
        if(listData.list.length){
            //循环分组信息
            let classCodeCount = [0,0,0,0,0,0,0,0]; //A,D,N,P,d,0/休,休,干休 的数量
            listData.list.map((v,k,item)=>{
                //循环每组中的护士信息
                let nurse = {};
                nurse["groupName"] = v.groupName;
                v.nurseDataList.map((v1,k1,item1)=>{
                    nurse["name"] = v.name;
                    nurse["sex"] = v.sex;
                    nurse["age"] = v.age;
                    v1["nurseScheduleArrangeDataList"].map((v2,k2)=>{
                        //统计classCode总数
                        switch(v2["classCode"]){
                            case "A": 
                                classCodeCount[0] += 1;
                                break;
                            case "D": 
                                classCodeCount[2] += 1;
                                break;
                            case "N": 
                                classCodeCount[3] += 1;
                                break;
                            case "P": 
                                classCodeCount[4] += 1;
                                break;
                            case "d": 
                                classCodeCount[5] += 1;
                                break;
                            case "0/休": 
                                classCodeCount[6] += 1;
                                break;
                            case "休": 
                                classCodeCount[7] += 1;
                                break;
                            case "干休": 
                                classCodeCount[8] += 1;
                                break;
                        }
                    });


                });
                //添加护士信息
                scheduleData.push(nurse);
            });
        }

        console.log(scheduleData);
        
    }

    //切换页面
    onChangePage = (page,pageSize) => {
        let params = {page,pageSize}
        this.changeReqParams(params);
        
    }

    changeReqParams = (params) => {
        console.log(params);
        this.props.dispatch({
        type: 'nurseinfo/_changeReqParams',
        payload: { ...params },
        });
        this.getList();
    }
 

    render(){
        let { data, total } = this.state;
        const {
            nurseinfo: { listData, activeItem },
        } = this.props;
        return(
            <PageHeaderLayout>
                <Card>
                <Button type="primary" style={{marginBottom:"10px"}} onClick={this.gotoAdd}>添加</Button>
                <Row gutter={24}>
                    <Col>
                        <Table 
                            columns={this.columns} 
                            dataSource={data} 
                            scroll={{ x: 1500, y: 600 }} 
                            pagination={{
                                defaultCurrent:1, 
                                total: total,
                                onChange: this.onChangePage,
                            }}
                            >
                        </Table>
                    </Col>
                </Row>
                    
                </Card>
                <Edit/>
                <Add/>
                <Detail/>
            </PageHeaderLayout>
        )
    }
}