/**
 * qiankun 入口文件
 * 使用传统的 script 标签方式而不是 ES 模块
 */
(function() {
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
      console.error("Target element not found");
      return;
    }

    // 动态导入并渲染
    import('./main.tsx').then(module => {
      // 这里可以调用 main.tsx 中的渲染逻辑
      if (module.renderApp) {
        module.renderApp(targetElement, props);
      }
    }).catch(err => {
      console.error('Failed to load main module:', err);
    });
  }

  // qiankun 生命周期函数
  window.heorui_app = {
    bootstrap: async function(props) {
      console.log("heorui-app bootstraped", props);
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

    mount: async function(props) {
      console.log("heorui-app mounted", props);
      render(props);
    },

    unmount: async function(props) {
      console.log("heorui-app unmounted", props);
      if (root) {
        root.unmount();
        root = null;
      }
    }
  };

  // 独立运行时
  if (!window.__POWERED_BY_QIANKUN__) {
    render({});
  }
})();
