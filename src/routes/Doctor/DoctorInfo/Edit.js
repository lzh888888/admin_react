import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Radio } from 'antd';

const RadioGroup = Radio.Group;

@connect(({
  user,
  doctorinfo,
  schedule,
  loading,
}) => ({
  user,
  doctorinfo,
  schedule,
  loading: !!loading.effects['doctorinfo/edit'],
}))
@Form.create()
export default class extends Component {
  handleCancel = () => {
    this.props.dispatch({
      type: 'doctorinfo/_hideModal',
      payload: { type: 'Edit' },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      user,
      dispatch,
      doctorinfo: { activeItem },
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const data = {
        id: activeItem.id,
        ...values,
      };
      dispatch({ type: 'doctorinfo/edit', payload: data });
    });
  }

  render() {
    const {
      loading,
      doctorinfo: { showModalEdit, activeItem },
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
        title="编辑"
        destroyOnClose
        maskClosable={false}
        visible={showModalEdit}
        confirmLoading={loading}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        afterClose={this.handAfterClose}
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
              initialValue: `${activeItem.sex}`,
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
              <Input placeholder="请输入出生日期" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="籍贯">
            {getFieldDecorator('nativePolace', {
              initialValue: activeItem.nativePlace,
              rules: [{ required: true, message: '请输入籍贯' }],
            })(
              <Input placeholder="请输入籍贯" />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="政治面貌">
            {getFieldDecorator('political', {
              initialValue: `${activeItem.political}`,
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
              initialValue: activeItem.fristWorkingDate,
              rules: [{ required: true, message: '请输入首次参加工作时间' }],
            })(
              <Input placeholder="请输入首次参加工作时间" />
            )}
          </Form.Item>
          <Form.Item {...FormProps} label="文化程度">
            {getFieldDecorator('education', {
              initialValue: `${activeItem.education}`,
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
              initialValue:  `${activeItem.certificateType}`,
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
