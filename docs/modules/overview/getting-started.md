---
id: getting-started
title: Getting Started
---

[![Discord](https://img.shields.io/badge/Join_Our_Discord-📦module_discussion-Green)](https://discord.gg/HzAV82d)

## Overview

Blish HUD module projects can be cloned from our example module, by using a Visual Studio project template, or from scratch. Cloning the example module template is the recommended approach. All three methods are described below—choose one path and follow it fully.

## Setup Using the Example Module

1. Download or clone the [Example Module repo](https://github.com/blish-hud/Example-Blish-HUD-Module).
2. Open the project in Visual Studio and update the Project Name and the namespaces.
3. Change the executablePath in \ExampleBlishhudModule\Properties\launchSettings.json to point to your copy of the `Blish HUD.exe`.

:::info

The example module comes with a number of examples so that you can see certain Blish HUD features in action.  Once you're ready to work on your module, you can remove the example code from the module.

:::

## Setup Using the Module Template for Visual Studio

1. Install the latest Visual Studio module template for your Visual Studio version:
   - [Template for Visual Studio 2019](/downloads/ModuleTemplateDeployment2019.vsix)
   - [Template for Visual Studio 2022](/downloads/ModuleTemplateDeployment2022.vsix)
2. Create a new project in Visual Studio using the template.
   - *Note: On the "Configure your new project" step of the project wizard, make sure to enter the desired project name.*
   - *Note: On the "Configure your new project" step of the project wizard, you **must** select "Place solution and project in the same directory".*
3. When you open the Package Manager Console, you should see a prompt that says, "Some NuGet packages are missing from this solution. Click to restore from your online package sources." Click the restore button to download the NuGet packages.
4. Run `Update-Package` in the Package Manager Console to update all NuGet packages to the latest versions.

:::info

The template attempts to auto-fill your manifest, namespaces, and related details. Review these fields to ensure they match your preferences.

:::

## Setup From Scratch

1. Create a new .NET Framework Class Library project.
2. Add a reference to the latest version of Blish HUD to your project (`Install-Package BlishHUD`).
3. Set **Copy Local** to **False** for the Blish HUD reference and all of its dependencies in the reference properties.
   - Otherwise, your build will package these assemblies with your module.
     - This makes the module unnecessarily large because it would include the entire Blish HUD assembly.
     - Blish HUD already has these assemblies loaded, so you do not need to ship them.
