---
id: anatomy
title: Anatomy of a Module
---

Blish HUD instantiates module classes when a user enables the module. The sections below explain what the class provides and how to use each part.

### The Logger

The logger is typically the first line of most modules and gives your module a logger instance. Create a logger the same way in any class where you need one.

```cpp
private static readonly Logger Logger = Logger.GetLogger<YourModule>();
```

### Module Parameters

When your module is instantiated, it receives module parameters for common tasks (assigned to the module's `ModuleParameters` property). These currently are:
- `SettingsManager` - Used to define your settings.
- `ContentsManager` - Used to load data from your ref directory that was bundled with the module.
- `DirectoriesManager` - Used to access the directories listed in your manifest.
- `Gw2ApiManager` - Used to make, potentially, authenticated calls to the Guild Wars 2 web API.

### The Constructor

The constructor and its `ImportingConstructor` attribute tell Blish HUD which class to instantiate when the module is enabled. Because Blish HUD does not use dependency injection, you may find it convenient to assign `this` to a static `Instance` variable on the module.

```cpp
[ImportingConstructor]
public YourModule([Import("ModuleParameters")] ModuleParameters moduleParameters) : base(moduleParameters) {
    /* ... */
}
```

:::warning
This call blocks and often runs before other parts of Blish HUD are ready. Avoid loading resources here and limit the work to basic initialization, such as assigning the static `Instance`.
:::

### Define Your Settings

Use this method to define any settings your module needs (see our [guide on settings](/docs/modules/guides/settings)).

When defining your settings:
- ✅ **DO** use a dedicated settings class when you have many settings to keep the module class manageable.
- ✅ **DO** use localized strings so users can understand your settings regardless of their Blish HUD language.
- ❌ **DO NOT** perform anything other than defining settings in this call. It blocks and should not access external resources or perform heavy work.
- ❌ **DO NOT** change the data types of settings after they are defined. Doing so can discard saved values. Migrate settings on launch or use a new setting name instead.

It is not required that you define all settings at launch.  Settings can be defined or recalled at any time within your module.

```cpp
protected override void DefineSettings(SettingCollection settings) {
    _moduleSettings = new ModuleSettings(settings);
}
```

### Display Your Settings

By default, settings with proper display names automatically appear through the `SettingsView` renderers. The default implementation generates fully wired controls for you on the module page in Blish HUD.

If you prefer a more tailored settings layout or want to surface settings in another window, provide a custom view.

```cpp
public override IView GetSettingsView() {
    return new SettingsHintView((_settingsWindow.Show, this.PackInitiator));
}
```

If you do not override this function, Blish HUD uses the built-in settings display.

### Load Your Module

Your module can load asynchronously when it is first enabled. While loading, the module page shows the in-progress state. Use this call to load resources such as textures or web data so they are ready when the module runs.

```cpp
protected override async Task LoadAsync() {
    await LoadTheThings();
}
```

### Update Your Module

Your module receives an `Update` call every frame before rendering. Keep the work in this loop minimal. Blish HUD locks update and rendering together, so rendering cannot occur until updates finish.

Update calls block other modules and rendering. If you have long-running processes, move them to their own thread or use the `gameTime` parameter to run calculations intermittently instead of every frame.

```cpp
protected override void Update(GameTime gameTime) {
    // Do something
}
```

### Unload Your Module

Cleaning up after yourself is essential to being a good module citizen. Remove static references and dispose of UI elements, textures, and other resources.

Users and Blish HUD processes (such as automatic updates) can disable and enable your module many times per session. To avoid memory leaks or other unintended behavior, reverse as much of your setup work as possible when unloading.

```cpp
protected override void Unload() {
    this.PackInitiator?.Unload();
    _pathingIcon?.Dispose();
    _settingsWindow?.Dispose();

    Instance = null;
}
```