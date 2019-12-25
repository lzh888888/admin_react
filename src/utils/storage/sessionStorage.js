/**
 * sessionStorage
 */

function enabled() {
  return !!window.sessionStorage;
}

function get(key) {
  const data = sessionStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return {};
  }
}

function set(key, data) {
  if (typeof data === 'object') {
    return sessionStorage.setItem(key, JSON.stringify(data));
  } else {
    return null;
  }
}

function remove(key) {
  return sessionStorage.removeItem(key);
}

function clearAll() {
  return sessionStorage.clear();
}

export default { enabled, get, set, remove, clearAll };
