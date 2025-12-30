---
description: Learn how to configure Blish HUD for Guild Wars 2 multiboxing. A step-by-step guide to using Gw2Launcher, configuring unique MumbleLink names, and managing separate settings profiles for each account.
id: multibox-support
title: Multibox Support
---

Blish HUD fully supports multiboxing but requires that you configure it properly to ensure that there are no issues.

We recommend that you use [Healix's Gw2Launcher](https://github.com/Healix/Gw2Launcher) for the best experience, but any launcher capable of passing custom launch arguments to Guild Wars 2 can be used by following the same configuration principles.

## Gw2Launcher configuration

### 1. Enable mumble link name

1. Open Gw2Launcher.
2. Open the global settings.
3. Select **Guild Wars 2** from the left side and then select **Launch options**.
4. Ensure that **Mumble link name** is checked and set to `MumbleLink_%accountid%`

<iframe width="602" height="413" src="https://blishhud.com/img/docs/multiboxing/mb1.webm"></iframe>

### 2. Auto-launch Blish HUD

1. In the same settings window, scroll to the bottom and select **add program**.
2. Fill in the fields as prescribed in the table below:

| Field | Value | Explanation |
|-|-|-|
| Optional name to display | `Blish HUD` | The name of the application to show. |
| The program to run | `c:/Addons/Blish HUD/Blish HUD.exe` | The path to the `Blish HUD.exe` file. |
| Optional command line arguments | `--mumble "MumbleLink_%accountid%" --settings "mbprofiles\blishhud.%accountid%"` | Ensures that we use a matching mumble name and that we create a unique settings folder. |
| Run after... | `Launching` | Blish HUD can be launched immediately or you can select `Loading the game` if you prefer |
| When the game exits... | `Do nothing` | It is important that you configure Blish HUD to close on its own. Do not let your launcher close Blish HUD! |

<iframe width="466" height="382" src="https://blishhud.com/img/docs/multiboxing/mb2.webm"></iframe>

### 3. Configure Blish HUD to close itself

1. Open the main Blish HUD window.
2. Select the settings tab and navigate to **Overlay Settings**.
3. Uncheck **Minimize to tray when Guild Wars 2 Closes.**

<iframe width="588" height="321" src="https://blishhud.com/img/docs/multiboxing/mb3.webm"></iframe>