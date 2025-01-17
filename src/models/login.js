import { routerRedux } from 'dva/router';

import http from '../utils/http';
import _sessionStorage from '../utils/storage/sessionStorage';

// 现在只有登录权限验证，不需要重载权限
// import { reloadAuthorized } from '../utils/Authorized';

import imgs from '../common/imgs';

// 账号登录
async function __login(params) {
  return http({
    api: 'login',
    method: 'post',
    params,
  }).then((result) => {
    const { code, data } = result;
    if (code === '200') {
      const user = {
        ...data,
      };
      window.adm = ""; // 设置adm参数
      return { status: 'ok', user };
    } else {
      return { status: 'error' };
    }
  }).catch(() => {
    return { status: undefined };
  });
}

function setStorage({ user, status }) {
  if (status === 'ok') {
    _sessionStorage.set('@User', { user });
  } else {
    _sessionStorage.set('@User', { user: {} });
  }
  _sessionStorage.set('@Login', { status });
}

export default {
  namespace: 'login',

  state: {
    status: undefined, // undefined：默认 ok：登录成功 error：登录失败
  },

  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(__login, payload);
      const user = {
        image: imgs['avatar'],
      };
      window.adm = ""; 
      const response= { status: 'ok', user };


      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // 登录成功
      if (response.status === 'ok') {
        yield put({
          type: 'user/saveCurrentUser',
          payload: response.user,
        });
        // 重载权限
        // reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },

    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: false },
        });
        yield put({
          type: 'user/saveCurrentUser',
          payload: {},
        });
        // 重载权限
        // reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
        window.adm = ''; // 设置adm参数
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setStorage(payload);
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
