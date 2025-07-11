# 项目依赖升级说明

## 升级概述
本项目已从4年前的旧版本升级到与Vite 5.x兼容的最新稳定版本，**保持纯JavaScript开发环境**。

## 主要依赖升级

### 核心框架
- **Vue**: `^3.2.25` → `^3.4.21` (最新稳定版)
- **Vue Router**: `4` → `^4.3.0` (明确版本号)
- **Vuex**: `^4.0.2` → `^4.1.0` (最新稳定版)

### UI框架
- **Element Plus**: `^2.1.1` → `^2.5.6` (最新稳定版)

### 工具库
- **Axios**: `^0.26.1` → `^1.6.7` (重大版本升级)
- **Day.js**: `^1.10.8` → `^1.11.10` (最新稳定版)
- **Quill**: `1.3.6` → `^1.3.7` (最新稳定版)
- **Screenfull**: `^6.0.1` → `^6.0.2` (最新稳定版)

### 编辑器
- **md-editor-v3**: `^1.11.1` → `^4.12.0` (重大版本升级)

### 开发依赖
- **@vitejs/plugin-vue**: `^5.4.19` → `^5.0.4` (稳定版本)
- **ESLint**: `^8.11.0` → `^8.57.0` (最新稳定版)
- **ESLint Plugin Vue**: `^8.5.0` → `^9.21.1` (重大版本升级)
- **Sass**: `^1.49.9` → `^1.71.1` (最新稳定版)

## 移除的依赖
- `i` (^0.3.7) - 不必要的包管理器
- `npm` (^8.5.4) - 不必要的包管理器
- `yarn` (^1.22.17) - 不必要的包管理器
- `vite-plugin-style-import` (^2.0.0) - 已弃用

## 新增的依赖
- `unplugin-auto-import` (^0.17.5) - 自动导入API
- `unplugin-vue-components` (^0.26.0) - 自动导入组件

## 配置变更

### Vite配置 (vite.config.js)
1. **移除**: `vite-plugin-style-import` 插件
2. **新增**: `unplugin-auto-import` 和 `unplugin-vue-components` 插件
3. **优化**: 使用ES模块语法替代CommonJS
4. **功能**: 自动导入Vue、Vue Router、Vuex的API
5. **功能**: 自动导入Element Plus组件
6. **注意**: 保持纯JavaScript开发，移除TypeScript相关配置

### Sass配置优化
- 移除全局Sass导入，避免与Element Plus的@use规则冲突
- 保持原有的样式文件结构
- 添加Sass选项以静默不必要的警告

## 升级后的优势

### 1. 性能提升
- Vite 5.x 构建速度更快
- Vue 3.4 运行时性能优化
- Element Plus 2.5.x 组件性能提升

### 2. 开发体验
- 自动导入减少手动import
- 保持纯JavaScript开发环境
- 更现代的构建工具链

### 3. 安全性
- 所有依赖升级到最新安全版本
- 修复已知安全漏洞

## 需要注意的变更

### 1. Axios 1.x 变更
- 响应拦截器语法可能有变化
- 错误处理方式略有不同

### 2. md-editor-v3 4.x 变更
- API可能有重大变化
- 需要查看官方迁移指南

### 3. Element Plus 自动导入
- 不再需要手动导入组件
- 样式会自动按需加载

### 4. Sass配置
- 避免全局导入与Element Plus的@use规则冲突
- 保持原有的样式文件结构

## 升级步骤

1. **备份项目**
   ```bash
   git add .
   git commit -m "备份升级前状态"
   ```

2. **删除旧依赖**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   ```

3. **安装新依赖**
   ```bash
   pnpm install
   ```

4. **检查兼容性**
   - 运行 `pnpm dev` 检查开发环境
   - 检查控制台是否有错误
   - 测试主要功能

5. **修复兼容性问题**
   - 根据错误信息修复代码
   - 参考各库的迁移指南

## 可能需要的代码修改

### 1. Axios 使用
如果遇到Axios相关错误，可能需要更新拦截器语法。

### 2. md-editor-v3 使用
检查markdown编辑器相关代码，可能需要更新API调用。

### 3. Element Plus 导入
移除手动导入的Element Plus组件，现在会自动导入。

## 开发环境说明

- **语言**: 纯JavaScript (ES6+)
- **构建工具**: Vite 5.x
- **包管理器**: pnpm
- **样式**: Sass
- **代码规范**: ESLint

## 建议
1. 逐步测试各个功能模块
2. 查看各库的官方迁移指南
3. 如有问题，可以回滚到备份版本
4. 保持纯JavaScript开发，避免引入TypeScript复杂性 