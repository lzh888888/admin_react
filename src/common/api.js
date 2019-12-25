/**
 * 接口
 */

import config from './config';

const { platform } = config;

// 是否是开发模式
// const isDev = process.env.NODE_ENV === 'development';

const fixed = `platform=${platform}`; // 固定参数

let host;
const hostID = 1;
switch (hostID) {
  // 线上正式
  case 0:
    host = ``;
    break;
  // 线上测试
  case 1:
    host = `http://192.168.49.232:8035`;
    break;
  // 本地测试
  case 2:
    host = `http://127.0.0.1:8888/api/index.php?`;
    break;
  // 其它
  default:
}

export default {
  // 登录
  login: `${host}&a=login`,

  //护士
  getnurseinfo: `${host}/nurse/list`, //获取护士信息
  addnurseinfo: `${host}/nurse/add`,  //添加护士信息
  delnurseinfo: `${host}/nurse/delete`,  //删除护士信息
  updatenurseinfo: `${host}/nurse/update`, //修改护士信息
  getnurseschedule: `${host}/nurse/schedule/arrange/historyArranges`,  //获取护士排班信息
  updatenurseschedule: `${host}/nurse/schedule/arrange/updateArrange`, //修改护士排班信息
  deletenurseschedule: `${host}/nurse/schedule/arrange/delArrange`, //删除护士排班信息
  addnurseschedulle: `${host}/nurse/schedule/arrange/saveArrange`,  //添加护士排班信息
  getnursescheduleclassinfo: `${host}/nurse/schedule/sort/classInfo`, //获取护士排班分类信息


  //医生
  getdoctorinfo: `${host}/doctor/list`,  //获取医生信息
  adddoctorinfo: `${host}/doctor/add`,  //添加医生信息
  updatedoctorinfo: `${host}/doctor/update`,  //修改医生信息
  deldoctorinfo: `${host}/doctor/delete`,  //删除医生信息

  //user
  getinfo: ``,
  setinfo: ``,

};
