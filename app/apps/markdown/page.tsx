"use client";
import React from "react";
import { title } from "@/components/primitives";
import {
  Spacer,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import { PluggableList } from "react-markdown/lib";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { unified } from "unified";
import markdown from "remark-parse";
import docx from "remark-docx";
import pdf from "remark-pdf";
import { saveAs } from "file-saver";

export const MarkDownPage = () => {
  /**
   * Export Options
   */
  const allExportOptions = [
    { key: "pdf", label: "PDF" },
    { key: "docx", label: "DOCX" },
  ];
  /**
   * Allowed Plugins
   */
  const allowedPlugins = [
    { key: "gfm", label: "GFM", description: "GitHub flavored markdown" },
    // { key: "math", label: "Math", description: "Support a math syntax" },
  ];
  /**
   * Markdown Docx Processor
   */
  const [selectedPlugins, setSelectedPlugins] = React.useState<Set<string>>(
    new Set([])
  );
  /**
   * docx processor for export
   */
  const docxProcessor = unified().use(markdown).use(docx, { output: "blob" });
  /**
   * pdf processor for export
   */
  const pdfProcessor = unified().use(markdown).use(pdf, { output: "blob" });

  const [textInput, setTextInput] = React.useState<string>("");
  const pluginMap = {
    gfm: remarkGfm,
    math: remarkMath,
  };

  const getPlugins = (
    keys: Set<string>,
    pluginMap: Record<string, any>
  ): PluggableList => {
    let pluggableList: PluggableList = [];

    keys.forEach((key) => {
      if (pluginMap[key]) {
        pluggableList.push(pluginMap[key]);
      }
    });
    return pluggableList;
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedPlugins).join(", ").replaceAll("_", " "),
    [selectedPlugins]
  );

  const handleSelectionChange = React.useCallback((keys: SharedSelection) => {
    console.log(keys);
    if (keys === "all") {
      // Handle 'all' selection
      setSelectedPlugins(new Set(["all"]));
    } else if (typeof keys === "object") {
      // Handle object selection
      const newKeys = new Set<string>();
      if (keys.anchorKey) newKeys.add(keys.anchorKey);
      if (keys.currentKey) newKeys.add(keys.currentKey);
      setSelectedPlugins(newKeys);
    } else {
      // Handle string selection
      setSelectedPlugins(new Set([keys]));
    }
  }, []);

  const exportToFile = (option: React.Key) => {
    (async (opt) => {
      if (opt === "docx") {
        const doc = await docxProcessor.process(textInput);
        const blob: any = await doc.result;
        saveAs(blob, `markdown-${Date.now()}.docx`);
      } else if (option === "pdf") {
        const doc = await pdfProcessor.process(textInput);
        const blob: any = await doc.result;
        saveAs(blob, `markdown-${Date.now()}.pdf`);
      }
    })(option);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className={title()}>Live Markdown Preview</h1>
      <Spacer y={2} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                Additional Options
                <div>{selectedValue}</div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={selectedPlugins}
              disallowEmptySelection={false}
              onSelectionChange={setSelectedPlugins}
            >
              {allowedPlugins.map((p) => (
                <DropdownItem key={p.key} description={p.description}>
                  {p.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Spacer />
          <div>
            <Textarea
              key="input-view"
              variant="bordered"
              description="Enter markdown text to render"
              classNames={{
                base: "w-full",
                input: "min-h-[50vh] max-h-[50vh]",
              }}
              value={textInput}
              onValueChange={setTextInput}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex gap-1 items-center">
            <Button>Copy</Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  Export
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(option) => exportToFile(option)}>
                {allExportOptions.map((option) => (
                  <DropdownItem key={option.key}>{option.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Spacer />
          <div className="block border-2 px-3 py-2 w-full container rounded-lg border border-gray-300">
            <div className="overflow-y-auto min-h-[50vh] max-h-[50vh]">
              <div className="prose" id="markdown-container">
                <Markdown
                  remarkPlugins={getPlugins(selectedPlugins, pluginMap)}
                >
                  {textInput}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarkDownPage as default };
