import "./public-path.js";
import React from "react";
import { createRoot } from "react-dom/client"; // 恢复 React 18 API
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

let root: any = null; // 用于追踪 React 18 root 实例

const rootDom = document.getElementById("heroui-app");

const render = (props: any = {}) => {
  console.log("Rendering heroui-app with props:", props);
  const { container } = props;
  const targetElement = container
    ? container.querySelector("#subapp")
    : rootDom;
  console.log("Target element for subapp:", container.querySelector("#subapp"));
  console.log("Target element for heroui-app:", document.getElementById("heroui-app"));

  if (!targetElement) {
    console.error("Target element not found", {
      container,
      subapp: container?.querySelector("#subapp"),
      rootDom,
      qiankun: (window as any).__POWERED_BY_QIANKUN__
    });
    return;
  }

  // 根据是否在 qiankun 环境下设置不同的 basename
  const basename = (window as any).__POWERED_BY_QIANKUN__ ? '/heroui-app' : '/';

  // 使用 React 18 的渲染 API
  if (!root) {
    root = createRoot(targetElement);
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// 独立运行时渲染
// if (!(window as any).__POWERED_BY_QIANKUN__) {
//   render({});
// }

// qiankun 生命周期函数
// export async function bootstrap(props: any) {
//   (window as any).systemConfig = props.systemConfig;
//   (window as any).mainRequest = props.request;
//   (window as any).mainOldRequest = props.oldRequest;
//   (window as any).systemOemInfo = props.systemOemInfo;
//   (window as any).isOem = props.isOem;
//   (window as any).isPrivate = props.isPrivate;
//   (window as any).getDisplayConfig = props.getDisplayConfig;
//   (window as any).store = props.store;
//   console.log("heroui-app bootstraped"); // 修正应用名
// }

export async function mount(props: any) {
  console.log("heroui-app mounted", props); // 修正应用名
  render(props);
}

// export async function unmount(props: any) {
//   const container = props.container
//     ? props.container.querySelector("#subapp")
//     : rootDom;

//   if (container && root) {
//     // 使用 React 18 的卸载 API
//     root.unmount();
//     root = null;
//   }
// }
