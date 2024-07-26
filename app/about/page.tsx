"use client";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Skeleton } from "@nextui-org/react";
import { Remark } from "react-remark";

export default function AboutPage() {
  const [data, setData] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Sumanth1908/Sumanth1908/master/README.md"
    )
      .then((res) => res.text())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="prose">
        <Skeleton isLoaded={!isLoading} className="rounded-lg content">
          <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
        </Skeleton>
      </div>
      <div></div>
    </div>
  );
}
