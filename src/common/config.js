/**
 * 配置
 */
import React, { Fragment } from 'react';
import { Icon } from 'antd';

const appName = '后台管理';
const copyright = <Fragment>Copyright <Icon type="copyright" /> 2019 *****公司</Fragment>;

export default {
  appName,
  platform: 'web_admin',

  copyright,
  basicTitle: `${appName}管理`,

  globalFooterLinks: [{
    key: '帮助',
    title: '帮助',
    href: 'http://www.baidu.com/',
    blankTarget: true,
  }, {
    key: '隐私',
    title: '隐私',
    href: 'http://www.baidu.com/',
    blankTarget: true,
  }, {
    key: '条款',
    title: '条款',
    href: 'http://www.baidu.com/',
    blankTarget: true,
  }],

  roomAreaMaps: [
    '暂无', 'A区', 'B区', 'C区', 'D区', 'E区', 'F区', 'G区', 'H区', 'I区', 'J区', 'K区', 'V区',
    '一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼', '八楼',
  ],


};

