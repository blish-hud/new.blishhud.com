---
description: Reference guide for configuring Blish HUD. Includes details on Overlay, Dynamic HUD, Graphics, and Debug settings.
id: overlay-settings
title: Overlay Settings
---

Overlay settings can be found in Blish HUD's main window by navigating to the Settings tab and then selecting **Overlay Settings**.

## Overlay Settings

| Setting | Default | Description |
| - | - | - |
| **Application & API Language** | *English* | Specifies the language Blish HUD runs in as well as the language used when querying the Guild Wars 2 API.  Please know that not all portions of Blish HUD or its modules have been fully translated.  In these cases, it will fallback to english.<br /><br />You can reach out in our Discord channel if you are interested in contributing translations for Blish HUD or one of its modules. |
| **Minimize to tray when Guild Wars 2 closes** | *Yes* | If enabled, Blish HUD will remain running when Guild Wars 2 is closed.  This allows you to easily use Blish HUD without needing to launch it every time you run Guild Wars 2.  While in the tray, Blish HUD uses very little resources and is only tasked with checking for the game running every so often. |
| **Show in taskbar** | *No* | If enabled, Blish HUD will show an icon on your taskbar.  This is helpful when attempting to [record Blish HUD](/docs/user/troubleshooting/776). |
| **Close window on escape** | *Yes* | If enabled, pressing ESC will close most Blish HUD and module windows which is the standard behavior in-game. |
| **Interact** | *F* | The key you have bound in-game to interact.  Used by multiple modules to add additional functionality. |
| **Hide interface** | *Ctrl + Shift + H* | The key combination to toggle showing Blish HUD's interface. |
| **Toggle Blish HUD window** | *Ctrl + Shift + B* | The key combination to toggle showing the main Blish HUD window. |
| **Preview releases** | *No* | If checked, Blish HUD will show prerelease modules in the module repo as well as prompt you to update to prerelease versions of Blish HUD.  Please know that prereleases may not be stable.  We recommend being a member of our Discord to provide feedback and request assistance if you intend on using prerelease versions. |
| **Use game volume** | *Yes* | If checked, Blish HUD will attempt to match its volume to your in-game volume by detecting the average volume of your game from things like ambient noise, music, etc. |
| **Volume** | *100%* | The volume level to use if **Use game volume** is disabled. |

## Dynamic HUD

| Setting | Default | Description |
| - | - | - |
| **Menu Bar** | *Always Show (Default)* | Indicates if the icons in the top left should sometimes be hidden. |
| **Windows** | *Always Show (Default)* | Indicates if Blish HUD windows should sometimes be hidden. |
| **Cut Scene / Loading Screen** | *Always Show (Default)* | Indicates if Blish HUD should be shown during loading screens / cutscenes. |

## Graphics Settings

:::caution
We do not typically recommend changing any of the graphics settings from their default.  Doing so can impact performance or the render alignment of some modules.
:::

| Setting | Default | Description |
| - | - | - |
| **Frame Limiter** | *Locked to 60 FPS* | Indicates the framerate lock for Blish HUD.  Increasing this limit will increase CPU and GPU utilization.  Do not set it to *Unlimited* without **Enable Vsync**.  Increasing Blish HUD's framerate is rarely helpful unless your game has higher FPS than Blish HUD. |
| **Smooth Character Position** | *Yes* | Guild Wars 2 does not report accurate character position data every frame for some reason.  Enabling this feature will attempt to smooth out the character position so that modules get less jerky position data. |
| **DPI Scaling** | *Automatic - Sync With Game* | Indicates if Blish HUD should match the DPI scaling setting set in-game.  This should typically be left automatic. |
| **Interface Size** | *Automatic - Sync With Game* | Indicates if Blish HUD should match the in-game interface size setting or scale independently.  Changing this from automatic will mis-align Blish HUD elements from the game. |

## Debug Settings

:::caution
We recommend against enabling these settings unless asked by a Blish HUD developer as part of troubleshooting.  Enabling debug settings will result in larger log files and will somewhat hurt performance.
:::

| Setting | Default | Description |
| - | - | - |
| Enable debug logging | *No* | Enables verbose debug logs if checked.  These entries may contain additional information from modules or Blish HUD itself helpful for troubleshooting. |
| Show Blish HUD FPS | *No* | Enable showing Blish HUD's FPS in the top right corner. |
| Show additional debug data | *No* | Enable showing additional stats in the corner.  This can be helpful when attempting to determine what module is causing performance issues. |