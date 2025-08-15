import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
// import DefaultLayout from "@/layouts/default";
import { routes } from "@/config/router";
import DefaultLayout from "@/layouts/default";
// import { Card, CardBody } from "@heroui/card";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="min-h-[calc(100vh-8rem)] flex flex-wrap items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-4xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>websites regardless of your design experience.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div> */}
        <div className="flex flex-wrap gap-4">
          {routes.map((route) => (
            // <Card>
            //   <CardBody className="min-w-fit box-border p-4">
            <Link
              key={route.label}
              href={route.href}
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
                class: "min-w-fit",
              })}
            >
              {route.label}
            </Link>
            //   </CardBody>
            // </Card>
          ))}
        </div>

        {/* <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div> */}

        {/* <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      </section>
    </DefaultLayout>
  );
}
