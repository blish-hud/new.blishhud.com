---
id: bhm
title: .bhm Package
---

## Introduction

Modules are packaged in `.bhm` (Blish HUD Module) files.  They are simply ZIP files with a custom extension.  Module packages can contain textures, audio, compiled assemblies, a manifest, and anything else needed by the module.  This format allows modules to be passed around easily as they are just a single file and don't require anything more than being placed in the Modules directory in order to be loaded by Blish HUD.

## Package Contents

Modules by default contain the following:
- **manifest.json** — a JSON manifest which describes the module and provides metadata necessary for Blish HUD to load the module.
- **&lt;module-name&gt;.dll** — the compiled module's assembly.
- **ref\\** — a directory which holds all textures and other assets that the module will need to load at runtime.

:::note

Module projects have post build tasks (PowerShell scripts or MSBuild tasks) that automatically package the module and place it in the default modules directory.  You do not have to generate .bhm packages by hand.

:::

### Dependencies

Dependent assemblies must be included in the root directory of the package.  Blish HUD will automatically identify and load dependent assemblies when they are requested by the module by looking for the associated DLL in the root of the module.

### PDBs

It is recommended that you include PDB files in your published modules to help when users get errors while using your module.  When a module's DLL is loaded, Blish HUD checks for a PDB of the same name in the root of the module (e.g. **&lt;module-name&gt;.pdb**).  If a matching file is found, it is loaded in with your module.