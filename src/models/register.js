import { message } from 'antd';

import http from '../utils/http';

// 找回密码、注册账户
async function register(mobile) {
  return http({
    api: 'register',
    method: 'get',
    params: { userno: mobile },
  }).then((result) => {
    const { success, code } = result;
    if (success === '1') {
      return { status: 'ok', msg: '恭喜您注册成功，密码为手机号后4位。' };
    } else if (code === '2') {
      return { status: 'ok', msg: '成功找回密码，密码为手机号后4位，有效期30分钟，请及时修改密码。' };
    } else {
      message.error(msg);
      return { status: 'error' };
    }
  }).catch(() => {
    return { status: 'error' };
  });
}

export default {
  namespace: 'register',

  state: {
    status: undefined,
    msg: '',
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        msg: payload.msg,
      };
    },

    clear() {
      return {
        status: undefined,
        msg: '',
      };
    },
  },
};
