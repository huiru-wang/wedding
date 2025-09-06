# 💒 婚礼邀请网站

一个现代化、响应式的婚礼邀请网站，采用 Next.js 15 + React 19 + TypeScript + Tailwind CSS 构建，提供优雅的婚礼信息展示和交互体验。

## ✨ 功能特色

### 🎯 核心功能
- **倒计时展示** - 实时显示距离婚礼的倒计时
- **婚礼日历** - 高亮显示婚礼日期，支持农历显示
- **场地导航** - 交互式地图导航，支持多平台导航应用
- **旅行足迹** - 展示新人旅行回忆的互动地图

### 📱 用户体验
- **响应式设计** - 完美适配桌面端和移动端
- **块状滚动** - 流畅的全屏滚动体验，每次滚动一个完整区块
- **交互式地图** - 点击标记点查看详细信息
- **侧边栏展示** - 优雅的侧边栏展示旅行回忆

## 🚀 技术栈

### 前端框架
- **Next.js 15** - React 全栈框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript

### 样式与UI
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **响应式设计** - 移动优先的设计理念
- **自定义动画** - CSS 动画和过渡效果

### 地图与导航
- **高德地图 API** - 地图显示和导航功能
- **多平台导航** - 支持高德地图、苹果地图、百度地图
- **交互式标记** - 可点击的地图标记点

### 开发工具
- **ESLint** - 代码质量检查
- **Turbopack** - 极速构建工具
- **pnpm** - 高效的包管理器

## 📁 项目结构

```
wedding/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── CountdownHero.tsx  # 倒计时组件
│   │   ├── CalendarSection.tsx # 日历组件
│   │   ├── WeddingMapComponent.tsx # 婚礼场地地图
│   │   ├── TravelContainer.tsx # 旅行足迹容器
│   │   ├── TravelSidebar.tsx  # 旅行足迹侧边栏
│   │   └── MapComponent.tsx   # 地图组件
│   └── lib/                   # 工具库
│       ├── config.ts          # 配置文件
│       ├── data.ts            # 数据文件
│       └── types.ts           # TypeScript 类型定义
├── public/                    # 静态资源
│   ├── wedding-map.jpg        # 婚礼场地地图
│   └── *.jpg                  # 其他图片资源
└── package.json              # 项目配置
```

## 🛠️ 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本

### 安装依赖
```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 开发环境
```bash
# 启动开发服务器
pnpm dev

# 使用 Turbopack 加速构建
pnpm dev --turbopack
```

### 生产构建
```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 代码检查
```bash
# 运行 ESLint 检查
pnpm lint
```

## 🎨 自定义配置

### 环境变量配置

#### 1. 创建环境变量文件
在项目根目录创建 `.env.local` 文件：

```bash
# 高德地图 API Key
NEXT_PUBLIC_AMAP_KEY=your_amap_api_key_here
```

#### 2. 获取高德地图 API Key
1. 访问 [高德开放平台](https://lbs.amap.com/dev/key/app)
2. 注册并登录账号
3. 创建应用，选择 Web 端
4. 获取 API Key 并配置到环境变量中

### 婚礼信息配置
编辑 `src/lib/config.ts` 文件来配置婚礼相关信息：

```typescript
export const weddingConfig = {
  // 婚礼日期
  weddingDate: '2024-12-21',
  // 新人姓名
  brideName: '新娘姓名',
  groomName: '新郎姓名',
  // 婚礼地点
  venue: '黄河迎宾馆',
  // 其他配置...
};
```

### 地图标记点配置
在 `src/components/WeddingMapComponent.tsx` 中修改地图标记点：

```typescript
const markers: MapMarker[] = [
  {
    id: 'EastGate',
    x: 88,  // 相对位置百分比
    y: 70,
    title: '黄河迎宾馆东门',
    description: '车辆推荐入口',
    latitude: 34.875314,
    longitude: 113.650306,
  },
  // 更多标记点...
];
```

### 旅行足迹数据
在 `src/lib/data.ts` 中添加旅行足迹数据：

```typescript
export const travelMarkers: TravelMarker[] = [
  {
    title: "旅行地点",
    SOC: "国家代码",
    city: "城市名称",
    // 更多数据...
  },
];
```

## 项目部署
```bash
# 克隆项目
git clone https://github.com/huiru-wang/wedding.git
cd wedding

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
nano .env.local  # 编辑环境变量文件，添加AMAP_KEY
```