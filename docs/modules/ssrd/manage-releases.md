---
id: manage-releases
title: Manage Releases
---

## Overview

SSRD lets you submit releases to the Blish HUD module repository and manage releases that already exist.

## Submit a new release

Select **Publish** and choose the target repository to start a release.

<img src="/img/docs/ssrd/mr1.png" width="500"/>

After you choose a target, SSRD builds your module and opens a package manifest PR in the selected repository.

### Publish to the public repo

Releases in the public repo are visible to all Blish HUD users.

### Publish to the prerelease repo

Releases in the prerelease repo are visible only to users who enable [Preview releases](https://blishhud.com/docs/user/overlay-settings#:~:text=Blish%20HUD%20window.-,Preview%20releases,-No). Use prerelease builds to test major changes with a smaller audience before wider deployment.

## Set release notes

Release notes help users understand what changed in each version. They are shared in the [🎉release-feed](https://discord.gg/ryWP5Ct89S) Discord channel and on https://blishhud.com/.

<img src="/img/docs/ssrd/mr2.png" width="400"/>

You can edit release notes at any time. Updates propagate to both Discord and the website.

## Release listing modifiers

<details>
    <summary>Toggle Release Listing</summary>
    <div>
        Hide a module release from Blish HUD. Hidden releases do not appear in the module repo and can reduce clutter in the version dropdown.
    </div>
</details>

<details>
    <summary>Spoil Release</summary>
    <div>
        <p><strong>ONLY AN ADMIN CAN UN-SPOIL A RELEASE.</strong></p>
        <p>
            Spoiling fully recalls a release for all users:
            <ul>
                <li>The release is no longer available for download in Blish HUD's module repo.</li>
                <li>Users cannot enable the module under any circumstance, even if it was previously downloaded and enabled.</li>
            </ul>
        </p>
        <p>Spoil a release when it causes widespread unhandled or fatal exceptions that crash Blish HUD.</p>
    </div>
</details>

<details>
    <summary>Delete Release</summary>
    <div>
        <p><i>Currently only available prior to a release being merged.</i></p>
        <p>Delete a release from SSRD. To submit a new release afterward, bump the version number to avoid artifact naming conflicts</p>
    </div>
</details>
