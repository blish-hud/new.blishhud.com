import React, { useMemo, useState } from "react";

type EndpointKey = "tokeninfo" | "account" | "characters";

type CallResult =
  | {
      state: "idle";
    }
  | {
      state: "loading";
    }
  | {
      state: "success";
      status: number;
      data: any;
      ms: number;
    }
  | {
      state: "error";
      status?: number;
      error: string;
      details?: any;
      ms: number;
    };

type Results = Record<EndpointKey, CallResult>;

const API_BASE = "https://api.guildwars2.com/v2";

async function safeReadJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // sometimes APIs return plain text on errors
  }
}

async function callEndpoint(url: string): Promise<Omit<Extract<CallResult, { state: "success" | "error" }>, "ms"> & { ms: number }> {
  const start = performance.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const ms = Math.round(performance.now() - start);
    const body = await safeReadJson(res);

    if (!res.ok) {
      const msg =
        (body && typeof body === "object" && (body.text || body.error || body.message)) ||
        (typeof body === "string" ? body : "") ||
        res.statusText ||
        "Request failed";

      return {
        state: "error",
        status: res.status,
        error: String(msg),
        details: body,
        ms,
      };
    }

    return {
      state: "success",
      status: res.status,
      data: body,
      ms,
    };
  } catch (e: any) {
    const ms = Math.round(performance.now() - start);
    return {
      state: "error",
      error: e?.message || "Network error (fetch threw)",
      details: e,
      ms,
    };
  }
}

function buildUrls(key: string) {
  const k = encodeURIComponent(key.trim());
  return {
    tokeninfo: `${API_BASE}/tokeninfo?access_token=${k}`,
    account: `${API_BASE}/account?access_token=${k}`,
    characters: `${API_BASE}/characters?ids=all&access_token=${k}`,
  } as const;
}

function classify(results: Results) {
  const t = results.tokeninfo;
  const a = results.account;
  const c = results.characters;

  // Helper: pull common HTTP codes
  const ts = t.state === "error" ? t.status : t.state === "success" ? t.status : undefined;
  const as = a.state === "error" ? a.status : a.state === "success" ? a.status : undefined;
  const cs = c.state === "error" ? c.status : c.state === "success" ? c.status : undefined;

  // Not run yet
  if ([t, a, c].every((r) => r.state === "idle")) {
    return { level: "info" as const, title: "Run the checks", bullets: ["Paste a key and click Run checks."] };
  }

  // Still running
  if ([t, a, c].some((r) => r.state === "loading")) {
    return { level: "info" as const, title: "Checking…", bullets: ["Waiting for responses."] };
  }

  // Tokeninfo failed => key is invalid/expired/typo OR GW2 API rejecting it
  if (t.state === "error") {
    if (ts === 401 || ts === 403) {
      return {
        level: "error" as const,
        title: "The API key is not accepted",
        bullets: [
          "This usually means the key is wrong, revoked, or expired.",
          "Double-check you pasted the full key (no extra spaces).",
          "Generate a new key and try again.",
        ],
      };
    }
    return {
      level: "error" as const,
      title: "Token validation failed",
      bullets: [
        "The tokeninfo endpoint didn’t return a valid response.",
        "If this is a network/CORS issue, try another browser or disable blocking extensions.",
        "If the Guild Wars 2 API is down, retry later.",
      ],
    };
  }

  // Tokeninfo ok, but account fails => missing permissions OR weird account state
  if (t.state === "success" && a.state === "error") {
    if (as === 401 || as === 403 || as === 500) {
      return {
        level: "warn" as const,
        title: "Key is valid, but can’t access /account",
        bullets: [
          "Key looks real (tokeninfo succeeded), but /account didn't load correctly."
        ],
      };
    }
    return {
      level: "warn" as const,
      title: "Key is valid, but /account errored",
      bullets: [
        "Token is accepted, but /account request failed for another reason.",
        "Check the error details shown below.",
        "Retry; if it persists, it may be a transient API issue that you'll need to wait until it resolves.",
      ],
    };
  }

  // Account ok, but characters fails => missing 'characters' permission/scope
  if (a.state === "success" && c.state === "error") {
    if (cs === 401 || cs === 403) {
      return {
        level: "warn" as const,
        title: "Account works, but characters are forbidden",
        bullets: [
          "Your key can read /account but not /characters.",
          "Most common cause: missing 'characters' permission on the key.",
          "Fix: re-create the key and enable the characters permission.",
          "Retry; if it persists, it may be a transient API issue that you'll need to wait until it resolves.",
        ],
      };
    }
    return {
      level: "warn" as const,
      title: "Account works, but /characters errored",
      bullets: [
        "Key is valid and can read /account, but /characters request failed.",
        "Check the error details shown below.",
        "Retry; if it persists, it may be a transient API issue that you'll need to wait until it resolves.",
      ],
    };
  }

  // All good
  if (t.state === "success" && a.state === "success" && c.state === "success") {
    const charCount = Array.isArray(c.data) ? c.data.length : undefined;
    return {
      level: "success" as const,
      title: "API key looks healthy",
      bullets: [
        "tokeninfo, account, and characters all succeeded.",
        charCount !== undefined ? `Characters returned: ${charCount}` : "Characters returned successfully.",
      ],
    };
  }

  // Fallback
  return {
    level: "info" as const,
    title: "Mixed results",
    bullets: ["Some calls succeeded and some failed—use the per-endpoint details below."],
  };
}

function Badge({ level }: { level: "info" | "warn" | "error" | "success" }) {
  const style: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      border: "1px solid var(--ifm-color-emphasis-300)",
      background: "var(--ifm-background-surface-color)",
    };
    if (level === "success") return { ...base, borderColor: "var(--ifm-color-success)", color: "var(--ifm-color-success)" };
    if (level === "warn") return { ...base, borderColor: "var(--ifm-color-warning)", color: "var(--ifm-color-warning)" };
    if (level === "error") return { ...base, borderColor: "var(--ifm-color-danger)", color: "var(--ifm-color-danger)" };
    return base;
  }, [level]);

  const text = level === "success" ? "OK" : level === "warn" ? "WARN" : level === "error" ? "ERROR" : "INFO";
  return <span style={style}>{text}</span>;
}

function ResultBlock({ name, result }: { name: EndpointKey; result: CallResult }) {
  const title =
    name === "tokeninfo" ? "/tokeninfo" : name === "account" ? "/account" : name === "characters" ? "/characters?ids=all" : name;

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: 12,
        padding: 12,
        background: "var(--ifm-background-surface-color)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          {result.state === "loading" ? "Loading…" : result.state === "idle" ? "Idle" : `${result.ms}ms`}
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 14 }}>
        {result.state === "idle" && <div>Not run.</div>}

        {result.state === "loading" && <div>Request in progress…</div>}

        {result.state === "success" && (
          <>
            <div>
              <strong>Status:</strong> {result.status}
            </div>
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: "pointer" }}>Response JSON</summary>
              <pre style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{JSON.stringify(result.data, null, 2)}</pre>
            </details>
          </>
        )}

        {result.state === "error" && (
          <>
            <div>
              <strong>Status:</strong> {result.status ?? "—"}
            </div>
            <div style={{ marginTop: 6 }}>
              <strong>Error:</strong> {result.error}
            </div>
            {result.details !== undefined && (
              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: "pointer" }}>Error details</summary>
                <pre style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{JSON.stringify(result.details, null, 2)}</pre>
              </details>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ApiKeyTroubleshooter() {
  const [apiKey, setApiKey] = useState("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Results>({
    tokeninfo: { state: "idle" },
    account: { state: "idle" },
    characters: { state: "idle" },
  });

  const summary = classify(results);

  async function run() {
    const key = apiKey.trim();
    if (!key) return;

    setRunning(true);
    setResults({
      tokeninfo: { state: "loading" },
      account: { state: "loading" },
      characters: { state: "loading" },
    });

    const urls = buildUrls(key);

    // Run in parallel; tokeninfo is still useful even if others fail.
    const [t, a, c] = await Promise.all([
      callEndpoint(urls.tokeninfo),
      callEndpoint(urls.account),
      callEndpoint(urls.characters),
    ]);

    setResults({
      tokeninfo: t.state === "success" ? t : t,
      account: a.state === "success" ? a : a,
      characters: c.state === "success" ? c : c,
    });

    setRunning(false);
  }

  function reset() {
    setApiKey("");
    setRunning(false);
    setResults({
      tokeninfo: { state: "idle" },
      account: { state: "idle" },
      characters: { state: "idle" },
    });
  }

  const canRun = apiKey.trim().length > 0 && !running;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: 12,
          padding: 12,
          background: "var(--ifm-background-surface-color)",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 6 }}>API Key Troubleshooter</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 10 }}>
          Enter your Guild Wars 2 API Key.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste API key…"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: "1 1 320px",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: "var(--ifm-background-color)",
              color: "var(--ifm-font-color-base)",
            }}
          />
          <button
            onClick={run}
            disabled={!canRun}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--ifm-color-primary)",
              background: canRun ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-200)",
              color: canRun ? "white" : "var(--ifm-font-color-base)",
              fontWeight: 700,
              cursor: canRun ? "pointer" : "not-allowed",
            }}
          >
            {running ? "Running…" : "Run checks"}
          </button>
          <button
            onClick={reset}
            disabled={running && apiKey.trim().length > 0}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: "transparent",
              color: "var(--ifm-font-color-base)",
              fontWeight: 700,
              cursor: running ? "not-allowed" : "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: 12,
          padding: 12,
          background: "var(--ifm-background-surface-color)",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Badge level={summary.level} />
          <div style={{ fontWeight: 800 }}>{summary.title}</div>
        </div>
        <ul style={{ marginTop: 8, marginBottom: 0 }}>
          {summary.bullets.map((b, i) => (
            <li key={i} style={{ marginTop: 6 }}>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <ResultBlock name="tokeninfo" result={results.tokeninfo} />
        <ResultBlock name="account" result={results.account} />
        <ResultBlock name="characters" result={results.characters} />
      </div>
    </div>
  );
}