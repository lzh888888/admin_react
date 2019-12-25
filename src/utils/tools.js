// 验证手机号
export const checkPhone = (rule, value, callback) => {
  const regex = /^1[34578]\d{9}$/;
  if (value) {
    if (regex.test(value)) {
      callback();
    } else {
      callback('请输入正确的手机号码！');
    }
  } else {
    callback();
  }
};

// 延时处理
export const delay = time => new Promise(resolve => setTimeout(resolve, time));