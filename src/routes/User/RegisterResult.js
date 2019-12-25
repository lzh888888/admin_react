import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { Link, Redirect } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/register"><Button size="large">返回</Button></Link>
    <Link to="/user/login"><Button size="large" type="primary">去登录</Button></Link>
  </div>
);

export default connect(state => ({
  register: state.register,
}))(({ register = {} }) => (
  register.status !== 'ok' ?
    <Redirect to="/user/login" />
    : (
      <Result
        className={styles.registerResult}
        type="success"
        description=""
        actions={actions}
        style={{ marginTop: 56 }}
        title={<div className={styles.title}>{register.msg}</div>}
      />
    )
));
