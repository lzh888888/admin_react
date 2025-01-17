import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin, Form, Card, Input, Button, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ChooseImage from '../../cps/ChooseImage';


import { checkPhone } from '../../utils/tools';


// import styles from './index.less';

// import Set from './Set';

@connect(({
  user: { currentUser },
  loading,
}) => ({
  currentUser,
  loading: !!loading.effects['user/get'],
}))
@Form.create()
export default class extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isSetStatus: false,
    }
  }

  componentDidMount() {
    this.getuserinfo();
  }

  // 编辑表单时显示
  onToggleEdit = () => {
    this.setState({
      isSetStatus: !this.state.isSetStatus,
    })
  }

  getuserinfo = () => {
    this.props.dispatch({
      type: 'user/get',
    });
  }

  setuserinfo = (e) => {
    e.preventDefault();
    const {
      currentUser,
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (err) return;
      const data = {
        image: currentUser.image,
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

  renderAvatar = () => {
    const {
      currentUser,
    } = this.props;
    return (
      <div className="avatar-container">
        <ChooseImage
          source={currentUser.image}
          onClear={() => this.images.image = ''}
          onChange={base64 => this.images.image = base64}
        />
      </div>
    );
  }

  render() {
    const {
      currentUser,
      loading,
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
      // hasFeedback: true,
    };

    return (
      <PageHeaderLayout title="用户信息">
        <Spin spinning={loading}>
          {/* <div className={styles.standardList}> */}
          <Card
            bordered={false}
          >
            <Form layout="horizontal" onClick={this.onToggleEdit}>
              <Form.Item {...basicFormProps} label="头像">
                {/* {this.renderAvatar()} */}
                <Avatar src={currentUser.image} size="large" style={{ width: 80, height: 80 }} />
              </Form.Item>
              <Form.Item {...basicFormProps} label="用户名">
                {getFieldDecorator('username', {
                  initialValue: "",
                  rules: [{ required: true, message: '用户名' }],
                })(
                  <Input placeholder="请输入用户名" />
                )}
              </Form.Item>
              <Form.Item {...basicFormProps} label="昵称">
                {getFieldDecorator('nickname', {
                  initialValue: "",
                  rules: [{ required: true, message: '昵称' }],
                })(
                  <Input placeholder="请输入昵称" />
                )}
              </Form.Item>
              <Form.Item {...basicFormProps} label="手机号码">
                {getFieldDecorator('phone', {
                  initialValue: "",
                  rules: [{
                    required: true, message: '请输入手机号码',
                  }, {
                    validator: checkPhone,
                  }],
                })(
                  <Input placeholder="请输入手机号码" />
                )}
              </Form.Item>
              <Form.Item {...basicFormProps} label="联系电话">
                {getFieldDecorator('tel', {
                  initialValue: "",
                  rules: [{ required: true, message: '联系电话' }],
                })(
                  <Input placeholder="请输入联系电话" />
                )}
              </Form.Item>
              <Form.Item {...basicFormProps} label="地址">
                {getFieldDecorator('address', {
                  initialValue: "",
                  rules: [{ required: true, message: '地址' }],
                })(
                  <Input placeholder="请输入地址" />
                )}
              </Form.Item>
              <Form.Item {...basicFormProps} label="描述">
                {getFieldDecorator('memo', {
                  initialValue: "",
                  rules: [{ required: true, message: '描述' }],
                })(
                  <Input placeholder="请输入描述" />
                )}
                {this.state.isSetStatus && (
                  <Button type="primary" style={{ marginTop: 20 }}>确定修改</Button>
                )}
              </Form.Item >
            </Form>
            {/* {this.state.isSetStatus && (
              <Button type="primary" style={{ marginTop: 20 }} onClick={this.setuserinfo}>确定修改</Button>
            )} */}
          </Card>
          {/* </div> */}
        </Spin>
        {/* <Set /> */}
      </PageHeaderLayout>
    );
  }
}