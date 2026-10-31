#!/usr/bin/env node

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { repositoryRoot } from "./lib/config.mjs";

const ICONS_CONFIG = [
  // Row 1 (12 icons: Desktop OS, Community, Design & Video Editing with KineMaster before CapCut, Frontend Core)
  "windows", "discord", "ai", "ps", "ae", "kinemaster", "capcut", "figma", "vscode", "html", "css", "js",
  // Row 2 (11 icons: Backend Languages, Frameworks, CMS, Databases, Container, VCS, API, 3D/Game Engines, OS)
  "php", "laravel", "wordpress", "mysql", "mongodb", "docker", "github", "postman", "unity", "blender", "linux"
];

// Icons to fetch from skillicons (21 icons)
const SKILLICONS_NAMES = ICONS_CONFIG.filter(
  (name) => !["kinemaster", "capcut"].includes(name)
);

const KM_PATH =
  "M 132.29162,1.2480827e-5 A 132.29166,132.29166 0 1 0 264.58332,132.29168 132.23426,132.23426 0 0 0 132.29162,1.2480827e-5 Z m 0,14.957457519173 c 8.61276,-0.602895 16.07715,6.875834 16.07715,16.062755 A 16.077114,16.077114 0 1 1 132.29162,14.90005 Z M 36.848131,117.34858 c -9.18692,0 -16.665651,-7.47873 -16.077114,-16.07711 a 16.077114,16.077114 0 1 1 16.077114,16.07711 z M 72.50487,229.51514 A 16.435977,16.435977 0 0 1 56.427761,213.4524 16.077114,16.077114 0 1 1 72.50487,229.51514 Z m 93.51999,-43.79577 a 10.737215,10.737215 0 0 1 -8.06728,-3.5743 l -36.97734,-40.60903 h -4.82313 v 33.33131 a 10.923824,10.923824 0 0 1 -21.8333,0 V 86.314016 a 10.923824,10.923824 0 0 1 21.8333,0 v 33.331294 h 4.56475 l 33.01549,-39.015704 a 10.938179,10.938179 0 1 1 16.59389,14.11053 l -30.14459,35.584964 33.79065,37.09218 a 10.852052,10.852051 0 0 1 -8.06728,18.20161 z m 25.53678,43.79577 c -9.20127,0 -16.68,-7.46437 -16.0771,-16.06274 a 16.077114,16.077114 0 1 1 16.0771,16.06274 z m 52.25062,-128.84656 a 16.077114,16.077114 0 1 1 -16.07712,-16.062764 16.00534,16.00534 0 0 1 16.01969,16.005344 z";

function getCustomIcons(theme = "dark") {
  const isDark = theme === "dark";
  const bg = isDark ? "#242938" : "#EEF2F6";
  const brandDarkBg = "#111726";
  const brandDarkIconColor = "#FFFFFF";

  return {
    kinemaster: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="km-grad-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fc0148" />
          <stop offset="100%" stop-color="#fd7f30" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" fill="${bg}" rx="60"/>
      <g transform="translate(38, 38) scale(0.68)">
        <circle cx="132.29" cy="132.29" r="131" fill="#ffffff" />
        <path fill="url(#km-grad-${theme})" d="${KM_PATH}" />
      </g>
    </svg>`,

    capcut: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="${brandDarkBg}" rx="60"/>
      <g transform="translate(48, 48) scale(6.666)">
        <path fill="${brandDarkIconColor}" fill-rule="evenodd" d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z"/>
      </g>
    </svg>`
  };
}

function processIcon(name, rawSvg, theme) {
  const isDark = theme === "dark";
  const neutralBg = isDark ? "#242938" : "#EEF2F6";
  const strokeColor = isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)";
  const strokeWidth = "5";

  let svg = rawSvg;

  // 1. Replace skillicons off-white #F4F2ED with a visible, elegant neutral card background
  svg = svg.replaceAll("#F4F2ED", neutralBg);

  // 2. For any svg without a root 256x256 rounded rect, ensure background rect exists
  if (!svg.includes('rx="60"')) {
    svg = svg.replace(
      /(<svg[^>]*>)/,
      `$1<rect width="256" height="256" rx="60" fill="${neutralBg}"/>`
    );
  }

  // 3. Add the crisp border outline ("garis tepi kotak") on top of every icon for uniform consistency
  const borderOverlay = `<rect x="2.5" y="2.5" width="251" height="251" rx="58" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
  svg = svg.replace(/<\/svg>\s*$/, `${borderOverlay}</svg>`);

  return svg;
}

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

  const customIcons = getCustomIcons(theme);
  for (const [key, val] of Object.entries(customIcons)) {
    iconMap[key] = val;
  }

  const cols = 12;
  const stepX = 300;
  const stepY = 300;

  let innerContent = "";
  ICONS_CONFIG.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * stepX;
    const y = row * stepY;
    const rawIconSvg = iconMap[name] || "";
    const processedSvg = processIcon(name, rawIconSvg, theme);
    innerContent += `\n    <g transform="translate(${x}, ${y})">\n      ${processedSvg}\n    </g>`;
  });

  const totalRows = Math.ceil(ICONS_CONFIG.length / cols);
  const viewBoxWidth = cols * stepX - 44;
  const viewBoxHeight = totalRows * stepY - 44;
  const renderWidth = (viewBoxWidth / 256) * 48;
  const renderHeight = (viewBoxHeight / 256) * 48;

  return `<!-- Generated Tech Stack SVG with uniform background cards, borders and responsive dark/light support -->
<svg width="${renderWidth}" height="${renderHeight}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  ${innerContent}
</svg>
`;
}

async function main() {
  console.log("Generating dark and light Tech Stack SVGs with 23 icons...");
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
