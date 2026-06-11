# 儿童保护法律研究平台

非营利性法律研究、学术文献索引与普法导读网站。聚焦儿童权益保护、追诉时效改革、刑事责任年龄等议题，为学者、法律从业者及公众提供国际前沿研究的中文索引与导读。

线上地址：[pursuing-justice.com](https://pursuing-justice.com)

## 功能概览

- **文献导读** — 按主题分类浏览学术文献，支持站内搜索与 Google Scholar 外链
- **检索与翻译指南** — 文献检索与翻译的方法指引（筹备中）
- **关于与反馈** — 平台介绍与用户反馈表单
- **管理后台** — 文献上传、访问统计与反馈查看（需管理员密钥）

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router） |
| 样式 | Tailwind CSS 4 |
| 数据库 | Cloudflare D1（SQLite） |
| 部署 | Cloudflare Pages（`@cloudflare/next-on-pages`） |

## 本地开发

### 环境要求

- Node.js 20+
- npm

### 安装与启动

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

本地 `next dev` 模式下 D1 绑定不可用，首页文章列表为空属正常现象。如需完整联调，请使用下方 Cloudflare 本地开发流程。

### 环境变量

在项目根目录创建 `.env.local`：

```env
ADMIN_API_KEY=你的管理员密钥
```

## 数据库

项目使用 Cloudflare D1，迁移文件位于 `migrations/`。

```bash
# 本地 D1 迁移
npm run db:migrate:local

# 远程 D1 迁移（生产环境）
npm run db:migrate:remote
```

### 数据表

| 表名 | 用途 |
|------|------|
| `articles` | 文献内容（标题、摘要、关键词等） |
| `feedback` | 用户反馈 |
| `visit_logs` | 页面访问记录 |

## 部署到 Cloudflare Pages

```bash
# 1. 构建（输出到 .vercel/output/static）
npm run pages:build

# 2. 通过 Cloudflare Dashboard 或 Git 集成自动部署
#    构建命令：npm run pages:build
#    输出目录：.vercel/output/static
```

`wrangler.toml` 中已配置 D1 绑定与站点 URL，部署前请确认 `database_id` 与 Cloudflare 控制台一致。

## 管理后台

访问 `/admin`，使用 `ADMIN_API_KEY` 登录后可：

- 上传新文献（Markdown 格式）
- 查看访问日志与地理分布
- 查看用户反馈

上传接口：`POST /api/admin/upload-article`

## 项目结构

```
app/
  (site)/          # 公开页面（首页、指南、关于）
  admin/           # 管理后台
  api/             # API 路由
components/        # React 组件
lib/               # 业务逻辑、数据库、工具函数
migrations/        # D1 数据库迁移
types/             # TypeScript 类型定义
```

## 研究主题

平台目前涵盖三个方向：

1. **追诉时效改革** — 涉童特殊类型案件追诉时效的国际比较与立法研究
2. **刑事责任年龄** — 未成年人刑事责任年龄的域外经验与学理探讨
3. **儿童保护政策** — 儿童权益保护制度、预防机制与司法实践

## 免责声明

本站为非营利学术索引平台，所提供内容不构成法律意见或专业咨询。如需具体法律帮助，请咨询具有执业资格的专业律师。
