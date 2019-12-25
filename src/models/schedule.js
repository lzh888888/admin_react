import { message as msg } from 'antd';
import http from '../utils/http';

// 获取
async function __get(params) {
  return http({ method: 'post', api: 'getnurseschedule', params });
}

async function __edit(params) {
  return http({ method: 'post', api: 'updatenurseschedule', params });
}


// 获取排班分类
async function __getclassinfo(params) {
  return http({ method: 'post', api: 'getnursescheduleclassinfo', params });
}

const initState = {
  listData: {
    list: [],
    total: 0,
  },

  // 选中项，编辑和详情需要获取项数据
  activeItem: {},

    // 弹出框的打开和关闭
    showModalAdd: false,
    showModalDetail: false,
    showModalEdit: false,
    showModalRadioEdit: false,


  // 请求参数
  reqParams: {
    // page: '1',
    // pageSize: "10",
    scheduleTime: "2019-09-11"
  },

  //排班分类请求参数
  reqParamsClassInfo: {
    sortType: 1
  },

  //排班分类数据
  classInfoData: {
    list: {},
  },


};




export default {
  namespace: 'schedule',

  state: initState,

  effects: {
    *get(_, { call, put, select }) {
      try {
        const { user, schedule } = yield select(state => state);
        const params = { ...schedule.reqParams };

        const { code, message, data } = yield call(__get, params);
        if (code === 200) {
          yield put({
            type: '_appendListData',
            payload: { list: data },
          });
        } else {
          yield put({
            type: '_appendListData',
            payload: { list: [] },
          });
        }
      } catch (e) {
        //
      }
    },

    *add({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__add, payload);
        if (code === 200) {
          // message.success(msg);
          msg.warning(message);
          yield put({
            type: '_hideModal',
            payload: { type: 'Add' },
          });
          yield put({ type: 'get' });
        } else {
          // message.warn(message);
        }
      } catch (e) {
        //
      }
    },


    *edit({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__edit, payload);
        if (code == 200) {
          msg.success("修改成功");
          yield put({
            type: '_hideModal',
            payload: { type: 'RadioEdit' },
          });
          yield put({ type: 'get' });
        } else {
          msg.warning(msg);
        }
      } catch (e) {
        //
      }
    },


    *del({ payload }, { put, call }) {
      try {
        const { code, message } = yield call(__del, payload);
        if (code === 200) {
          // message.success(msg);
          console.log(code);
          yield put({ type: 'get' });
        } else {
          // message.warn(msg);
        }
      } catch (e) {
        //
      }
    },


    //排班分类
    *getclassinfo(_, { call, put, select }) {
      try {
        const { user, schedule } = yield select(state => state);
        const params = { ...schedule.reqParamsClassInfo };
        const { code, message, data } = yield call(__getclassinfo, params);
        if (code == 200) {
          yield put({
            type: '_appendClassInfoData',
            payload: { list: data },
          });
        } else {
          msg.warning(message);
          yield put({
            type: '_appendClassInfoData',
            payload: {list: {} },
          });
        }
      } catch (e) {
        //
      }
    },
  


  },

  

  reducers: {
    _appendListData(state, action) {
      return {
        ...state,
        listData: action.payload,
      };
    },

    //排班分类
    _appendClassInfoData(state, action) {
      return {
        ...state,
        classInfoData: action.payload,
      };
    },

    // 修改请求参数
    _changeReqParams(state, action) {
      return {
        ...state,
        reqParams: {
          ...state.reqParams,
          ...action.payload,
        },
      };
    },

    _showModal(state, { payload }) {
      return {
        ...state,
        activeItem: payload.item || {},
        [`showModal${payload.type}`]: true,
      };
    },


    _hideModal(state, { payload }) {
      return { ...state, [`showModal${payload.type}`]: false };
    },

    // _showModalRadiolEdit(state, { payload }){
    //   console.log(payload);
    //   return {
    //     ...state,
    //     activeItem: payload.item || {},
    //     [`showModal${payload.type}`]: true,
    //   };
    // },


    // 该页面注销后要清除当前的状态，防止下次进来还是之前的数据
    _clear() {
      return initState;
    },
  },
};
