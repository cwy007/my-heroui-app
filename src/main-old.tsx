// 动态设置公共路径（qiankun 要求）
if ((window as any).__POWERED_BY_QIANKUN__) {
  (window as any).__VITE_PUBLIC_PATH__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 声明模块变量
let ReactModule: any;
let ReactDOMModule: any;
let BrowserRouterModule: any;
let AppModule: any;
let ProviderModule: any;

// 动态加载所有模块
async function loadModules() {
  if (!ReactModule) {
    const reactModule = await import("react");
    ReactModule = reactModule.default;
  }
  if (!ReactDOMModule) {
    const reactDOMModule = await import("react-dom/client");
    ReactDOMModule = reactDOMModule;
  }
  if (!BrowserRouterModule) {
    const routerModule = await import("react-router-dom");
    BrowserRouterModule = routerModule.BrowserRouter;
  }
  if (!AppModule) {
    const appModule = await import("./App.tsx");
    AppModule = appModule.default;
  }
  if (!ProviderModule) {
    const providerModule = await import("./provider.tsx");
    ProviderModule = providerModule.Provider;
  }
  // 导入样式
  await import("@/styles/globals.css");
}

let root: any = null;

const render = async (props: any = {}) => {
  await loadModules();

  const { container } = props;

  // qiankun 环境下使用主应用传入的容器，独立运行时使用 heroui-app
  const targetElement = container
    ? container.querySelector("#subapp") // 主应用使用 #subapp 容器
    : document.getElementById("heroui-app"); // 独立运行时使用 heroui-app

  if (!targetElement) {
    console.error("Target element not found");
    return;
  }

  // 根据是否在 qiankun 环境下设置不同的 basename
  const basename = (window as any).__POWERED_BY_QIANKUN__ ? '/heroui-app' : '/';

  root = ReactDOMModule.createRoot(targetElement);
  root.render(
    ReactModule.createElement(ReactModule.StrictMode, null,
      ReactModule.createElement(BrowserRouterModule, { basename },
        ReactModule.createElement(ProviderModule, null,
          ReactModule.createElement(AppModule)
        )
      )
    )
  );
};

// 独立运行时渲染
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

// qiankun 生命周期函数 - 挂载到全局对象而非使用 ES 模块导出
const lifecycleFunctions = {
  async bootstrap(props: any) {
    await loadModules();
    console.log("heorui-app bootstraped", props);
  },

  async mount(props: any) {
    console.log("heorui-app mounted", props);

    // 将主应用传递的 props 挂载到全局对象上
    if (props) {
      (window as any).store = props.store;
      (window as any).systemConfig = props.systemConfig;
      (window as any).mainRequest = props.request;
      (window as any).mainOldRequest = props.oldRequest;
      (window as any).systemOemInfo = props.systemOemInfo;
      (window as any).isOem = props.isOem;
      (window as any).isPrivate = props.isPrivate;
      (window as any).getDisplayConfig = props.getDisplayConfig;
    }

    await render(props);
  },

  async unmount(_props: any) {
    if (root) {
      root.unmount();
      root = null;
    }
  }
};

// 挂载到全局对象
(window as any).bootstrap = lifecycleFunctions.bootstrap;
(window as any).mount = lifecycleFunctions.mount;
(window as any).unmount = lifecycleFunctions.unmount;

// 导出给构建系统
export const { bootstrap, mount, unmount } = lifecycleFunctions;
