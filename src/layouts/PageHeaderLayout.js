import React from 'react';
import { Link } from 'dva/router';
import PageHeader from 'components/PageHeader';
import styles from './PageHeaderLayout.less';
// import { PageHeader, Tabs, Button, Statistic, Descriptions } from 'antd';
// const { TabPane } = Tabs;

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    <PageHeader key="pageheader" 
      // subTitle={top}
      // footer={
      //   <Tabs defaultActiveKey="1">
      //     <TabPane tab="Details" key="1" />
      //     <TabPane tab="Rule" key="2" />
      //   </Tabs>
      // } 
      {...restProps} 
      
      linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
