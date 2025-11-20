"use client";

import React from "react";
import {domAnimation, LazyMotion, m} from "framer-motion";

import MultistepSidebar from "./multistep-sidebar";
import SignUpForm from "./signup-form";
import CompanyInformationForm from "./company-information-form";
import ChooseAddressForm from "./choose-address-form";
import ReviewAndPaymentForm from "./review-and-payment-form";
import MultistepNavigationButtons from "./multistep-navigation-buttons";


/**
 * 这段代码定义了一个名为 variants 的对象，通常用于动画库（如 Framer Motion）中，来描述不同动画状态下元素的样式变化。下面逐项解释：

enter: 是一个函数，接收一个 direction（方向，类型为 number），返回一个对象。这个对象定义了元素进入时的动画初始状态：

y: 垂直位移。如果 direction > 0，则向下偏移 30 像素，否则向上偏移 30 像素。
opacity: 透明度为 0，即完全透明。
center: 是一个对象，定义了元素在动画中间（或“居中”）时的状态：

zIndex: 1: 堆叠顺序较高，显示在上面。
y: 0: 没有垂直位移，回到原位。
opacity: 1: 完全不透明。
exit: 也是一个函数，接收 direction，返回一个对象，定义元素离开时的动画状态：

zIndex: 0: 堆叠顺序降低。
y: 如果 direction < 0，则向下偏移 30 像素，否则向上偏移 30 像素（与 enter 相反）。
opacity: 0: 透明度为 0，逐渐消失。
用途说明：
在 React + Framer Motion 项目中，variants 通常用于 <motion.div variants={variants} />，根据动画阶段（如 enter、center、exit）自动切换对应的样式，实现平滑的进出场动画。

小提示：

这种写法可以让动画根据方向动态变化，常用于轮播图、页面切换等场景。
如果你用的是 TypeScript，建议给 variants 添加类型声明以获得更好的类型检查。
 */
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

export default function Component() {
  const [[page, direction], setPage] = React.useState([0, 0]);

  const paginate = React.useCallback((newDirection: number) => {
    setPage((prev) => {
      const nextPage = prev[0] + newDirection;

      if (nextPage < 0 || nextPage > 3) return prev;

      return [nextPage, newDirection];
    });
  }, []);

  const onChangePage = React.useCallback((newPage: number) => {
    setPage((prev) => {
      if (newPage < 0 || newPage > 3) return prev;
      const currentPage = prev[0];

      return [newPage, newPage > currentPage ? 1 : -1];
    });
  }, []);

  const onBack = React.useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const onNext = React.useCallback(() => {
    paginate(1);
  }, [paginate]);

  const content = React.useMemo(() => {
    let component = <SignUpForm />;

    switch (page) {
      case 1:
        component = <CompanyInformationForm />;
        break;
      case 2:
        component = <ChooseAddressForm />;
        break;
      case 3:
        component = <ReviewAndPaymentForm />;
        break;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={page}
          animate="center"
          className="col-span-12"
          custom={direction}
          exit="exit"
          initial="exit"
          transition={{
            y: {
              ease: "backOut",
              duration: 0.35,
            },
            opacity: {duration: 0.4},
          }}
          variants={variants}
        >
          {component}
        </m.div>
      </LazyMotion>
    );
  }, [direction, page]);

  return (
    <MultistepSidebar
      currentPage={page}
      onBack={onBack}
      onChangePage={onChangePage}
      onNext={onNext}
    >
      <div className="relative flex h-fit w-full flex-col pt-6 text-center lg:h-full lg:justify-center lg:pt-0">
        {content}
        <MultistepNavigationButtons
          backButtonProps={{isDisabled: page === 0}}
          className="hidden justify-start lg:flex"
          nextButtonProps={{
            children: page === 0 ? "Sign Up for Free" : page === 3 ? "Go to Payment" : "Continue",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      </div>
    </MultistepSidebar>
  );
}
