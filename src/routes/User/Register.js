import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Row, Col, message, notification } from 'antd';

import http from '../../utils/http';
import { createRandomNumber } from '../../utils/utils';

import styles from './Register.less';

const FormItem = Form.Item;

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      getCaptchaing: false,
    };
    this.crearCaptcha = null;
  }

  componentDidMount() {
    this.props.dispatch({ type: 'register/clear' });
  }

  componentWillReceiveProps(nextProps) {
    const mobile = this.props.form.getFieldValue('mobile');
    if (nextProps.register.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/register-result',
        state: { mobile },
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    this.props.form.validateFields(['mobile'], { force: true },
      (err, values) => {
        if (err) return;
        this.setState({ getCaptchaing: true });
        this.crearCaptcha = createRandomNumber().toString(); // 生成的4位数字短信验证码
        http({
          method: 'get',
          api: 'sendmsg',
          params: {
            tel: values.mobile,
            msg: `温馨提示：您的验证码是${this.crearCaptcha}，有效期10分钟，请及时输入！非本人操作，请忽略该短信！`,
          },
        }).then((result) => {
          const { success, msg } = result;
          if (success !== '1') {
            notification.error({
              message: '提示',
              description: msg,
            });
          } else {
            // 短信码发送成功开始倒计时
            notification.success({
              message: '提示',
              description: '短信验证码已发送，请注意查收。',
            });
            let count = 59;
            this.setState({ count });
            this.interval = setInterval(() => {
              count -= 1;
              this.setState({ count });
              if (count === 0) {
                clearInterval(this.interval);
              }
            }, 1000);
          }
        }).catch(() => {

        }).then(() => {
          this.setState({ getCaptchaing: false });
        });
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (err) return;
        if (values.captcha !== this.crearCaptcha) {
          message.error('验证码错误');
        } else {
          this.props.dispatch({
            type: 'register/submit',
            payload: values.mobile,
          });
        }
      }
    );
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count } = this.state;
    return (
      <div className={styles.main}>
        <h3>找回密码、注册账户</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{
                required: true, message: '请输入手机号！',
              }, {
                pattern: /^1\d{10}$/, message: '手机号格式错误！',
              }],
            })(
              <Input size="large" placeholder="11位手机号" />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [{
                    required: true, message: '请输入验证码！',
                  }],
                })(
                  <Input
                    size="large"
                    placeholder="验证码"
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={this.state.getCaptchaing || !!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` :
                    this.state.getCaptchaing ? '获取中...' : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button size="large" loading={submitting} className={styles.submit} type="primary" htmlType="submit">
              提交
            </Button>
            <Link className={styles.login} to="/user/login">使用已有账户登录</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
