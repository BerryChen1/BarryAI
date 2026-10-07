# BarryC 个人作品集

项目源码包：根目录包含 `src/`、`public/`、`index.html`、`package.json`。使用当前 Node.js LTS 和 npm。

## 本地开发

```sh
npm ci
npm run dev
```

默认访问 `http://localhost:3000/`。网站不需要 Gemini API Key。

## 构建与正式运行

```sh
npm run lint
npm test
npm run build
npm start
```

`npm start` 自动使用生产模式。托管平台可以通过环境变量设置 `PORT`（默认 3000）和 `HOST`（默认 `0.0.0.0`）。构建后的网页在 `dist/`，服务端在 `build/server.cjs`，服务端文件不会公开为静态资源。

服务启动后，可运行 `node scripts/verify-production.mjs http://localhost:3000` 检查静态文件、视频分段请求、代理白名单及缓存响应。该检查只发送读取请求；视频代理检查需要能够访问原有 R2 视频域名。

只使用静态托管时，上传 `dist/` 内的内容，并让 `index.html` 位于网站根目录。静态托管没有视频代理接口，旧视频使用原有 R2 直连地址；需要视频代理时使用上述 Node 服务。

## 资源

图片和页面字体保存在 `public/`。新增 AI Skill 项目的图片、封面与 5 个视频位于 `public/projects/ai-video-workflow/`。部分旧视频仍保留 R2 地址。

大尺寸原图保留供放大查看，正文网格使用 `*-display.webp`。不要只根据文件大小再次压缩较长的低码率视频。

玄夜的中文字体按页面实际文字生成子集；如果添加新文字，需要运行 `scripts/localize_google_fonts.py` 更新字体（Python、fontTools）。字体来源及许可证保存在 `public/fonts/`。

打包源码时包含 `src/`、`public/`、`assets/`、`scripts/` 及根目录配置文件；不需要打包 `node_modules/`、`dist/`、`build/`、`.git/` 或个人环境密钥。
