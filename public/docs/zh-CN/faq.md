# 帮助 和 常见问题

查找关于 AB Download Manager 的常见问题解答和故障排除指南。

---

### 这个应用支持从网站下载媒体文件吗？

没错！AB Download Manager可以从网站捕获视频、音频以及未加密的 HLS 流。请确保已安装浏览器扩展程序，以便此功能正常工作。

---

### 这个应用支持从 YouTube 下载视频吗？

不。由于法律和许可条款的限制，该应用不支持下载加密流媒体内容，其中包括 YouTube 视频。

---

### 屏幕变黑或闪烁 — 我该怎么办？

您可能需要将渲染 API 切换为软件渲染。请按照以下步骤操作：

1. 将这一行添加到您的环境变量中
   ```env
   SKIKO_RENDER_API=SOFTWARE
   ```
2. 重新启动应用程序。

如需了解更多详情，您还可以查看[GitHub 上的官方渲染 API 教程](https://github.com/amir1376/ab-download-manager/wiki/Change-the-renderApi)。

---

### 扩展程序无法连接到应用程序 — 我该怎么办？

如果浏览器扩展程序无法与桌面应用程序通信：

1. 请确保 AB Download Manager 桌面应用程序正在运行。
2. 检查您的 VPN、防火墙或代理是否阻止了对本地端口 `15151` 的访问。
3. 尝试在浏览器中直接打开 [http://localhost:15151](http://localhost:15151)。如果能正常访问，您应该会看到来自应用程序的连接响应。
