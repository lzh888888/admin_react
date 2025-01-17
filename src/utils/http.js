/**
 * 请求封装
 */

import axios from 'axios';
import { notification } from 'antd';

import Api from '../common/api';
// import config from '../common/config';

// axios 默认配置
axios.defaults.timeout = 30000;

// 状态码
const statusCodeMaps = {
  403: '服务器禁止访问',
  404: '服务器没有此服务',
  500: '服务器出错',
  503: '服务器超时',
  504: '服务器没有响应',
};

const notifyTip = (bool, message) => {
  bool && notification.error({ message, duration: 2.5 });
}

export default (reqConfig = {}) => {
  return new Promise((resolve, reject) => {
    const { api: apiKey, url, extraOpts = {} } = reqConfig;
    const { isNotify = true } = extraOpts;
    delete reqConfig.extraOpts; // eslint-disable-line

    // 默认带上的参数
    const baseParams = { adm: window.adm || '' };


    console.log(Api[apiKey]);
    // 请求
    axios({
      ...reqConfig,
      url: Api[apiKey] || url,
      params: { ...reqConfig.params, 
        // ...baseParams 
      },

      data: JSON.stringify(reqConfig.data),
      // data: qs.stringify(data),
      // 由于跨域原因不能设置 headers
      // headers: {
      //   p: config.platform,
      // },
    }).then((result) => {
      const { data, status } = result;
      if (status >= 200 && status < 300) {
        if (typeof data === 'object') {
          resolve(data);
        } else {
          const msg = '返回json格式错误'; 
          notifyTip(isNotify, msg);
          reject({ msg });
        }
      } else {
        const msg = statusCodeMaps[status] || 'Server Error';
        notifyTip(isNotify, msg);
        reject({ msg });
      }
    }).catch((error) => {
      console.log('request error', error); // eslint-disable-line
      let msg = '请求异常';
      if (error.code === 'ECONNABORTED') {
        msg = '请求超时，请重试';
      }
      notifyTip(isNotify, msg);
      reject({ msg });
    });
  });
}
