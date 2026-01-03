---
description: Update failed or stuck? Don't worry. This guide shows you how to manually download and overwrite the core files to get the latest version while keeping your modules and config safe.
id: bhud-upgrade-failure
title: Blish HUD Self-Update Fails
---

## Causes

There are various things that may prevent Blish HUD from updating itself.  Some causes include:

- Blish HUD may fail to update itself when it does not have the necessary permissions to modify the files where it has been extracted.
- You are updating from version 1.2.0 or prior and have Blish HUD's **Application & API Language** setting set to **French**.

## Solution

The easiest way to complete your Blish HUD upgrade it to manually extract it again.

1. Open the folder where you have Blish HUD extracted and delete the `unpack.zip` file, if it exists.
2. Download the [latest release](https://github.com/blish-hud/Blish-HUD/releases/latest/download/Blish.HUD.zip).
3. Right-click the downloaded ZIP and select **Properties**.
4. Select the **Unblock** checkbox and then press **OK**.
5. Extract the fresh copy of Blish HUD - replace the existing files with the new ones.

Your modules and settings will be unaffected.  🙂 

