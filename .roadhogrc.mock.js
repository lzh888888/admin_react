import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

import partner from './mock/partner';
import notices from './mock/notices';
import salesType from './mock/salesType';
import activities from './mock/activities';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/partner': partner, // 合作伙伴
  'GET /api/notices': notices, // 消息
  'GET /api/sales_type': salesType, // 销售类型
  'GET /api/activities': activities, // 动态
};

export default noProxy ? {} : delay(proxy, 1000);
