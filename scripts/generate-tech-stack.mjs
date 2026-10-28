#!/usr/bin/env node

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { repositoryRoot } from "./lib/config.mjs";

const ICONS_CONFIG = [
  // Row 1 (15 icons: Minecraft and Command Block first, then C++ onwards)
  "minecraft", "commandblock", "cpp", "windows", "discord", "ai", "ps", "pr", "ae", "figma", "gitlab", "vscode", "html", "nodejs", "js",
  // Row 2 (15 icons)
  "vite", "py", "css", "git", "github", "dotnet", "java", "mysql", "postgres", "docker", "php", "laravel", "bootstrap", "react", "wordpress",
  // Row 3 (13 icons: C#, then Roblox and Roblox Studio)
  "dart", "flutter", "androidstudio", "unity", "blender", "cs", "roblox", "robloxstudio", "mongodb", "postman", "aws", "cloudflare", "linux"
];

// Icons to fetch from skillicons
const SKILLICONS_NAMES = [
  "cpp", "windows", "discord", "ai", "ps", "pr", "ae", "figma", "gitlab", "vscode", "html", "nodejs", "js",
  "vite", "py", "css", "git", "github", "dotnet", "java", "mysql", "postgres", "docker", "php", "laravel", "bootstrap", "react", "wordpress",
  "dart", "flutter", "androidstudio", "unity", "blender", "cs", "robloxstudio", "mongodb", "postman", "aws", "cloudflare", "linux"
];

const CUSTOM_ICONS = {
  minecraft: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="#1B1F2A" rx="60"/>
    <g transform="translate(38, 38)">
      <!-- Top Face (Green Grass) -->
      <polygon points="90,10 170,50 90,90 10,50" fill="#5C8E32"/>
      <polygon points="90,14 162,50 90,86 18,50" fill="#71A740"/>
      <polygon points="90,20 148,50 90,78 32,50" fill="#86C14B"/>
      <!-- Left Face (Dirt + Grass Hang) -->
      <polygon points="10,50 90,90 90,175 10,135" fill="#866043"/>
      <polygon points="10,50 90,90 90,115 72,106 65,116 48,102 38,118 20,104 10,112" fill="#5C8E32"/>
      <polygon points="12,52 88,90 88,112 72,104 65,113 48,100 38,115 20,102 12,108" fill="#4D772A"/>
      <!-- Right Face (Shadow Dirt + Grass Hang) -->
      <polygon points="90,90 170,50 170,135 90,175" fill="#573D26"/>
      <polygon points="90,90 170,50 170,72 155,78 148,68 132,84 120,72 108,86 90,115" fill="#4D772A"/>
      <polygon points="90,90 168,52 168,70 155,76 148,66 132,82 120,70 108,84 90,112" fill="#3D5F21"/>
    </g>
  </svg>`,

  commandblock: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="#1B1F2A" rx="60"/>
    <g transform="translate(38, 38)">
      <!-- Top Face (Command Block Copper) -->
      <polygon points="90,10 170,50 90,90 10,50" fill="#C98158"/>
      <polygon points="90,22 150,50 90,78 30,50" fill="#9C5E3B"/>
      <!-- Center top panel dot -->
      <circle cx="90" cy="50" r="14" fill="#E6A880"/>
      <circle cx="90" cy="50" r="8" fill="#55FFD8"/>
      <!-- Left Face -->
      <polygon points="10,50 90,90 90,175 10,135" fill="#B06D46"/>
      <polygon points="32,76 72,96 72,142 32,122" fill="#4B3322"/>
      <polygon points="36,80 68,96 68,138 36,122" fill="#D98E64"/>
      <!-- Glowing core indicator on front face -->
      <polygon points="46,94 58,100 58,118 46,112" fill="#171C2B"/>
      <circle cx="52" cy="106" r="6" fill="#55FFD8"/>
      <!-- Right Face (Shadowed) -->
      <polygon points="90,90 170,50 170,135 90,175" fill="#7D492B"/>
      <polygon points="108,96 148,76 148,122 108,142" fill="#382417"/>
      <polygon points="112,96 144,80 144,122 112,138" fill="#8F5431"/>
      <!-- Right Glowing indicator -->
      <polygon points="122,100 134,94 134,112 122,118" fill="#171C2B"/>
      <circle cx="128" cy="106" r="6" fill="#55FFD8"/>
    </g>
  </svg>`,

  roblox: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="#111726" rx="60"/>
    <g transform="translate(48, 48) scale(6.666)">
      <path fill="#FFFFFF" d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z"/>
    </g>
  </svg>`
};

async function buildBanner(theme = "dark") {
  const res = await fetch(`https://skillicons.dev/icons?i=${SKILLICONS_NAMES.join(",")}&theme=${theme}`);
  const svgText = await res.text();

  const iconMap = {};
  // Match full <svg>...</svg> inside each <g transform="translate(...)">
  const regex = /<g transform="translate\(\d+,\s*\d+\)">\s*(<svg[\s\S]*?<\/svg>)\s*<\/g>/g;
  let match;
  let idx = 0;
  while ((match = regex.exec(svgText)) !== null) {
    if (idx < SKILLICONS_NAMES.length) {
      iconMap[SKILLICONS_NAMES[idx]] = match[1].trim();
      idx++;
    }
  }

  for (const [key, val] of Object.entries(CUSTOM_ICONS)) {
    iconMap[key] = val;
  }

  const cols = 15;
  const stepX = 300;
  const stepY = 300;

  let innerContent = "";
  ICONS_CONFIG.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * stepX;
    const y = row * stepY;
    const iconSvg = iconMap[name] || "";
    innerContent += `\n    <g transform="translate(${x}, ${y})">\n      ${iconSvg}\n    </g>`;
  });

  const totalRows = Math.ceil(ICONS_CONFIG.length / cols);
  const viewBoxWidth = cols * stepX - 44;
  const viewBoxHeight = totalRows * stepY - 44;
  const renderWidth = (viewBoxWidth / 256) * 48;
  const renderHeight = (viewBoxHeight / 256) * 48;

  return `<!-- Generated Tech Stack SVG with Minecraft, Command Block, Roblox & Roblox Studio -->
<svg width="${renderWidth}" height="${renderHeight}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  ${innerContent}
</svg>
`;
}

async function main() {
  console.log("Generating dark and light Tech Stack SVGs with 43 icons...");
  const darkSvg = await buildBanner("dark");
  const lightSvg = await buildBanner("light");

  const assetsDir = resolve(repositoryRoot, "assets");
  const webPublicAssetsDir = resolve(repositoryRoot, "website", "public", "assets");

  mkdirSync(assetsDir, { recursive: true });
  mkdirSync(webPublicAssetsDir, { recursive: true });

  // Save to repo assets for GitHub README
  writeFileSync(resolve(assetsDir, "tech-stack-dark.svg"), darkSvg, "utf8");
  writeFileSync(resolve(assetsDir, "tech-stack-light.svg"), lightSvg, "utf8");

  // Save to website public assets for web app
  writeFileSync(resolve(webPublicAssetsDir, "tech-stack-dark.svg"), darkSvg, "utf8");
  writeFileSync(resolve(webPublicAssetsDir, "tech-stack-light.svg"), lightSvg, "utf8");

  console.log("Successfully generated all tech stack SVG assets!");
}

main().catch((err) => {
  console.error("Failed to generate tech stack SVG:", err);
  process.exit(1);
});
