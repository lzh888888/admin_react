
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, DatePicker, Menu, Dropdown, Icon, Radio, Modal, Form, Input, Button, Row, Col } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import publicFunction from '../../Doctor/publicFunction';
import tableHeader from './TableHeader';
import Edit from './edit';
const moment = require('moment');

const { MonthPicker } = DatePicker;
const RadioGroup = Radio.Group;

@connect(({
    user,
    schedule,
    loading,
  }) => ({
    user,
    schedule,
    getLoading: !!loading.effects['schedule/get'],
  }))
  @Form.create()
export default class extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            selectedRowKeys: [], // 
            data: [], //排班数据
            requestDate: "2019-09-01", //排班日期
            columns: [], //表头数据
            classCodeCount: [], //排班统计
            SelectModalTop: "0",  //框位置
            SelectModalLeft: "0",
            SelectModalDisplay: "none",
            //
            calassData: {}, //排班数据
            classCodeArray: [], //排班种类
            formRadioItemClass: [], //班种类选择项数据
            formRadioItemSchedule: [], //排班选项数据
            nurseinfo: {},
        };
        this.columnsOperation = {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (text, record) => {
              let menu = (
                  <Menu>
                    <Menu.Item>
                        <a>编辑</a>
                    </Menu.Item>
                  </Menu>
              );
              return (
                  <div>
                      <Dropdown overlay={menu}>
                          <span className="ant-dropdown-link">更多<Icon type="down" /></span>
                      </Dropdown>
                  </div>
              );
          }
        };
    }

     

    componentDidMount(){
        this.getList();
        this.getClassInfo();
        console.log(this.props);
    }

    componentWillMount(){
        let headerData = tableHeader.getScheduleTableHeader(this.state.requestDate,this.editCallback,this.outCallback);
         headerData.push(this.columnsOperation);
        this.setState({
            columns: headerData,
        });
    }

    // 获取数据
    getList = () => {
        this.props.dispatch({ type: 'schedule/get' });
    }

     // 编辑
     gotoEdit = (text) => {
        this.props.dispatch({
            type: 'schedule/_showModal',
            payload: { type: 'Edit', item: text },
        });
    }

    //选择时间
    selectDate = (date,stringDate) => {
        console.log(stringDate);
        let params = {
            scheduleTime: stringDate,
        }
        this.changeReqParams(params);
        //更新表格头
        let headerData = tableHeader.getScheduleTableHeader(stringDate,this.editCallback,this.outCallback);
        headerData.push(this.columnsOperation);
        this.setState({
            requestDate: stringDate,
            columns: headerData,
        })
    }

    //切换页面
    onChangePage = (page,pageSize) => {
        let params = {page,pageSize}
        this.changeReqParams(params);
        
    }

    //改变请求参数
    changeReqParams = (params) => {
        console.log(params);
        this.props.dispatch({
        type: 'schedule/_changeReqParams',
        payload: { ...params },
        });
        this.getList();
    }

    componentWillReceiveProps(){
        const {
            schedule: { listData, activeItem },
        } = this.props;
        let nurseListData = [];
        if(listData.list.length){
            //循环分组信息
            let classCodeCount = [0,0,0,0,0,0,0,0]; //A,D,N,P,d,0/休,休,干休 的数量
            let key=1; //
            listData.list.map((v,k,item)=>{
                //循环每组中的护士信息
                v.nurseDataList.map((v1,k1,item1)=>{
                    let nurse = {};
                    nurse["groupName"] = v.groupName;
                    nurse["allinfo"]=v1;
                    nurse["name"] = v1.name;
                    let b = {};  //护士每月的classSort
                    let c = []; //护士每月的排班信息
                    let scheduleIdArray = {}; //护士每月的排班日期对应的排班id
                    v1["nurseScheduleArrangeDataList"].map((v2,k2)=>{
                        nurse["classSort"]=v2["sortDictionaryData"].classSort;
                        nurse["scheduleTime"]=v2["scheduleTime"].slice(0,7);
                        nurse["nurseId"]=v2["nurseId"];
                        c.push(v2["sortDictionaryData"]);
                        scheduleIdArray[`${v2["scheduleTime"].slice(0,10)}`]=v2["scheduleId"];
                        //截取日期
                        let aa = v2.scheduleTime.slice(8,10);
                        if(aa[0]==0){
                            aa=aa.slice(1,2);
                        }
                        nurse[`${aa}`]=v2.classCode;
                        b[`${aa}`]=v2["sortDictionaryData"].classSort;
                        //统计classCode总数
                        switch(v2["sortDictionaryData"].classSort){
                            case "A": 
                                classCodeCount[0] += 1;
                                break;
                            case "D": 
                                classCodeCount[1] += 1;
                                break;
                            case "N": 
                                classCodeCount[2] += 1;
                                break;
                            case "P": 
                                classCodeCount[3] += 1;
                                break;
                            case "d": 
                                classCodeCount[4] += 1;
                                break;
                            case "0/休": 
                                classCodeCount[5] += 1;
                                break;
                            case "休": 
                                classCodeCount[6] += 1;
                                break;
                            case "干休": 
                                classCodeCount[7] += 1;
                                break;
                        }
                    });
                    //添加护士信息
                    nurse["scheduleIdArray"]=scheduleIdArray;
                    nurse["scheduleMonthData"]=c; //
                    nurse["classSort"]=b;
                    nurse["key"]=key; //添加唯一键
                    key +=1;
                    nurseListData.push(nurse);
                });
            });
            this.setState({
                data: nurseListData,
                classCodeCount: classCodeCount
            });

        }   
    }


    //编辑排班信息回调函数
    editCallback=(value, option)=> {
    }

    //编辑排班信息最外层点击回调函数
    //@day 日期 
    //@record 所选护士信息
    outCallback=(e,record,day)=>{
        let daystr = `${day}`;
        if(daystr.length==1){
            daystr=`-0${daystr}`;
        }
        let time = record["scheduleTime"]+ daystr;
        let nurseinfo = {
            info: record,
            scheduleTime: time
        };
        this.setState({
            SelectModalTop: e.pageY,
            SelectModalLeft: e.pageX,
            SelectModalVisible: false,
            SelectModalVisible: true,
            selectNurseData: record,
            nurseinfo: nurseinfo,
        });
        this.props.dispatch({
            type: 'schedule/_showModal',
            payload: { type: 'RadioEdit', item: {} },
        });
        const {
            schedule: { listData, activeItem, classInfoData },
            form: { getFieldDecorator },
        } = this.props;

        //排班数据操作
        let calassData = classInfoData.list;
        let classCodeArray = [];   
        for(let i in calassData){
            classCodeArray.push(i);
        }

        //添加排班种类表单项
        let formRadioItemClass=[];
        classCodeArray.forEach(v=>{
            formRadioItemClass.push(<Radio value={v}>{v}</Radio>);
        });
        this.setState({
            calassData: calassData,
            classCodeArray: classCodeArray,
            formRadioItemClass: formRadioItemClass,
        });
    }


    showModal = () => {
        this.props.dispatch({
            type: 'schedule/_showModal',
            payload: { type: 'RadioEdit', item: {} },
        });
    };

    //表单提交
    handleSubmit = (e) => {
    e.preventDefault();
    let  {
        dispatch,
        schedule: { activeItem },
        form: { validateFieldsAndScroll },
    } = this.props;
    let { nurseinfo } = this.state;
    validateFieldsAndScroll((err, values) => {
        if (err) return;
        const data = {
            createBy: "",
            createByName: "",
            groupName: nurseinfo.info["groupName"],
            nurseId: nurseinfo.info["nurseId"],
            remark: "",
            scheduleId: nurseinfo.info["scheduleIdArray"][`${nurseinfo.scheduleTime}`],
            scheduleTime: nurseinfo.scheduleTime,
            ...values,
        };
        dispatch({ type: 'schedule/edit', payload: data });
        });
    }
    
      handleCancel = e => {
        this.setState({
            nurseinfo: {},
        });
        this.props.dispatch({
            type: 'schedule/_hideModal',
            payload: { type: 'RadioEdit' },
          });
      };

      //获得排班分类
      getClassInfo = () => {
        this.props.dispatch({ type: 'schedule/getclassinfo' });
      }

      //班种类值改变
      onChangeItemClass = (e) => {
          let a = e.target.value;
        let b = this.state.calassData[`${a}`];
        //添加班选项
        let items = [];
        b.forEach((v)=>{
            items.push(<Radio value={v}>{v}</Radio>)
        })
        this.setState({
            formRadioItemSchedule: items,
        });

      }


   


    render(){
        let { columns, classCodeCount, SelectModalTop, SelectModalLeft, SelectModalDisplay, formRadioItemClass, formRadioItemSchedule, nurseinfo } = this.state;
        let selectName = nurseinfo.info?nurseinfo.info.name:"";
        const {
            schedule: { listData, activeItem, showModalRadioEdit },
            form: { getFieldDecorator },
        } = this.props;
        if(!showModalRadioEdit){
            this.props.form.resetFields(); 
        }

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
        // 基础表单参数
        const basicFormProps = {
            labelCol: {
            span: 6,
            },
            wrapperCol: {
            span: 14,
            },
            hasFeedback: true,
        };
        const FormProps = {
            labelCol: {
            span: 6,
            },
            wrapperCol: {
            span: 14,
            },
        };
       
    return (
        <PageHeaderLayout>
             <div style={{ background: '#ECECEC', padding: '0', margin: '-20px -20px 0' }}>
                <Card>
                    <MonthPicker 
                        style={{marginBottom:"10px"}} 
                        onChange={this.selectDate} 
                        renderExtraFooter={() => '排班年月'} 
                        placeholder="请选择排班年月"
                        defaultValue={moment("2019-09")}
                    />
                     {/* <a onClick={()=> this.gotoEdit(activeItem)}>编辑</a> */}
                    <Row gutter={24}>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>A班有:{classCodeCount[0] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>D班有:{classCodeCount[1] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>N班:{classCodeCount[2] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>P班有:{classCodeCount[3] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>d班有:{classCodeCount[4] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>0/休班有:{classCodeCount[5] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>休班有:{classCodeCount[6] || 0}</Col>
                        <Col xs={8} sm={6} md={6} lg={6} xl={3}>干休班有:{classCodeCount[7] || 0}</Col>
                    </Row>
                    <Table 
                        size={"small"}
                        columns={this.state.columns} 
                        dataSource={this.state.data} 
                        scroll={{ x: 2800, y: "50vh" }} 
                        rowSelection={rowSelection}
                        pagination={{
                            disabled: false,
                            total: this.state.data.length,
                            pageSize: this.state.data.length,
                        }}
                    />,     
                </Card>
                <Edit/>
                <Modal
                    title={`编辑${selectName}的${nurseinfo.scheduleTime}排班信息`}
                    visible={showModalRadioEdit}
                    width={320}
                    onCancel={this.handleCancel}
                    mask={false}
                    maskClosable={false}
                    style={{ height:"100px", position:"fixed",top: SelectModalTop, left: SelectModalLeft-200 }}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleSubmit}>
                          修改
                        </Button>,
                    ]}
                >
                    <div style={{height:"100px",overflowY:"auto"}}>
                        <Form layout="horizontal">
                            <Form.Item {...FormProps} label="班种">
                                {getFieldDecorator("class", {
                                rules: [{ required: true, message: '请选择班种' }],
                                })(
                                    <RadioGroup 
                                        onChange={this.onChangeItemClass}
                                    >
                                    {formRadioItemClass}
                                    </RadioGroup>
                                )}
                            </Form.Item>
                            <Form.Item {...FormProps} label="班种类型">
                                {getFieldDecorator("classCode", {
                                rules: [{ required: true, message: '请选择班种' }],
                                })(
                                    <RadioGroup>
                                    {formRadioItemSchedule}
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </PageHeaderLayout>
    );
    }
        


}