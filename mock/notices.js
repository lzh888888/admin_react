const avatars = [
  'http://img4.imgtn.bdimg.com/it/u=1308784673,3680939805&fm=27&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=1740012619,4009379465&fm=27&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=3431126193,4091279037&fm=27&gp=0.jpg',
  'http://img3.imgtn.bdimg.com/it/u=777526735,3047272424&fm=27&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=3259438136,639314966&fm=200&gp=0.jpg',
];

const notices = (req, res) => {
  res.json([{
    id: '000000001',
    avatar: avatars[0],
    title: '你收到了 6 份合同',
    datetime: '2017-12-07',
    type: '通知',
  }, {
    id: '000000003',
    avatar: avatars[1],
    title: '代理商的合同',
    datetime: '2017-11-07',
    read: true,
    type: '通知',
  }, {
    id: '000000004',
    avatar: avatars[2],
    title: '其它',
    datetime: '2017-08-07',
    type: '通知',
  }, {
    id: '000000006',
    avatar: avatars[3],
    title: '张三 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: '消息',
  }, {
    id: '000000007',
    avatar: avatars[4],
    title: '李四 回复了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-11-07',
    type: '消息',
  }, {
    id: '000000009',
    title: '****项目',
    description: '任务需要在 2017-12-12 20:00 启动',
    extra: '未开始',
    status: 'todo',
    type: '待办',
  }, {
    id: '000000010',
    title: '会员即将到期',
    description: '会员于 2017-12-19 到期，请及时续费',
    extra: '马上到期',
    status: 'urgent',
    type: '待办',
  }, {
    id: '000000011',
    title: '****系统',
    description: '指派王五于 2017-12-25 前完成更新并发布',
    extra: '已耗时 5 天',
    status: 'doing',
    type: '待办',
  }, {
    id: '000000012',
    title: '访问***********公司xxx',
    description: '需要你 2017-12-08 15:00 到绿地广场',
    extra: '进行中',
    status: 'processing',
    type: '待办',
  }]);
};

export default notices;
