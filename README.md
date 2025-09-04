# Wedding Landing Page (Next.js)

本项目是用于个人婚礼的 Landing Page，包含：
- 首屏全屏背景 + 新郎新娘姓名 + 倒计时
- 当月日历，自动高亮婚礼日期
- 高德地图，显示地址位置并禁用交互

## 快速开始

1. 安装依赖（已安装可跳过）
```
npm install
```

2. 配置高德地图 Key（可选）
- 在项目根目录创建 `.env.local`
```
NEXT_PUBLIC_AMAP_KEY=你的高德Web端Key
```

3. 放置首屏背景图
- 将一张图片放在 `public/hero.jpg`（或修改 `src/lib/config.ts` 中的 `heroImage`）

4. 自定义信息
- 编辑 `src/lib/config.ts`：名字、婚礼时间、地址与坐标

5. 启动开发服务器
```
npm run dev
```

## 部署
- 推荐 Vercel 部署。
