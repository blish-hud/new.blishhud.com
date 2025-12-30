---
description: Troubleshoot the issue where Blish HUD appears partially transparent or faded.
id: opacity-bug
title: Blish HUD shows partially transparent
---

# Example

![image](https://user-images.githubusercontent.com/1950594/186519910-077dabc9-ed9b-4128-8ca8-b7fb9f011ace.png)

# Overview

We've seen a subset of users report this issue.  There appear to be multiple root causes for this issue, but we've done our best to document the solutions to the scenarios we do understand.

_Note: Some users report the issue suddenly resolving itself after some time, allowing them to use v0.11.7 without issue._

## Solution 1 - Downgrade to v0.11.4

[Version 0.11.4](https://github.com/blish-hud/Blish-HUD/releases/download/v0.11.4/Blish.HUD.0.11.4.zip) has not had reports of this issue occurring nearly as much as v0.11.6 and above.

## Solution 2 - OpacityFix

Prerelease version 0.11.8-322 and above (including v1.0.0) support a potential fix.  Download the [OpacityFix](https://link.blishhud.com/wfy4qx) file and place it in the same folder as `Blish HUD.exe`.  Once you have done that, relaunch Blish HUD.

## Solution 3 - Windowed / Fullscreen

Some users have reported that switching the game from windowed to fullscreen windowed (or vice versa) has resolved the issue for them temporarily.

## Solution 4 - AMD Users

If you have an AMD GPU, please ensure that Image Sharpening (and other post-processing effects) are disabled in the AMD settings for Blish HUD.