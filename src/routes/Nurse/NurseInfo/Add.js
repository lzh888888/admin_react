import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Button, DatePicker, InputNumber, Radio } from 'antd';
import { timingSafeEqual } from 'crypto';

// import config from '../../../common/config';

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const moment = require('moment');

@connect(({
  user,
  nurseinfo,
  loading,
}) => ({
  user,
  nurseinfo,
  loading: !!loading.effects['nurseinfo/add'],
}))
@Form.create()
export default class extends Component {
  constructor(props){
    super(props);
    this.state={
      birthdaymode: 'time',  //显示的生日时间控件
      birthday: "", //生日
      workDate: "", //首次工作时间
      workDateMode: 'time', //显示工作的时间控件
      
    }
  }
  handleCancel = () => {
    this.props.dispatch({
      type: 'nurseinfo/_hideModal',
      payload: { type: 'Add' },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      user,
      dispatch,
      nurseinfo: { activeItem },
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      values["birthday"]=values.birthday.format('YYYY-MM-DD HH:mm:ss');
      values["fristWorkingDate"]=values.fristWorkingDate.format('YYYY-MM-DD HH:mm:ss');
      // values["firstWorkingDate"]=values.fristWorkingDate.format('YYYY-MM-DD HH:mm:ss');
      if (err) return;
      const data = {
        ...values,
      };
      dispatch({ type: 'nurseinfo/add', payload: data });
    });
  }


  //生日时间控件
  handleOpenChangeBirthday = open => {
    if (open) {
      this.setState({ birthdaymode: 'time' });
    }
  };
  handlePanelChangeBirthday = (value, mode) => {
    this.setState({ birthdaymode: mode });
  };
  onBirthdayChange = (date,dateString) => {
    this.setState({birthday:dateString});
    this.props.form.setFieldsValue({
      birthday: dateString
    });
  }

  //首次工作时间控件
  handleOpenChangeWorkDate = open => {
    if (open) {
      this.setState({ workDateMode: 'time' });
    }
  };
  handlePanelChangeWorkDate = (value, mode) => {
    this.setState({ workDateMode: mode });
  };
  onChangeWorkDate = (date,dateString) => {
    console.log(dateString);
    this.setState({workDate:dateString});
    this.props.form.setFieldsValue({
      fristWorkingDate: dateString
    });
  }


  render() {
    const {
      loading,
      nurseinfo: { showModalAdd, activeItem },
      form: { getFieldDecorator },
    } = this.props;
    let { birthday, workDate } = this.state;
    // console.log(activeItem);

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
        title="添加"
        destroyOnClose
        maskClosable={false}
        visible={showModalAdd}
        confirmLoading={loading}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        afterClose={this.handAfterClose}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
            添加
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Form.Item {...basicFormProps} label="姓名">
            {getFieldDecorator('name', {
              initialValue: activeItem.name,
              rules: [{ required: true, message: '请输入姓名' }],
            })(
              <Input placeholder="请输入姓名" />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="性别">
            {getFieldDecorator('sex', {
              initialValue: activeItem.sex || "1",
              rules: [{ required: true, message: '性别' }],
            })(
              <RadioGroup>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="年龄">
            {getFieldDecorator('age', {
              initialValue: activeItem.age,
              rules: [{ required: true, message: "请输入年龄" }],
            })(
              <Input placeholder="请输入年龄" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="出生日期">
            {getFieldDecorator('birthday', {
              initialValue: activeItem.birthday,
              rules: [{ required: true, message: '请输入出生日期' }],
            })(
                <DatePicker
                  mode={this.state.birthdaymode}
                  showTime
                  onOpenChange={this.handleOpenChangeBirthday}
                  onPanelChange={this.handlePanelChangeBirthday}
                  onChange={this.onBirthdayChange}
                  style={{width:"100%"}}
                />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="籍贯">
            {getFieldDecorator('nativePlace', {
              initialValue: activeItem.nativePlace,
              rules: [{ required: true, message: '请输入籍贯' }],
            })(
              <Input placeholder="请输入籍贯" />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="政治面貌">
            {getFieldDecorator('political', {
              initialValue: activeItem.political || "1",
              rules: [{ required: true, message: '请选择政治面貌' }],
            })(
              <RadioGroup>
                <Radio value="1">中共党员</Radio>
                <Radio value="2">共青团员</Radio>
                <Radio value="3">无党派人士</Radio>
                <Radio value="4">群众</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="首次工作时间">
            {getFieldDecorator('fristWorkingDate', {
              initialValue: "",
              rules: [{ required: true, message: '请输入首次参加工作时间' }],
            })(
                <DatePicker
                  mode={this.state.workDateMode}
                  showTime
                  onOpenChange={this.handleOpenChangeWorkDate}
                  onPanelChange={this.handlePanelChangeWorkDate}
                  onChange={this.onChangeWorkDate}
                  style={{width:"100%"}}
                />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="文化程度">
            {getFieldDecorator('education', {
              initialValue: activeItem.education || "1",
              rules: [{ required: true, message: '请选择文化程度' }],
            })(
              <RadioGroup>
                <Radio value="1">小学</Radio>
                <Radio value="2">初中</Radio>
                <Radio value="3">高中</Radio>
                <Radio value="4">中专</Radio>
                <Radio value="5">大专</Radio>
                <Radio value="6">本科</Radio>
                <Radio value="7">硕士</Radio>
                <Radio value="8">博士</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="毕业学校">
            {getFieldDecorator('graduateSchool', {
              initialValue: activeItem.graduateSchool,
              rules: [{ required: true, message: '请输入毕业学校' }],
            })(
              <Input placeholder="请输入毕业学校" />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="证件类型">
            {getFieldDecorator('certificateType', {
              initialValue: activeItem.certificateType || "1",
              rules: [{ required: true, message: '请选择证件类型' }],
            })(
              <RadioGroup>
                <Radio value="1">身份证</Radio>
                <Radio value="2">居住证</Radio>
                <Radio value="3">护照</Radio>
                <Radio value="4">台胞证</Radio>
                <Radio value="5">军人证</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="证件号码">
            {getFieldDecorator('certificateNumber', {
              initialValue: activeItem.certificateNumber,
              rules: [{ required: true, message: '请输入证件号码' }],
            })(
              <Input placeholder="请输入证件号码" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="联系方式">
            {getFieldDecorator('phone', {
              initialValue: activeItem.phone,
              rules: [{ required: true, message: '请输入联系方式' }],
            })(
              <Input placeholder="请输入联系方式" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="邮箱">
            {getFieldDecorator('email', {
              initialValue: activeItem.email,
              rules: [{ required: true, message: '请输入邮箱' }],
            })(
              <Input placeholder="请输入邮箱" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="家庭住址">
            {getFieldDecorator('address', {
              initialValue: activeItem.address,
              rules: [{ required: true, message: '请输入家庭住址' }],
            })(
              <Input placeholder="请输入家庭住址" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="毕业学校">
            {getFieldDecorator('graduateSchool', {
              initialValue: activeItem.graduateSchool,
              rules: [{ required: true, message: '请输入毕业学校' }],
            })(
              <Input placeholder="请输入毕业学校" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="描述">
            {getFieldDecorator('description', {
              initialValue: activeItem.description,
              rules: [{ required: true, message: '请输入描述' }],
            })(
              <Input placeholder="请输入描述" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
