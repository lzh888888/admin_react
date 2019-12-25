import { isUrl } from '../utils/utils';

const menuData = [{
  name: '主页',
  icon: 'home',
  path: 'home',
}, 

{
  name: '护士',
  icon: 'schedule',
  path: 'nurse',
  children: [{
    name: '日程安排',
    path: 'schedule'
  },{
    name: '护士信息',
    path: 'nurseinfo',
  }
],
},

{
  name: '医生',
  icon: 'schedule',
  path: 'doctor',
  children: [{
    name: '日程安排',
    path: 'doctorschedule'
  },{
    name: '医生信息',
    path: 'doctorinfo',
  }
  ]
},

{
  name: '用户信息',
  icon: 'user',
  path: 'userinfo',
}

];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

