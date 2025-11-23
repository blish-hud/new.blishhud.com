---
id: dev
title: Overview
---

Blish HUD development comes in two flavors: **Core** and **Module** development. Blish HUD is written in C# and can load .NET compiled modules.

### Core Development

Core development focuses on the base `Blish HUD.exe`, which supplies the framework for modules and integrates with Guild Wars 2 as an overlay.

Core provides modules with:
- An extensive UI framework that replicates many common Guild Wars 2 controls.
- Rendering within the Guild Wars 2 3D user space powered by Monogame.
- ArcDps integration through arcdps-bhud.
- Content management for textures, audio, shaders, and other assets.
- Simple access to MumbleLink and the Guild Wars 2 Web API.
- Access to user input.
- Settings management with built-in renderers.

Contribute to Core if you want to improve Blish HUD overall or expand the features available to modules.

### Module Development

Module development covers the smaller packages that users load into Blish HUD. Modules reference `Blish HUD.exe` and can interact with the base application to add new features.