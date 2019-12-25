/**
 * localStorage
 */

function enabled() {
  return !!window.localStorage;
}

function get(key) {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return {};
  }
}

function set(key, data) {
  if (typeof data === 'object') {
    return localStorage.setItem(key, JSON.stringify(data));
  } else {
    return null;
  }
}

function remove(key) {
  return localStorage.removeItem(key);
}

function clearAll() {
  return localStorage.clear();
}

export default { enabled, get, set, remove, clearAll };
