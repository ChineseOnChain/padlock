# 🔒 Padlock 挂锁

![Browser Extension](https://img.shields.io/badge/跨浏览器支持-Firefox%20%26%20Chrome-orange) 
![Performance](https://img.shields.io/badge/双语界面-English/中文切换-brightgreen)
![Size](https://img.shields.io/badge/文件大小-%3C100KB-lightblue)

  轻量<100KB大小的密码生成器，支持加盐功能和自定义设置。  
    A flexible lightweight **sub-100KB** password generator with **salt support** and customization.  


  使用 `crypto.getRandomValues()` 并回退到 `Math.random` 以确保功能可靠性。  
    Uses `crypto.getRandomValues()` with `Math.random` fallback for guaranteed functionality.

  
---

### 🌟 功能特点 / Features
- **Flexible generation** (length 8-128 chars, symbols, numbers)  
  **灵活生成**（长度 8-128 chars、符号、数字）
- **Optional salt** for added entropy  
  **可选加盐**增强密码强度
- **Built-in** fallback method  
  **内置**备用方案
- **Zero data collection** (runs locally)  
  **零数据收集**（本地运行）
- **One-click copy** & auto-save  
  **一键复制** & 自动保存

---

## 🧩 Install / 安装
**Package Install 安装**:  
| Browser 浏览器       | Install Link 安装链接 |
|---------------------|----------------------|
| Firefox             | [![Firefox Version](https://img.shields.io/badge/.xpi-v1.0-orange)](https://github.com/ChineseOnChain/padlock/releases/download/v1.0/padlock-1.0.xpi) |
| Chrome              | [![Chrome Version](https://img.shields.io/badge/.crx-v1.0-yellow)](https://github.com/ChineseOnChain/padlock/releases/download/v1.0/padlock.crx)

**Manual Install 手动安装**:  
1. Enable "Developer mode" in extensions  
   在扩展设置中启用"开发者模式"
2. Load `src/` folder as unpacked extension  
   加载`src/`文件夹为解压扩展

---


## 📜 许可证 / License
GNU通用公共许可协议 [GPLv3](https://jxself.org/translations/gpl-3.zh.shtml) © 2025 [Chairman](https://github.com/ChineseOnChain)
