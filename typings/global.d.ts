// 声明全局变量
declare module 'global' {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => any;
  }
}
