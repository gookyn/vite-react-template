// 获取cookie
export function getCookie(name: string): string {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split('; ');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (arr[0] === name) {
      return arr[1];
    }
  }
  return '';
}

// time秒 默认30天
export function setCookie(name: string, value: string, time: number = 30 * 24 * 3600): void {
  const exp = new Date();
  exp.setTime(exp.getTime() + time * 1000);
  document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/';
}

// 清除cookie
export function clearCookieByKey(name: string): void {
  setCookie(name, '', -1);
}

// 获取sessionStorage
export function getSession(name: string): string | null {
  return sessionStorage.getItem(name);
}

// 设置sessionStorage
export function setSession(name: string, value: any): void {
  sessionStorage.setItem(name, value);
}

//  删除sessionStorage
export function delSession(name: string): void {
  sessionStorage.removeItem(name);
}

// 获取localStorage
export function getLocalStorage(name: string): string | null {
  return localStorage.getItem(name);
}

// 设置localStorage
export function setLocalStorage(name: string, value: any): void {
  localStorage.setItem(name, value);
}

// 删除localStorage
export function delLocalStorage(name: string): void {
  localStorage.removeItem(name);
}
