---
id: repo-etiquette
title: Repo Etiquette
---

When you decide to release your module through the public repo, there are expectations from both users and maintainers.  Maintaining the Blish HUD module ecosystem is collaborative, so please keep that in mind.

## Public Package Repo Overview

The public package repo is a manifest of every module available to users from within Blish HUD.  New modules and incremental updates are reviewed by humans and the package review bot, so submissions to pkgs-bhud are not automatically accepted.  Reviews may take anywhere from a few minutes to a week depending on availability.

## Maintain Your Namespace

If a module has ever been published to the module repo, you **must never** change its namespace in the manifest.json file.  The namespace uniquely identifies the module for installs, settings, updates, and more.  PRs that change namespaces will be declined because they create a confusing experience for users.

## Blish HUD Dependency Version

Your module should declare a dependency on Blish HUD to indicate supported versions.  For public releases, **DO NOT** depend on unreleased or prerelease Blish HUD builds.  Use our prerelease mechanism to push to the prerelease repo or share prerelease modules in Discord.  Blish HUD releases are infrequent, so you cannot assume new features will be available on your personal timeline.
