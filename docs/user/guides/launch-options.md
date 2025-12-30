---
description: complete reference guide for Blish HUD launch options. Learn how to use command line parameters to auto-launch Guild Wars 2, customize settings paths, enable debug modes, etc.
id: launch-options
title: Launch Options
---

Launch options allow you to set lower level settings in the overlay at launch.  These can be added to a Blish HUD shortcut or when launched from a console.

## Parameters

### -g, --startgw2 <1 or 2\>

_Default: `0`_

Allows you to launch Guild Wars 2 along with Blish HUD.

- 0 does nothing
- 1 will start Guild Wars 2
- 2 will start Guild Wars 2 with the autologin flag

### -p, --process <Gw2-64\>

_Default: `Gw2-64`_

The name of the process the overlay will be waiting for (without `.exe`). This parameter is used in conjunction with -w, --window.

### -P, --pid <pid\>

The PID of the process the overlay will be waiting for to overlay.  Has a higher priority than -p, --process but a lower priority than -m, --mumble.

### -w, --window <ArenaNet_Dx_Window_Class\>

_Default: `ArenaNet_Dx_Window_Class`_

The name of the window Blish HUD should overlay. This parameter is used in conjunction with -p, --process.

### -s, --settings <path\to\settings\dir\>

_Default: `%userprofile%\Documents\Guild Wars 2\addons\blishhud`_

The directory where Blish HUD should load and save settings and other persistent data from/to.

### -a, --progdata <path\to\programdata>
_Introduced in Blish HUD v1.1.2_

_Default: `%programdata%\Blish HUD\`_

The path where Blish HUD will save non-user data such as cached textures.

### -r, --ref <path\to\ref.dat\>

_Default: `.\ref.dat`_

The path to the ref.dat file which primarily contains texture and audio assets for Blish HUD. 

### -m, --mumble <MumbleLink\>

_Default: `MumbleLink`_

The name of the Mumble Link target that Blish HUD should be reading from (if you are using the `-mumble` parameter with Guild Wars 2).

### -f, --maxfps <60\>

_Default: `60`_

Allows you to set the max target FPS (mutually exclusive with --unlockfps).

### -d, --debug

_Default: `false`_

When enabled:
* Shows FPS and other timings in the top-right corner.
* Module exceptions are rethrown (where they would otherwise be handled) to enable debugging Modules easier.
* Sets the minimum output log level to DEBUG.

### -M, --module <path\to\module.bhm\>

Expects the path to a Blish HUD module file (.bhm) OR the path to a directory which contains an unpacked module.  When specified, Blish HUD will load this module and attempt to enable it when launched.  Useful when developing modules.

If using a directory, be sure that your path does not end in `\` otherwise the closing double quote will be escaped.

## Examples

### Overlay a different application (esp. for testing)

Identify the process name and window name.  Window Spy (a utility that comes with [AutoHotKey](https://www.autohotkey.com/download/)) does a good job of acquiring the required info.

![](/img/docs/launch-options.png)

`".\Blish HUD.exe" --process powershell --window ConsoleWindowClass` will have Blish HUD overlay a PowerShell window.

### Save application settings in the current directory

`".\Blish HUD.exe" --settings .\`

### Debugging a module

#### Packed module

`".\Blish HUD.exe" --module "C:\Source\MyNewModule\bin\Debug\MyNewModule.bhm" --debug`

#### Unpacked module

`".\Blish HUD.exe" --module "C:\Source\MyNewModule\bin\Debug" --debug`