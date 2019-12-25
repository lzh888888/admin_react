import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Select, Radio } from 'antd';
import pubilcFuction from '../../Doctor/publicFunction';
import styles from './index.less';

const RadioGroup = Radio.Group;
const { Option } = Select;

@connect(({
  user,
  nurseinfo,
  schedule,
  loading,
}) => ({
  user,
  nurseinfo,
  schedule,
  loading: !!loading.effects['schedule/edit'],
}))
@Form.create()
export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            selectItems: [],
            optionItemClassCode: ["d","d1","A","A1"],
            select: [],
        }
    }
    
    componentWillMount(){
      let items = [];
        this.state.optionItemClassCode.forEach(v => {
          items.push(
            <Option value={v} >{v}</Option>
          )
        });
        this.setState({
          selectItems: items,
        });
    }


    componentDidMount() {
        const {
            loading,
            schedule: { showModalEdit, activeItem, reqParams },
            form: { getFieldDecorator, FormProps, basicFormProps },
          } = this.props;
        
        let select = [];
         select.push(
          <Form.Item {...FormProps} label="4号">
              {getFieldDecorator("4", {
              initialValue: `${activeItem[4]}`,
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select>
                    {this.state.selectItems}
                </Select>
            )}
          </Form.Item>        
         );
        this.setState({
          select: select
        });

    };

    getdisplay_value = (value)=>{
      const {
        schedule: {  reqParams },
      } = this.props;
      let days = pubilcFuction.getMonthDays(reqParams.scheduleTime);
      if(days>=value){
        return "block";
      }else{
        return "none";
      }
    }


  handleCancel = () => {
    //清除所有的
    this.props.form.resetFields(); 
    this.props.dispatch({
      type: 'schedule/_hideModal',
      payload: { type: 'Edit' },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      user,
      dispatch,
      schedule: { activeItem },
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const data = {
        id: activeItem.id,
        ...values,
      };
      dispatch({ type: 'schedule/edit', payload: data });
    });
  }

  render() {
    const {
      loading,
      schedule: { showModalEdit, activeItem, reqParams },
      form: { getFieldDecorator },
    } = this.props;

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
      <Modal
        title={`编辑“${activeItem.name}”${reqParams.scheduleTime.slice(0,4)}年${reqParams.scheduleTime.slice(5,7)}月的排班信息`}
        destroyOnClose
        maskClosable={false}
        visible={showModalEdit}
        confirmLoading={loading}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        afterClose={this.handAfterClose}
        style={{width:"1000px"}}
        className={styles.editModal}
      >

        <Form layout="inline">
          <Form.Item className={styles.formItem} {...FormProps} label="1号">
            {getFieldDecorator("1", {
              initialValue: `${activeItem[1]}` || "",
              rules: [{ required: true, message: '请选择' }],
            })(
                <Select>
                    <Option value="0/休">0/休</Option>
                    <Option value="干休">干休</Option>
                    {this.state.selectItems}
                </Select>
            )}
          </Form.Item>


        </Form>
      </Modal>
    );
  }
}
