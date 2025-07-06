/**
 * qiankun 子应用入口文件
 * 兼容 qiankun 2.7.2 的 UMD 格式要求
 */

// 检查是否在 qiankun 环境中
if (window.__POWERED_BY_QIANKUN__) {
  // 在 qiankun 环境下，动态导入主模块
  (async () => {
    try {
      const module = await import('./main.tsx');

      // 将生命周期函数挂载到全局
      window.heorui_app = {
        bootstrap: module.bootstrap,
        mount: module.mount,
        unmount: module.unmount
      };

      console.log('heorui-app entry loaded successfully');
    } catch (error) {
      console.error('Failed to load heorui-app:', error);
    }
  })();
} else {
  // 非 qiankun 环境，直接加载主模块
  import('./main.tsx').catch(err => {
    console.error('Failed to load main module:', err);
  });
}
