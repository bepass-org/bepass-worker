<div>
<h1 style='text-align: center'>
bepass-worker
</h1>
</div>


## 📒 Table of Contents
- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#️-features)
- [📂 Project Structure](#-project-structure)
- [🚀 Deploying a Worker](#-deploying-a-worker)
  - [One-Click Deploy](#one-click-deploy)
  - [Manual Deployment](#manual-deployment)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [نسخه فارسی](https://github.com/uoosef/bepass-worker/blob/main/README-FA.md)

---


## 📍 Overview

This repository contains a new worker.js that aims for better solutions in terms of performance and features regarding common worker issues such as supporting IPv6, the UDP protocol, and more stable communication with Cloudflare IPs (loopback connections).

As you know, Cloudflare workers are currently unable to connect to hosts that have Cloudflare IPs (this is considered a loopback).This worker uses relay nodes to work around that limitation.

The worker also implements an advanced DNS DOH client/proxy for dns routing/serving purposes.

---

## ⚙️ Features

- Supports IPv6
- Supports UDP through relays
- More reliable loopback connection handling and routing
- Embedded DOH DNS Client/Proxy
- Overall improved performance and stability

---


## 📂 Project Structure

```
├── src
│   ├── dns.js // DNS message encoding/parsing
│   └── worker.ts // Main worker code
├── dist
│   └──	worker.js // Compiled worker script
```


---


## 🚀 Deploying a Worker

### Manual Deployment (recommended)

To manually deploy the worker:

1. Sign up at the [Cloudflare signup page](https://www.cloudflare.com/sign-up)
2. From the main navbar, choose **Workers & Pages**
3. Click the **Create Application** button
4. Click the **Create Worker** button
5. Copy the [worker.js](https://github.com/uoosef/bepass-worker/blob/main/dist/worker.js) file contents from this repository
6. Fill in a name for your worker and click the **Deploy** button
7. Click the **Quick Edit** button
8. Paste your clipboard contents and replace the worker's default code
9. Click the **Save and Deploy** button
10. Write down the newly created worker address, it should be something like **[name].[username].workers.dev**
11. Change your Bepass configuration to **https://[name].[username].workers.dev/dns-query**

### One-Click Deploy (experienced users only)

You can deploy this worker to your Cloudflare account automatically with one click using the button below.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/user/bepass-worker)

---

### Add your own relay

**1. Follow the [relay set-up instructions](https://github.com/uoosef/cf-bepass#how-to-share-my-node-becoming-a-volunteer-maintainer) to run your own relay server.**

**2. Edit the `worker.js` file and add your server IP or domain to the `proxyIPs` array.**

In the `worker.js` file, locate the following code:

```js
// src/worker.ts
var proxyIPs = ["relay1.bepass.org", "relay2.bepass.org", "relay3.bepass.org"];
var proxyPort = 6666;
var proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
```

Remove public relay addresses and Add the IP address or domain of your relay server. For example:

```js
// src/worker.ts
var proxyIPs = ["relay.example.com", "123.45.67.89"]; // Add your server IP/domain here
var proxyPort = 6666;
var proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
```

## Usage Limits

Cloudflare's free workers are limited to 100,000 requests per day. This is sufficient for personal use by one user or a small family.

For most personal usage, the free worker should be adequate. But if you experience rate limiting, you may need to deploy workers on multiple accounts.


### 📦 Installation

1. Clone the bepass-worker repository:
```sh
git clone https://github.com/uoosef/bepass-worker
```

2. Change to the project directory:
```sh
cd bepass-worker
```

3. Install the dependencies:
```sh
npm install
```

### 🎮 Using bepass-worker

```sh
npm run build && node dist/worker.js
```

### 🧪 Running Tests
```sh
npm test
```

---


## 🗺 Roadmap

> - [X] `Task 1: Implement worker's range detection`
> - [X] `Task 2: Better loopback support`
> - [X] `Task 3: DNS Resolving`
> - [ ] `Task 4: ...`


---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/uoosef/bepass-worker/blob/main/LICENSE) file for details.

---
