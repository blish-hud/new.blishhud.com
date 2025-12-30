---
description: Troubleshoot the opaque black background issue in Blish HUD. Learn how to disable conflicting NVIDIA settings (MFAA, FXAA) or AMD post-processing (Sharpening) to restore overlay transparency.
id: opaque-black-background
title: Blish HUD has an opaque black background
---

# Examples

![image](https://user-images.githubusercontent.com/1950594/186517960-7a08a487-e279-415a-a5e6-e3a80d677f3b.png)
![image](https://user-images.githubusercontent.com/1950594/186518045-2b1a2d5c-6c72-4164-9e89-497095c2ce8c.png)

# Solution 1 (NVIDIA)

This is almost always caused by `Multi-Frame Sampled AA (MFAA)` or `Antialiasing - FXAA` enabled globally in the NVIDIA Control Panel.  It can also be caused by other non-default settings configured globally.  The solution is to either revert these settings to off or back to their default.  If you do not wish to make these changes globally, they can be applied for Blish HUD explicitly.

1) Navigate to **3D Settings > Manage 3D settings**:

![image](https://user-images.githubusercontent.com/1950594/186518421-36f03802-7005-495a-ab7f-f9f6046a9589.png)

2) Compare your global settings to the ones listed above and here:

![image](https://user-images.githubusercontent.com/1950594/186518693-f2da6e75-a7f2-4041-a995-11c8875f0b39.png)

Revise any differences and then relaunch Blish HUD.

# Solution 2 (AMD)

Much like the above solution, check in your AMD settings and confirm that no post-processing effects are applied.  We've seen "sharpening" cause this most frequently for AMD users.  Disabling the post-processing effect and restarting Blish HUD should restore the transparency in Blish HUD.

# Less common solutions

- Ensure you have transparency effects turned on in your Windows settings.
- Ensure you have the latest version of your graphics card drivers installed.
- Ensure you don't have other overlays which may be injecting themselves into Blish HUD (such as RTSS - RivaTuner).