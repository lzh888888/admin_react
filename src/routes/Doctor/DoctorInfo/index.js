
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Card, Dropdown, Menu, Icon, Divider, Form, Input, Button, Row, Col, message, notification, Modal } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import { reduce } from 'zrender/lib/core/util';
import doctorinfo from '../../../models/doctorinfo';
import publicFunction from '../publicFunction';

const { confirm } = Modal;

import Edit from './Edit';
import Add from './Add';
import Detail from './Detail';

// import http from '../../utils/http';

@connect(({
    user,
    doctorinfo,
    loading,
  }) => ({
    user,
    doctorinfo,
    getLoading: !!loading.effects['doctorinfo/get'],
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
              render: (text)=> publicFunction.sliceDate(text),
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
              render: (text, record, index) => publicFunction.getpoliticalContext(text),
            },
            {
              title: '首次参加工作时间',
              dataIndex: 'fristWorkingDate',
              key: 'fristWorkingDate',
              width: 150,
              render: (text) => publicFunction.sliceDate(text)
            },
            {
              title: '文化程度',
              dataIndex: 'education',
              key: 'education',
              width: 150,
              render: (text, record, index) => publicFunction.getEducationContext(text),
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
                render: (text, record, index) => publicFunction.getCertificateTypeContext(text)
            },
            {
                title: '证件号码',
                dataIndex: 'certificateNumber',
                key: 'certificateNumber',
                width: 150,
            },
            {
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone',
                width: 150,
            },
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 120,
              render: (text,record) => {
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
            type: 'doctorinfo/_showModal',
            payload: { type: 'Add', item: {} },
        });
    }

    // 编辑
    gotoEdit = (text) => {
        this.props.dispatch({
        type: 'doctorinfo/_showModal',
        payload: { type: 'Edit', item: text },
        });
    }

      // 详情
      gotoDetail = (text) => {
        this.props.dispatch({
        type: 'doctorinfo/_showModal',
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
                dispatch({ type: 'doctorinfo/del', payload: { id: text.id } });
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
        this.props.dispatch({ type: 'doctorinfo/get' });
    }

    componentDidUpdate(){
        const {
            doctorinfo: { listData, activeItem },
        } = this.props;
        this.setState({
            data: listData.list.list,
            total: listData.total
        });
        
    }

    //切换页面
    onChangePage = (page,pageSize) => {
        let params = {page,pageSize}
        this.changeReqParams(params);
        
    }

    changeReqParams = (params) => {
        console.log(params);
        this.props.dispatch({
        type: 'doctorinfo/_changeReqParams',
        payload: { ...params },
        });
        this.getList();
    }




     

    render(){
        let { data, total } = this.state;
        const {
            doctorinfo: { listData, activeItem },
        } = this.props;
        return(
            <PageHeaderLayout>
                {/* <Card>
                    <Button onClick={this.gotoAdd}>添加</Button>
                </Card> */}
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