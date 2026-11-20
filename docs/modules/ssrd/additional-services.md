---
id: additional-services
title: Additional Services
---

## Overview

Beyond release management, SSRD offers services designed to help module developers.

## Static Hosting

Modules can host static content on `bhm.blishhud.com` at no cost. Create a branch in your repository named `bhud-static/modulenamespace`, where `modulenamespace` matches your module's namespace.

SSRD watches these branches along with the rest of your repository, so pushes to them are published automatically, usually within about 10 minutes. Access the hosted files at `https://bhm.blishhud.com/modulenamespace/` using your module's namespace.

Example branch for the Pathing module:<br/>
https://github.com/blish-hud/Pathing/tree/bhud-static/bh.community.pathing

Hosted output:<br/>
https://bhm.blishhud.com/bh.community.pathing/

Example file:<br/>
https://bhm.blishhud.com/bh.community.pathing/wiki/logo.png

In addition to module assets, this hosting can serve static sites, because HTML files are delivered as-is.

- Some file types, such as executables, aren't published.
- Files of a type browsers don't recognise are downloaded rather than displayed.
- If you delete the branch, its hosted files are removed.
