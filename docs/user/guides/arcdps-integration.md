---
description: Using ArcDPS? Learn how to install our integration bridge to feed combat and party data directly into supported Blish HUD modules.
id: arcdps-integration
title: ArcDPS Integration
---

ArcDPS has an API which allows some data to be used outside of ArcDPS itself.  This data includes party information, combat data, and other real-time data.

We offer an integration plugin which allows this data to be utilized by modules.

:::info

ArcDPS intentionally delays combat data by several seconds, so any modules utilizing this integration will not be able to provide real-time combat data.  That is to be expected.

:::

Enabling this integration can be done one of two ways.

### Using the Addon Manager

Our integration can be automatically added to your ArcDPS install using [GW2-UOAOM](https://github.com/gw2-addon-loader/GW2-Addon-Manager).  From the list of Add-Ons, ensure that "ArcDPS" and "ArcDPS Blish HUD Integration" are both checked.

![Addon-Manager Screenshot](https://user-images.githubusercontent.com/30479162/89721621-b697a480-d994-11ea-88d7-8b5bc0200272.jpg)

### Manually

If you have [ArcDPS](https://www.deltaconnected.com/arcdps/) installed manually and wish to install our plugin manually, you can do so by downloading the latest version of the [ArcDPS Blish HUD plugin](https://github.com/blish-hud/arcdps-bhud/releases/latest/download/arcdps-bhud-v0.3.1-x86_64-pc-windows-msvc.zip).  Extract the `arcdps_bhud.dll` DLL from the ZIP and place it in the same folder as your ArcDPS dll.

Once done, restart both Guild Wars 2 and Blish HUD to have the integrations now be available to modules that utilize them.
