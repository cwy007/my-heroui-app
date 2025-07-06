// qiankun 开发环境入口文件
// 这个文件将在开发环境下被 qiankun 主应用加载

// 检查是否在 qiankun 环境中
if (window.__POWERED_BY_QIANKUN__) {
  // 动态加载主模块
  import('../src/main.tsx').then(module => {
    window.heroui_app = {
      bootstrap: module.bootstrap,
      mount: module.mount,
      unmount: module.unmount
    };
  }).catch(err => {
    console.error('Failed to load heroui-app module:', err);
  });
} else {
  // 非 qiankun 环境，直接加载
  import('../src/main.tsx');
}
