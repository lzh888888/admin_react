import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

@connect(({
  user,
  loading,
}) => ({
  user,
  loading: !!loading.effects['user/set'],
}))
@Form.create()
export default class extends Component {
  handleCancel = () => {
    this.props.dispatch({
      type: 'user/_hideModal',
      payload: { type: 'Set' },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      user: { currentUser },
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const data = {
        uid: currentUser.phoneno,
        admin: '',
        username: currentUser.username || '',
        address: currentUser.address || '',
        phone: currentUser.phone || '',
        tel: currentUser.tel || '',
        memo: currentUser.memo || '',
        ...values,
      };
      dispatch({ type: 'user/set', payload: data });
    });
  }

  render() {
    const {
      user: { showModalSet, currentUser },
      form: { getFieldDecorator },
      loading,
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

    return (
      <Modal
        title="设置用户信息"
        destroyOnClose
        maskClosable={false}
        visible={showModalSet}
        confirmLoading={loading}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        afterClose={this.handAfterClose}
      >
        <Form layout="horizontal">
          <Form.Item {...basicFormProps} label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名' }],
            })(
              <Input placeholder="请输入用户名" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="地址">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '地址' }],
            })(
              <Input placeholder="请输入地址" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="手机号">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '手机号' }],
            })(
              <Input placeholder="请输入手机号" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="联系电话">
            {getFieldDecorator('tel', {
              rules: [{ required: true, message: '联系电话' }],
            })(
              <Input placeholder="请输入联系电话" />
            )}
          </Form.Item>
          <Form.Item {...basicFormProps} label="描述">
            {getFieldDecorator('memo', {
              rules: [{ required: true, message: '描述' }],
            })(
              <Input placeholder="请输入描述" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
