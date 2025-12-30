---
description: Troubleshoot FPS drops or lag when running Blish HUD. Learn how to optimize your Frame Limiter settings, and ensure Windows is using your dedicated GPU.
id: performance-troubleshooting
title: Performance Troubleshooting
---

# Issue

While running Blish HUD you see significant game performance impacts.

# Overview

Blish HUD is designed to use few CPU and GPU resources.   Medium and high-end systems should see little to no measurable performance impact while running Blish HUD.  

While troubleshooting Blish HUD performance, run Blish HUD with no modules enabled.  If you have modules enabled, disable them and then restart Blish HUD.  If you see a substantial impact (for example, an FPS drop of 10 or more), please review the solutions listed in this guide, as there is likely a misconfiguration causing the performance impact, which can be solved.

If your performance issue only occurs while certain modules are enabled, please reach out in the [Blish HUD Discord #💢help](http://link.blishhud.com/discordhelp) channel so that the performance of the module can be more closely evaluated by its developer.

# Solutions

## Evaluate Blish HUD Graphics Settings

By default, Blish HUD is configured to **match your monitor refresh rate**.  If you have a high refresh rate monitor, you can try setting Blish HUD's frame limiter to either 90 or 60 FPS.  If you don't rely on modules that render 3D elements (such as Pathing or Racing Meter), you can even try setting it to 30 FPS.

<img width="744" height="186" alt="CleanShot 2025-12-30 at 18 17 02@2x" src="https://github.com/user-attachments/assets/99ac5c74-2423-4c7b-b474-54ebb3336c54" />

## Ensure Blish HUD and Guild Wars 2 are using your dedicated GPU

Those with an integrated GPU (iGPU) and a dedicated GPU may find that their performance issues are caused by either Blish HUD, Guild Wars 2, or both running on the wrong GPU.  In your computer settings under **System > Display > Graphics** ensure that both Guild Wars 2 and Blish HUD are configured to use your high-performance GPU.

<video src='https://user-images.githubusercontent.com/1950594/223299168-60de137a-d01d-47f5-94e7-d7de95d194d2.mp4' controls='controls' muted='muted'></video>

You will know you've done this successfully if both applications are shown as using the same GPU engine in Task Manager:

![image](https://user-images.githubusercontent.com/1950594/223299509-de8e387d-0dd8-42e9-a585-5d12f3ecf11f.png)

_In this case, the dedicated GPU is **GPU 0**, but it may be **GPU 1** for you._

## Other things to check

- For those of you using a desktop computer with a dedicated GPU, double-check that your monitors are plugged directly into the GPU and not into the ports on your motherboard.  
- Ensure none of the Debug settings are enabled in Blish HUD unless asked by somebody assisting you with troubleshooting.  These introduce additional overhead, which could cause slight performance impacts.
- In the NVIDIA Control Panel under **3D Settings > Manage 3D settings**, ensure **Background application Max Frame Rate** is **Off**.