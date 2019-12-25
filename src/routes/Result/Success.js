import React from 'react';
import { Button, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const actions = (
  <div>
    <Button type="primary">返回</Button>
    <Button>打 印</Button>
  </div>
);

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="success"
        title="提交成功"
        description=""
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
