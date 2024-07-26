import { AppCard } from "@/components/app-card";
import { title } from "@/components/primitives";
import { Spacer } from "@nextui-org/react";
import React from "react";
export default function Apps() {
  const list = [
    {
      title: "Markdown Preview",
      img: "/images/markdown-icon.png",
      route: "/apps/markdown",
      description: "Markdown Live Preview",
    },
  ];
  return (
    <React.Fragment>
      <section>
        <h1 className={title()}>Popular</h1>
        <Spacer y={4} />
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {list.map((item, index) => (
            <AppCard
              title={item.title}
              description={item.description}
              key={index}
              route={item.route}
              image={item.img}
            />
          ))}
        </div>
      </section>
      <section></section>
    </React.Fragment>
  );
}
