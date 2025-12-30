---
description: Learn how to install and update Blish HUD modules. Use the built-in Repository for automatic management, or follow our guide to manually install .bhm files into your Modules directory.
id: installing-modules
title: Installing Modules
---

## Installing modules from the Repo

Most modules can be automatically downloaded while running Blish HUD using the module package manager under settings.

![bool setting entry](/img/user/installing-modules/repo.png)

From this page you can update existing modules or install new ones from the public repository as they are released.  This is the recommended way to manage modules.

## Manually Installing Modules

Modules are special archives with a `.bhm` _(Blish HUD Module)_ file extension.  You can manually install these modules by placing them into your Modules directory.

After you launch Blish HUD for the first time, it will automatically generate a number of directories that can be found at `%userprofile%\Documents\Guild Wars 2\addons\blishhud\`.  Inside of this directory is a folder called **Modules**.  While Blish HUD is _closed_, place the `.bhm` file into this directory.

![](https://i.imgur.com/WberLZh.png)

When you relaunch Blish HUD, the module you added will now show under Module Settings in the Blish HUD settings window.  From here, you can select the module and select "Enable", which will activate the module.

:::info FYI

If you have OneDrive configured to sync your documents folder, our addons folder will actually be located at `%onedrive%\Documents\Guild Wars 2\addons\blishhud\`.

:::