"use client";

import React from "react";
import {Breadcrumbs, BreadcrumbItem, Button} from "@heroui/react";
import DefaultLayout from "@/layouts/default";

import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";
import cartItems from "./cart-items";

export default function Component() {
  return (
    <DefaultLayout>
      <div className="flex min-h-screen w-full flex-col items-center justify-start bg-background px-4 py-8">
        <section className="flex w-full max-w-5xl flex-col lg:flex-row lg:gap-8">
          {/* Checkout Form */}
          <div className="w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-medium">Shopping Cart</h1>
              <Breadcrumbs>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Shoes Category</BreadcrumbItem>
                <BreadcrumbItem>My Shopping Cart</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <CheckoutForm />
          </div>
          {/* Order Summary */}
          <div className="w-full rounded-medium bg-content2 px-2 py-4 dark:bg-content1 md:px-6 md:py-8 lg:w-[340px] lg:flex-none">
            <OrderSummary items={cartItems} />
            <div className="mt-4">
              <Button fullWidth color="primary" radius="sm" size="lg">
                Checkout
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
