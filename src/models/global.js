import { routerRedux } from 'dva/router';
import http from '../utils/http';

async function getNotices() {
  return http({ method: 'get', url: '/api/notices' });
}

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(getNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },

    *haveLogin(_, { put, select }) {
      const status = yield select(state => state.login.status);
      if (status === 'ok') {
        yield put(routerRedux.push('/'));
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },

    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        // 已登录不能进入登录页和注册页
        if (pathname === '/user/login' || pathname === '/user/register') {
          dispatch({ type: 'haveLogin' });
        }
      });
    },
  },
};
