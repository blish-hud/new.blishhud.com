---
description: Blish HUD is a non-invasive overlay for Guild Wars 2. We use MumbleLink and the Guild Wars 2 web API to provide data without injecting into your game.
id: how-does-bhud-work
title: How does Blish HUD work?
---

# As an overlay?
Unlike other 3rd-party programs such as ArcDps, GW2 Radial, etc. we do not inject ourselves into the game. Instead, Blish HUD runs as a completely separate program with a transparent background and positions itself over top of your game window to make it look like it's drawing on your game.

# To get realtime data?
Guild Wars 2 provides a realtime API through what is known as [MumbleLink](https://wiki.guildwars2.com/wiki/API:MumbleLink). Intended for [Mumble voice chat](https://www.mumble.info/), this API has since been expanded in Guild Wars 2 to allow 3rd-party applications to get other details straight from the game in a safe and fast way. Information about your character position, camera angles, map positions, current mount, current class, etc. mixed with some math provide us with enough information to make an immersive experience that feels like we're part of the game.

# To get account data?
Guild Wars 2 offers a [web API](https://wiki.guildwars2.com/wiki/API:Main) that allows 3rd-party applications to request details about your account, such as what items you have, guild details, achievement statistics, etc. When authorized with an API key, Blish HUD and modules can make requests to allow for additional functionality.

When you add an API key to Blish HUD, modules do not directly get access to this key. Instead, we utilize the [createsubtoken API endpoint](https://wiki.guildwars2.com/wiki/API:2/createsubtoken) to make a more restricted key on your behalf, which the module can use to make requests. These subtokens are made to expire after a period of time and only include permissions based on what you've allowed Blish HUD to access on the key and what the module itself requested (so you can limit what individual modules are given access to). Blish HUD handles all of this internally and automatically if you provide it with an API key.

API access is optional and many modules will work without issue if you have not granted Blish HUD API access.