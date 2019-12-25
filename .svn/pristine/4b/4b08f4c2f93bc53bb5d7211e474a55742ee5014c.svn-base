import React from 'react';
import { Button, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const actions = <Button type="primary">返回修改</Button>;

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="error"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
