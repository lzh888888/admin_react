import http from '../utils/http';

async function getActivities() {
  return http({
    method: 'get',
    url: '',
  });
}

export default {
  namespace: 'activities',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getActivities);
      yield put({
        type: 'save',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
