---
description: Can't see Blish HUD in your OBS stream? Because Blish HUD runs as a separate window, standard game capture might miss it. This guide shows you how to set up Display Capture or Multi-Source recording properly.
id: recording-bhud
title: Recording Blish HUD
---

## Issue

When using capture software such as OBS, you may find it unintuitive to record or stream your gameplay with the Blish HUD UI visible. This is because Blish HUD is running on top of the game in its own transparent window and not as part of the game itself.

## Solution

### Using Display capture

If your recording software supports capturing an entire region or display, this option can be used to capture Blish HUD as it will include all parts visible that are selected in the recording.

### Multi-Source Capture

If your recording software supports adding multiple applications as a video source, you can select your Guild Wars 2 process as one source and the Blish HUD window as another. The Blish HUD window will likely not be an option to select by default - you must enable "Show in Taskbar" within the Blish HUD overlay settings for other software to list us as a capture source.

When selecting the Blish HUD source, you'll need to ensure that your recording software has transparency enabled. Otherwise, Blish HUD will show with a black background where the game should be.

If using OBS, you can use either Window or Game Capture to select Blish HUD as a source, but Game Capture will provide you with a better performance capture.

Note: _When the multiple sources are recomposited, you may see opacity differences between what your recording shows and what you actually see._