# 1. 使用轻量级的 Node 18 环境
FROM node:18-alpine

# 2. 开启 pnpm 支持 (Node.js 自带的魔法指令)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. 设置工作目录
WORKDIR /app

# 4. 只复制依赖清单 (利用 Docker 缓存加速后续打包)
COPY package.json pnpm-lock.yaml ./

# 5. 安装依赖
RUN pnpm install --frozen-lockfile

# 6. 复制所有剩下的源代码
COPY . .

# 7. 打包构建
RUN pnpm build

# 8. 暴露 3000 端口
EXPOSE 3000

# 9. 启动项目
CMD ["pnpm", "start"]
