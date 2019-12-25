import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Button, Radio } from 'antd';

import publicFunction from '../publicFunction';

@connect(({
  user,
  doctorinfo,
  doctorschedule,
  loading,
}) => ({
  user,
  doctorinfo,
  doctorschedule,
  loading: !!loading.effects['doctorinfo/detail'],
}))
@Form.create()
export default class extends Component {
  handleCancel = () => {
    this.props.dispatch({
      type: 'doctorinfo/_hideModal',
      payload: { type: 'Detail' },
    });
  }


  render() {
    const {
      loading,
      doctorinfo: { showModalDetail, activeItem },
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Modal
        title="详情"
        destroyOnClose
        maskClosable={false}
        visible={showModalDetail}
        confirmLoading={loading}
        onCancel={this.handleCancel}
        afterClose={this.handAfterClose}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            返回
          </Button>,
        ]}
      >
        <div>
            <p>姓名：{activeItem.name}</p>
            <p>性别：{activeItem.sex=="1"?"男":"女"}</p>
            <p>年龄：{activeItem.age}</p>
            <p>出生日期：{publicFunction.sliceDate(activeItem.birthday)}</p>
            <p>籍贯：{activeItem.nativePlace}</p>
            <p>政治面貌：{publicFunction.getpoliticalContext(activeItem.political)}</p>
            <p>首次参见工作时间：{publicFunction.sliceDate(activeItem.fristWorkingDate)}</p>
            <p>文化程度：{publicFunction.getEducationContext(activeItem.education)}</p>
            <p>毕业学校：{activeItem.graduateSchool}</p>
            <p>证件类型：{publicFunction.getCertificateTypeContext(activeItem.certificateType)}</p>
            <p>证件号码：{activeItem.certificateNumber}</p>
            <p>联系方式：{activeItem.phone}</p>
            <p>邮箱：{activeItem.email}</p>
            <p>家庭住址：{activeItem.address}</p>
            <p>描述：{activeItem.description}</p>
            <p>状态：{publicFunction.getStatusContext(activeItem.status)}</p>
        </div>
      </Modal>
    );
  }
}
