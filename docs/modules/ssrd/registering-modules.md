---
id: registering-modules
title: Registering Modules
---

## Overview

Modules are registered by their Git URI. A single repository can contain multiple modules, and SSRD will import each detected module for you.

## Registering a module

To register a module, first locate the Git URI for your repository. It will end in `.git`.

#### 1. Copy the Git URI from your repository
<img src="/img/docs/ssrd/gituri.png" />

#### 2. Paste the URI into the `Add Module Repository` page in SSRD
<img src="/img/docs/ssrd/register-module.png" />

#### 3. Register the detected modules
You will see the manifest for each module found in the repository. Add each module you want to manage, then continue to the main Modules page.

*An older recording of this process is available below; some UI elements have changed since it was created.*

<div style={{position: "relative", paddingBottom: "calc(52.86% + 44px)" }}>
<iframe src="/img/docs/ssrd/ssrd.webm" frameborder='0' scrolling='no' width='100%' height='100%' style={{position: "absolute", top:0, left:0}} allowfullscreen></iframe>
</div>

## Webhooks

Add a webhook to your repository so SSRD can automatically refresh your module manifests when you push changes. If the repository contains multiple modules, a single webhook will update all of them.

To get the webhook URL, hover over the arrow in the top-right corner of your module and copy the **Push Webhook** from the menu.
<img src="/img/docs/ssrd/push-webhook.png" />

Configure the webhook to trigger only on **Push** events. This keeps your module manifest current for release management and features such as static content hosting.

## Remarks

- SSRD only supports modules hosted on GitHub.
- To add a private GitHub repo to SSRD, first grant our `org@blishhud.com` account read access to the repo.
- Modules must include all dependencies that SSRD can resolve from the same repository. If your module depends on another project outside the repo, either include the shared library DLL in the module repo or publish it as a NuGet package.
- User-facing error messages are limited. If something unexpected happens, please let Freesnöw know so it can be investigated.
