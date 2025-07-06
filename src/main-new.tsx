import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./public-path.js";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

let root: any = null;

const rootDom = document.getElementById("heroui-app");

const render = (props: any = {}) => {
  const targetElement = props.container
    ? props.container.querySelector("#subapp")
    : rootDom;

  if (!targetElement) {
    console.error("Target element not found");
    return;
  }

  // 根据是否在 qiankun 环境下设置不同的 basename
  const basename = (window as any).__POWERED_BY_QIANKUN__ ? '/heroui-app' : '/';

  root = ReactDOM.createRoot(targetElement);
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
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

// qiankun 生命周期函数
export async function bootstrap(props: any) {
  (window as any).systemConfig = props.systemConfig;
  (window as any).mainRequest = props.request;
  (window as any).mainOldRequest = props.oldRequest;
  (window as any).systemOemInfo = props.systemOemInfo;
  (window as any).isOem = props.isOem;
  (window as any).isPrivate = props.isPrivate;
  (window as any).getDisplayConfig = props.getDisplayConfig;
  (window as any).store = props.store;
  console.log("heorui-app bootstraped");
}

export async function mount(props: any) {
  console.log("heorui-app mounted", props);
  render(props);
}

export async function unmount(props: any) {
  const container = props.container
    ? props.container.querySelector("#subapp")
    : rootDom;

  if (root && container) {
    root.unmount();
    root = null;
  }
}
