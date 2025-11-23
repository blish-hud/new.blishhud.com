---
id: debugging
title: Debugging Your Module
---

## Configuring Your Project

1. In your module's **Debug** settings, set the **Start action** to *Start external program* and specify the path of **Blish HUD.exe**.
2. Under the same settings, set **Command line arguments** to `--debug --module "c:\project-path\bin\x64\Debug\<path-to-your-module-output.bhm"`

You should now be able to run your application. It will generate the *.bhm* file automatically when the project builds. The command-line arguments you specified launch Blish HUD and attach the debugger so you can debug your module. Guild Wars 2 should be running so Blish HUD has something to overlay while you debug. If you prefer not to run Guild Wars 2, adjust the **Command line arguments** to have Blish HUD [overlay a PowerShell window](https://blishhud.com/docs/user/launch-options#overlay-a-different-application-esp-for-testing) for testing.

As long as your project generates a PDB file, it is packaged into your BHM and loaded by the module loader at runtime.

## Runtime Differences When Debugging

Blish HUD behaves differently when you pass the debug flag. In addition to showing extra runtime data in the top right corner, some module error handling is disabled. This ensures exceptions are rethrown so you can address them during development.

## Troubleshooting

<details>
  <summary>Blish HUD closes almost immediately when launched for debugging without an error.</summary>
  <div>
    Blish HUD is likely already open. Make sure there are no other instances of Blish HUD in Task Manager or in your notification area.
  </div>
</details>

<details>
  <summary>Blish HUD indicates that it must be restarted in order to enable your module (Enable and Disable buttons are disabled).</summary>
  <div>
    <p>You are attempting to debug a module that is already in your modules folder. Remove the module from Blish HUD (through the UI or manually at `%userprofile%\Documents\Guild Wars 2\addons\blishhud\modules`) and then launch Blish HUD again using the `--module` parameter.</p>
    <p>You can also keep your regular Blish HUD profile separate from your development environment by using the <a target="_blank" href="/docs/user/launch-options#-s---settings-pathtosettingsdir">`--settings` parameter</a>.</p>
  </div>
</details>