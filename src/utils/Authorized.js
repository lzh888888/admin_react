import RenderAuthorized from 'components/Authorized';

/**
 * 定义权限
 * 应用开始时就在这里获取定义好了权限，然后根据用户的权限进行匹配是否允许进入
 * 目前只支持字符串
 * 阅读CheckPermissions.test.js可了解
 */
function getAuthority() {
  return 'ok';
}

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
