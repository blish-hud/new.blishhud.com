---
id: friendly-ui-ux
title: User-Friendly UI/UX
---

There are many ways to build a UI, but with limited screen space and users at the forefront, keep your module focused and consistent.  This guide shares how to keep Blish HUD UI intuitive and friendly.

## Mimic in-game UI/UX when reasonable

*Where practical*, mirror in-game designs and layouts.  Guild Wars 2 players already understand them and expect certain behaviors.  Keep in mind:
- ✅ **DO** consider replicating an existing in-game UI element rather than inventing a new one.
- ✅ **DO** extend existing controls with intuitive, discoverable features (for example, adding menu separators to context menus without an in-game equivalent).
- ✅ **DO** use game-sourced textures when building custom controls so they fit with the game and Blish HUD.
- ✅ **DO** look to in-game panels for layout inspiration when organizing views.
- ✅ **DO** aim for consistency—within your module and across modules when common UX patterns emerge.
- ❌ **DO NOT** create custom controls that mimic in-game visuals but behave differently.

Please avoid mimicking to the point of recreating user-hostile UI/UX.  Use the established in-game UI as a reference, not a constraint.

**Bottom line:** help users avoid relearning UI conventions while steering clear of known in-game pitfalls.

## 'Screen' Controls

Some modules place UI elements inside the root `Screen` container rather than inside a window.  These controls can surface quick info or actions.  When placing controls on the root `Screen`:
- ✅ **DO** ensure elements can be repositioned.  Users have different UI layouts, and static placements may cover in-game or other module UI.
- ✅ **DO** auto-hide controls during character select, loading, vistas, or when the fullscreen map is open if they are not relevant.  You can check with `GameService.GameIntegration.Gw2Instance.IsInGame && !GameService.Gw2Mumble.UI.IsMapOpen` in update or draw calls.
- ❌ **DO NOT** block mouse input with controls unless they are meant for interaction (such as a button).

## Module Settings

Every module is different, so choose a layout that makes settings easy to find and manage.

**When you have few settings:**
- ✅ **DO** use the built-in `SettingsView`, which by default shows your settings on the module page.

**When using custom settings views or windows:**
- ✅ **DO** present settings in a custom window.
- ✅ **DO** include a button on the module settings panel that opens your settings so users can find them easily (they will look on the module page first).

**In general:**
- ❌ **DO NOT** scatter settings across multiple locations.  If needed, link to tabs within a single settings window to keep everything consolidated while still accessible.
- ❌ **DO NOT** create a tab in the main Blish HUD window dedicated solely to settings.

Some features deserve their own settings, but placing them in multiple spots confuses users trying to remember where to adjust them.

## Should I have my own tab in the main Blish HUD window?

Modules can register a tab in the main Blish HUD window to display a custom view.

Because that window has limited space and users do not always expect new tabs to appear:
- ✅ **DO** create a tab if your primary UI fits in a single view and uses the available space effectively.
- ❌ **DO NOT** create a tab dedicated only to settings.  Use a settings window opened from the module page instead.
- ❌ **DO NOT** create a tab that leaves most of the space unused.  The main window is large—make good use of it.

:::warning
Users are **regularly** confused by modules that add tabs to the main Blish HUD window because new tabs are not always obvious.
:::

## Should I use a `CornerIcon`?

The `CornerIcon` control shows in the top-left of the player's screen alongside the Blish HUD icon and in-game icons.

Use a `CornerIcon` when you need to expose options or actions that users will likely access **every session**.  If the menu contents are needed less frequently, provide access another way to avoid overcrowding the top of the screen.

Examples of scenarios that **should not** have a `CornerIcon`:
- ❌ A menu with a shortcut to a settings window for a module that rarely needs changes.
- ❌ A button that toggles the module's main feature if the toggle is rarely used.
- ❌ A button that opens a tab in the main Blish HUD window (the tab is already reachable from the Blish HUD icon).

Examples of scenarios that **benefit** from a `CornerIcon`:
- ✅ A menu with regularly used options or features that would be cumbersome to reach through a dedicated window.

If you already have a `CornerIcon` for a suitable scenario, it is fine to expand the menu with shortcuts to settings and similar entries.  Consider providing a setting to toggle the `CornerIcon` on or off based on user preference.

## Context Menu Strips

Avoid adding right-click menus to your `CornerIcon` or other controls.  They are unintuitive; use a left-click menu instead.
