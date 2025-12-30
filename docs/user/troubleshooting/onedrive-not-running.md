---
description: Getting the "Cloud file provider is not running" error? This crash is caused by OneDrive Files On-Demand. Here are three ways to fix it, including disabling the feature or moving your settings.
id: onedrive-not-running
title: Blish HUD crashes with error "The cloud file provider is not running"
---

# Cause

This is caused by a OneDrive feature called "Files On-Demand."  This feature stores files in OneDrive and syncs them to your local system on request.  If this sync takes too long or you are not signed into OneDrive, Blish HUD will be unable to read the contents of the file and may crash.

# Solution 1A

Ensure you are signed into OneDrive.  If you aren't signed into OneDrive, there is no way for these remote files to sync back to your computer.

# Solution 1B

Disable the "Files On-Demand" feature in OneDrive to ensure files remain on your computer.  The guide below walks you through disabling this feature.

https://www.coretechnologies.com/blog/onedrive/how-to-turn-off-files-on-demand/

# Solution 2

If you would prefer to fully remove OneDrive from the equation, you can enable [Portable mode](https://blishhud.com/docs/user/portable-mode), which should store all of your settings outside of OneDrive unless you've extracted Blish HUD into a OneDrive-backed folder.