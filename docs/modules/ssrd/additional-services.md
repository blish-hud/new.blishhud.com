---
id: additional-services
title: Additional Services
---

## Overview

Beyond release management, SSRD offers services designed to help module developers.

## Static Hosting

Modules can host static content on `bhm.blishhud.com` at no cost. Create a branch in your repository named `bhud-static/modulenamespace`, where `modulenamespace` matches your module's namespace.

When your standard [module webhook](registering-modules#webhooks) receives a push, any `bhud-static/*` branches are cloned and hosted automatically. Access the hosted files at `https://bhm.blishhud.com/modulenamespace/` using your module's namespace.

Example branch for the Pathing module:<br/>
https://github.com/blish-hud/Pathing/tree/bhud-static/bh.community.pathing

Hosted output:<br/>
https://bhm.blishhud.com/bh.community.pathing/

Example file:
https://bhm.blishhud.com/bh.community.pathing/wiki/logo.png

In addition to module assets, this hosting can serve static sites because HTML files are delivered as-is.
