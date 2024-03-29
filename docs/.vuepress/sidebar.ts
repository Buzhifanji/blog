import fs from "fs";
import { sidebar, SidebarItem } from "vuepress-theme-hope";

function readFileNames(path: string): SidebarItem[] {
  const result: SidebarItem[] = [];
  try {
    const files = fs.readdirSync(`./docs/${path}`);
    files.forEach((file) => {
      result.push({
        link: `/${path}/${file}`,
        text: file.replace(".md", ""),
      });
    });
  } catch (err) {
    console.log("读取文件错误：", err.message);
  }
  return result;
}
export default sidebar({
  "/computer-systems/": [
    {
      text: "深入理解计算机系统",
      icon: "note",
      prefix: "/computer-systems/",
      children: readFileNames("computer-systems"),
    },
  ],
  "/design-pattern/": [
    {
      text: "SOLID原则",
      icon: "note",
      prefix: "/design-pattern/",
      children: readFileNames("design-pattern/SOLID"),
    },
  ],
});
// export default sidebar([
//   {
//     text: "深入理解计算机系统",
//     icon: "note",
//     prefix: "/computer-systems/",
//     children: readFileNames("computer-systems"),
//   },
//   {
//     text: "数组",
//     icon: "note",
//     prefix: "/array/",
//     children: readFileNames("array"),
//   },
// ]);
