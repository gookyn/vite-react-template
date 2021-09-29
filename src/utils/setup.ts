import { setSession } from '@/utils';

setIosInputFocus();
setFontSize();

// 解决ios下输入框点击不唤起软键盘的bug
function setIosInputFocus(): void {
  document.body.addEventListener('click', (e) => {
    const dom = e.target as HTMLElement;
    const { tagName } = dom;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA' || dom.getAttribute('contenteditable') === 'true') {
      dom.focus();
    }
  });
}

// 设置字体
function setFontSize(): void {
  const setRem = () => {
    const deviceWidth = document.documentElement.clientWidth;
    // 获取相对UI稿，屏幕的缩放比例
    const scale = deviceWidth / 750;
    // 动态设置html的font-size
    document.querySelector('html')!.style.fontSize = 100 * scale + 'px';
  };

  setRem();

  // 窗口改变重新设置
  window.onresize = function () {
    setRem();
  };
}
