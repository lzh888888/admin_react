import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {  Avatar } from 'antd';
import { Bar } from 'components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';

@connect(({
  user,
  home,
}) => ({
  user,
  home,
}))
export default class extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {
      user,
      home: { listData },
    } = this.props;


    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={user.currentUser.image} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>您好，祝你开心每一天！</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>登录次数</p>
          <p>1</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        breadcrumbList={[{ title: '' }]}
        content={pageHeaderContent}
        extraContent={extraContent}
      >主页 </PageHeaderLayout>
    );
  }
}
