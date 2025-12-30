---
description: Make Blish HUD portable. Learn how to override the default storage path and keep your settings and modules contained within the application folder.
id: portable-mode
title: Portable Mode
---

By default, Blish HUD stores it's settings, modules, etc. under `Documents\Guild Wars 2\addons\blishhud\`.  If you would prefer to keep Blish HUD's settings in the same folder as Blish HUD, you can use portable mode.

Instead of specifying the `--settings` argument as described in <a href="/docs/user/launch-options">Launch Options</a> a `Settings` folder can be created directly in the Blish HUD folder (next to `Blish HUD.exe`).
If present, and no `--settings` argument is provided, Blish HUD will store all modules and data in this folder instead of the default under `Documents`.

![settings folder](https://blishhud.com/img/user/portable-mode/blish-portable.png)