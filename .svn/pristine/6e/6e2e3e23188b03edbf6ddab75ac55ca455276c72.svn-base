import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'dva/router';

const BackButton = ({ history, onClick }) => {
  return (
    <Button
      shape="circle"
      icon="arrow-left"
      type="primary"
      size="large"
      onClick={onClick ? () => onClick() : () => history.goBack()}
    />
  );
};

export default withRouter(BackButton);
