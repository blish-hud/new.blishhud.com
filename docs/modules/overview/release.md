---
id: release
title: Release Your Module
---

## Overview

Blish HUD supports module management through repositories. By default, it references pkgs.blishhud.com, which accepts contributions via PRs to the [bhud-pkgs](https://github.com/blish-hud/bhud-pkgs) repository.

This repository contains the manifest files for Blish HUD modules. Submit manifests for your modules so they can appear in the Blish HUD module viewer. This helps users discover your modules and automatically update them when you publish changes.

## Submitting a Package

:::caution
**This process is deprecated and new module release manifests will no longer be accepted this way.**

Module developers should request a contributor account that grants access to a portal ([SSRD](/docs/modules/ssrd/overview)) for submitting modules. The portal lets you manage releases, release notes, and module profiles more easily.

Please reach out to Freesnöw#0001 on Discord to request access.
:::

To submit a package to the repository, follow these steps:

1. Fork the [bhud-pkgs](https://github.com/blish-hud/bhud-pkgs) repository
2. Author a manifest and place it in the appropriate directory
3. Submit your PR
5. Respond to any feedback

### Authoring a Manifest

The minimal manifest syntax is below. Submit only one manifest per PR.

Ensure that the manifest filename matches the `Version` and that the manifest lives in the folder path `manifests\name\sp\ace\<version>.json` (where `name.sp.ace` is your module's `namespace`). BhudLib (described below) helps ensure your manifest accurately represents your module.

```json
{
    "manifest_version": "1",
    "name": "<module-name>",
    "namespace": "<module-namespace>",
    "version": "<module-version>",
    "contributors": [
        {
            "name":     "<contributor-name>",
            "username": "<contributor-username>",
            "url":      "<contributor-url>"
        }
    ],
    "description": "<module-description>",
    "dependencies": {
        "module1.name": "> 0.5.0",
        "module2.name": "~ 1.0.0"
    },
    "url": "<module-project-url>",
    "location": "https://<module-download-path>.bhm",
    "hash": "<module-checksum>"
}
```

The majority of these fields should directly mirror their corresponding values found in your [module's manifest.json](/docs/modules/overview/update-your-manifest).

### Using BhudLib

To help authors create module package manifests, we provide BhudLib—a PowerShell library. Use it to validate your `.bhm`, create a package manifest, and automatically save it in the correct manifests path.

From start to finish, in PowerShell:

```
# Clone your fork of this repository and create a new branch to work in.
git clone https://github.com/<your-username>/bhud-pkgs.git
git checkout -b yourmodule_version

# Install the BhudLib PowerShell library and import it.
Install-Module BhudLib # (you can ensure it is up to date with `Update-Module BhudLib` if you have installed it previously).
Import-Module BhudLib

# Pass a Url that points directly to your hosted bhm file (which will be used by Blish HUD to later download the module).
$module = Get-BhudModule -Url "https://<url-to-download-your-bhm>.bhm"

# Ensure your module passes validation.
$module.Validate()

# Build the module package manifest.
$pkg = Build-BhudPkgManifest -Url "https://<url-to-download-your-bhm>.bhm"

# See what the package manifest will look like.
$pkg.Get()

# Automatically generate the new manifest file.
Save-BhudPackage -Pkg $pkg -RepoRoot "<path-to-bhud-pkgs-repo>\manifests"

# Stage, commit, and push your changes in preparation for the PR.
git add -A
git commit -S -m "<your-module> <version>" # The message is not strict, it can be what you would like.
git push -u origin yourmodule_version # "yourmodule_version" should match the name of the branch you chose.
```

Once you have pushed your changes, navigate to [the repository on GitHub](https://github.com/blish-hud/bhud-pkgs) and it should prompt you to PR the changes.

### Submit your PR

With the manifest ready, you will need to submit a PR.

#### Validation Process

The PR goes through a validation process that may include automated checks and manual review by maintainers. If issues arise, feedback is posted in the PR and assigned back to you so you can make the necessary changes.

## Credit

Our repo format and process for Blish HUD packages closely mirror [winget-pkgs](https://github.com/microsoft/winget-pkgs), the package repository for [winget](https://docs.microsoft.com/en-us/windows/package-manager/winget/).