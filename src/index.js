import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import 'moment/locale/zh-cn';
import './rollbar';

import userModel from './models/user';
import loginModel from './models/login';
import globalModel from './models/global';

import _sessionStorage from './utils/storage/sessionStorage';

import './index.less';

const isDebuggingInBrowser = process.env.NODE_ENV === 'development' && !!window.navigator.userAgent;

// 加载storage到initialState
const userStorage = _sessionStorage.get('@User');
const loginStorage = _sessionStorage.get('@Login');
const loginState = {
  ...loginModel.state,
  status: loginStorage.status,
};
const userState = {
  ...userModel.state,
};
if (loginStorage.status === 'ok') {
  const { admin, userno } = userStorage.user;
  window.adm = admin || userno; // 设置adm参数
  userState.currentUser = userStorage.user;
}

// 打印日志
// eslint-disable-next-line
const logger = createLogger({
  predicate: () => isDebuggingInBrowser,
  collapsed: true,
  duration: false,
  timestamp: false,
});

// 1. Initialize
const app = dva({
  history: createHistory(),
  // onAction: logger,
  initialState: {
    user: userState,
    login: loginState,
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(globalModel);
app.model(loginModel);
app.model(userModel);

// 4. Router
app.router(require('./router').default);

// 5. 开始
app.start('#root');

export default app._store;  // eslint-disable-line
