const avatars = [
  'http://img4.imgtn.bdimg.com/it/u=1308784673,3680939805&fm=27&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=1740012619,4009379465&fm=27&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=3431126193,4091279037&fm=27&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=777526735,3047272424&fm=27&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=3259438136,639314966&fm=200&gp=0.jpg',
];

export default [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '张三',
      avatar: avatars[0],
    },
    product: {
      name: 'xx发动机',
    },
    template: '修改了 @{product} 的标题，需要审批',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '李四',
      avatar: avatars[4],
    },
    group: {
      name: 'xxkai',
      link: '',
    },
    template: '申请退出 @{group} 工作组',
  },
];

