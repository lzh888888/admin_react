import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Form, Input, Button, message, Checkbox, Icon, Alert } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class LoginPage extends Component {

  state = {
    autoLogin: true,
  }


  otherLogin = () => {
    message.warning('暂不支持第三方登录');
  }

  changeAutoLogin = (e) => {
    this.setState({ autoLogin: e.target.checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          const { uid, upass } = values;
          this.props.dispatch({
            type: 'login/login',
            payload: { uid, upass },
          });
        }
      }
    );
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { form, login, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <h3>登录</h3>
        <Form onSubmit={this.handleSubmit}>
          {
            login.status === 'error' &&
            !submitting &&
            this.renderMessage('账户或密码错误')
          }
          <FormItem>
            {getFieldDecorator('uid', {
              rules: [{
                required: true, message: '请输入账户！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="账户"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('upass', {
              rules: [{
                required: true, message: '请输入密码！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <div className={styles.other}>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            {/* <Link className={styles.register} to="/user/register">忘记密码</Link> */}
          </div>
          <FormItem>
            <Button size="large" loading={submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        {/* <div className={styles.other}>
          其他登录方式
          <Icon className={styles.icon} type="qq" onClick={this.otherLogin} />
          <Icon className={styles.icon} type="wechat" onClick={this.otherLogin} />
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div> */}
      </div>
    );
  }
}
