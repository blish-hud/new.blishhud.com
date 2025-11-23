---
id: ensuring-stability
title: Ensuring Stability
---

While Blish HUD does everything it can to avoid crashing when modules misbehave, your module should also catch and handle exceptions appropriately.

With tens of thousands of users, your module will run on many system configurations, security products, and other environmental variables.  Design it to be resilient to these differences.

## Handle exceptions when working with external resources

Whenever you read a file, make a web request, or use any other external resource, be prepared for the resource to be unavailable.

In these scenarios:
- **Wrap calls in try/catch blocks** and handle exceptions appropriately.
- **Notify the user when a failure blocks core functionality.**  For non-critical features, indicate in the UI when a feature is unavailable because an external call failed (and provide details if possible).
- **Provide graceful fallbacks** such as disabling affected features with a note if something fails to load.  Clear messaging prevents confusion when something is temporarily unavailable.
- **Log the issue** using your logger.  Avoid `ERROR` or `FATAL` levels for environmental failures you are already handling to prevent flooding Sentry with reports you cannot directly resolve.
- **Use reasonable retry logic.**  If a failure may be transient, consider a limited retry after a delay or on a spaced interval.  This allows your module to self-heal without thrashing the user's system.

:::info
Use tools like Fiddler to block web API traffic corrupt your settings files to test your exception handling.  These exercises help surface gaps before users encounter them.

The Guild Wars 2 API has experienced notable downtime and disruptions over the years.  Preparing now avoids emergency fixes later when thousands of users are affected at once.
:::

## Look out for symptoms of anti-virus

:::caution To preface
We **do not** attempt to circumvent anti-virus or other security software.  Instead, we try to detect when it interferes and notify the user so they can address it.

We also submit our compiled assemblies to anti-virus vendors for review when we see repeat issues so they can manually approve them.
:::

Even with signed releases, some anti-virus solutions may still block behavior.  Common examples include:

### Failed Web Requests
Trivial web requests can throw unexpected exceptions if outbound requests are blocked by security software.

Wrap all web requests in try/catch blocks and handle exceptions.  When a request specifically returns `HRResult -2147467259`, call `Debug.Contingency.NotifyHttpAccessDenied` to notify the user.  Managed Guild Wars 2 API client calls already handle this check.

### Failed File System Read/Writes
Simple file reads or writes—even to files your module created—can be blocked, including directories other modules write to successfully.

Wrap all file IO in try/catch blocks and handle exceptions.  For file operations that throw `UnauthorizedAccessException`, use `Debug.Contingency.NotifyFileSaveAccessDenied` to alert the user when IO is blocked.
