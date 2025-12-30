---
description: Discover how to configure Blish HUD to launch alongside Guild Wars 2 automatically using the tray icon, a special Blish HUD shortcut, or the Windows Startup folder.
id: start-gw2-and-bhud-together
title: Start GW2 and Blish HUD Together
---

Blish HUD supports launching in tandem with Guild Wars 2 in multiple ways:

**Enable stay in tray:** Enabling stay in tray will keep Blish HUD running between sessions and it will auto attach to Guild Wars 2 when you launch it. This is the easiest way.

**Launch Guild Wars 2 with Blish HUD:** If you have stay in tray enabled or launch Blish HUD before the game shows, you can double-click the Blish HUD icon in the tray (or right-click it for more options) to launch to game.

This means the easiest combo is likely to keep stay in tray enabled and then just double-click the Blish HUD icon in the tray anytime you would like to play GW2.

_Other options:_

**Launch GW2 with Blish HUD:** If you create a shortcut to Blish HUD, you can add a [launch parameter which will auto-launch GW2](https://blishhud.com/docs/user/launch-options#-g---startgw2-1-or-2).

That means your Blish HUD shortcut will essentially do both jobs for you.

![iZ2GH0K](https://user-images.githubusercontent.com/1950594/197849956-9e94a88d-5928-4945-985b-cfa4c761bb3e.png)

Here is the exact bit added at the end:

`--startgw2 2`

The 2 tells it to auto-login. If you prefer it not autologin, you can use:

`--startgw2 1`

### Starting Blish HUD at Launch

You may find it helpful to launch Blish HUD when your system starts automatically.  When paired with the **Enable stay in tray** setting, it allows you to use Blish HUD without necessitating ever needing to launch it manually.  To do this:
1. Open the Blish HUD folder which contains the Blish HUD executable.
1. Press the **Windows logo key + R**, type `shell:startup`, then select **OK**. This opens the **Startup** folder in another window.
2. Right-click **Blish HUD.exe** (it will show Blish as an icon) and drag your mouse to the **Startup** folder.
3. Release right-click and select **Create shortcuts here**.

[Reference: Microsoft Guide](https://support.microsoft.com/en-us/windows/add-an-app-to-run-automatically-at-startup-in-windows-10-150da165-dcd9-7230-517b-cf3c295d89dd)

The next time you log in to your computer, Blish HUD will automatically launch and sit quietly in your notification area.