// 兼容 qiankun 2.7.2 的入口文件
// 避免使用 ES 模块的 import/export 语法

(function(global) {
  'use strict';

  // 设置公共路径
  if (window.__POWERED_BY_QIANKUN__) {
    window.__VITE_PUBLIC_PATH__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }

  let root = null;
  const rootDom = document.getElementById("heroui-app");

  // 渲染函数
  function render(props = {}) {
    const { container } = props;
    const targetElement = container
      ? container.querySelector("#subapp")
      : rootDom;

    if (!targetElement) {
      console.error("Target element not found", {
        container,
        subapp: container?.querySelector("#subapp"),
        rootDom,
        qiankun: window.__POWERED_BY_QIANKUN__
      });
      return;
    }

    // 动态加载模块
    if (typeof window.React === 'undefined') {
      console.error('React is not loaded');
      return;
    }

    const basename = window.__POWERED_BY_QIANKUN__ ? '/heroui-app' : '/';

    // 避免重复创建 root
    if (root) {
      root.unmount();
    }

    // 动态导入主应用
    import('./main-render.jsx').then(module => {
      root = module.renderApp(targetElement, basename, props);
    }).catch(err => {
      console.error('Failed to load app:', err);
    });
  }

  // 生命周期函数
  const lifecycle = {
    async bootstrap(props) {
      console.log("heroui-app bootstraped", props);
      if (props) {
        window.systemConfig = props.systemConfig;
        window.mainRequest = props.request;
        window.mainOldRequest = props.oldRequest;
        window.systemOemInfo = props.systemOemInfo;
        window.isOem = props.isOem;
        window.isPrivate = props.isPrivate;
        window.getDisplayConfig = props.getDisplayConfig;
        window.store = props.store;
      }
    },

    async mount(props) {
      console.log("heroui-app mounted", props);
      render(props);
    },

    async unmount(props) {
      console.log("heroui-app unmounted", props);
      if (root) {
        root.unmount();
        root = null;
      }
    }
  };

  // 挂载到全局
  if (window.__POWERED_BY_QIANKUN__) {
    window['heroui-app'] = lifecycle;
  } else {
    // 独立运行
    lifecycle.mount({});
  }

  // 同时兼容 UMD 导出
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lifecycle;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return lifecycle; });
  } else {
    global['heroui-app'] = lifecycle;
  }

})(this);
