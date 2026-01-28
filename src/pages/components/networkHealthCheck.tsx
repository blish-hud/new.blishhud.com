import React, { useState, useMemo } from "react";

type ResourceType = "image" | "json" | "binary";

interface ResourceDef {
    id: string;
    name: string;
    url: string;
    type: ResourceType;
}

const RESOURCES: ResourceDef[] = [
    { id: "img_1", name: "Example Asset 1 (456011)", url: "https://assets.gw2dat.com/456011.png", type: "image" },
    { id: "img_2", name: "Example Asset 2 (1822111)", url: "https://assets.gw2dat.com/1822111.png", type: "image" },
    { id: "img_3", name: "Example Asset 3 (1822021)", url: "https://assets.gw2dat.com/1822021.png", type: "image" },
    { id: "img_4", name: "Example Asset 4 (63328)", url: "https://assets.gw2dat.com/63328.png", type: "image" },
    { id: "cdn_meta", name: "Asset CDN Metadata", url: "https://assets.gw2dat.com/metadata.gz", type: "binary" },
    { id: "repo_live", name: "Module Repo Listing", url: "https://pkgs.blishhud.com/packages.gz", type: "binary" },
    { id: "repo_prev", name: "Module Repo Prerelease", url: "https://pkgs.blishhud.com/preview-packages.gz", type: "binary" },
    { id: "ver_check", name: "Update Check", url: "https://versions.blishhud.com/all.json", type: "json" },
];

type CheckResult =
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success"; status: number; ms: number; previewUrl?: string }
    | { state: "error"; status?: number; error: string; ms: number };

type ResultsMap = Record<string, CheckResult>;

async function checkResource(def: ResourceDef): Promise<CheckResult> {
    const start = performance.now();
    try {
        // We use a simple GET. For binary/images we want the blob to avoid parsing errors.
        const res = await fetch(def.url, {
            method: "GET",
            cache: "no-store" // force fresh request to test current network conditions
        });

        const ms = Math.round(performance.now() - start);

        if (!res.ok) {
            return {
                state: "error",
                status: res.status,
                error: res.statusText || "Request failed",
                ms,
            };
        }

        let previewUrl: string | undefined;

        // If it's an image, let's create a blob URL to display it
        if (def.type === "image") {
            const blob = await res.blob();
            previewUrl = URL.createObjectURL(blob);
        } else {
            // For others, we just need to ensure the body finished downloading
            await res.blob();
        }

        return {
            state: "success",
            status: res.status,
            ms,
            previewUrl,
        };
    } catch (e: any) {
        const ms = Math.round(performance.now() - start);
        return {
            state: "error",
            error: e?.message || "Network error (fetch threw)",
            ms,
        };
    }
}

function generateReport(results: ResultsMap): string {
    const unixTime = Math.floor(Date.now() / 1000);

    const lines = [`[Network Health Check Report](https://blishhud.com/docs/user/tools/network-troubleshooting) - <t:${unixTime}:R>`];
    lines.push("");

    RESOURCES.forEach((r) => {
        const res = results[r.id];

        let icon = "⚪";
        let statusLine = `**${r.name}**\nStatus: Pending`;

        if (res.state === "success") {
            icon = "✅";
            statusLine = `**${r.name}**\nLatency: \`${res.ms}ms\` | Status: \`${res.status}\``;
        } else if (res.state === "error") {
            icon = "❌";
            statusLine = `**${r.name}**\nLatency: \`${res.ms}ms\` | Status: \`${res.status ?? "N/A"}\`\n> Error: ${res.error}`;
        } else if (res.state === "idle") {
            icon = "⚪";
            statusLine = `**${r.name}** (Skipped)`;
        }

        lines.push(`${icon} ${statusLine}`);

        // Wrap URL in <> to suppress Discord embed previews
        lines.push(`<${r.url}>`);
        lines.push("");
    });

    return lines.join("\n");
}

function Badge({ state }: { state: CheckResult["state"] }) {
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
        if (state === "success") return { ...base, borderColor: "var(--ifm-color-success)", color: "var(--ifm-color-success)" };
        if (state === "error") return { ...base, borderColor: "var(--ifm-color-danger)", color: "var(--ifm-color-danger)" };
        if (state === "loading") return { ...base, borderColor: "var(--ifm-color-info)", color: "var(--ifm-color-info)" };
        return base;
    }, [state]);

    const text = state === "success" ? "OK" : state === "error" ? "FAIL" : state === "loading" ? "..." : "IDLE";
    return <span style={style}>{text}</span>;
}

function ResourceBlock({ def, result }: { def: ResourceDef; result: CheckResult }) {
    return (
        <div
            style={{
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: 12,
                padding: 12,
                background: "var(--ifm-background-surface-color)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{def.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                    {result.state === "loading" ? "Testing…" : result.state === "idle" ? "" : `${result.ms}ms`}
                </div>
            </div>

            <div style={{ fontSize: 12, opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {def.url}
            </div>

            <div>
                <Badge state={result.state} />
                {result.state === "error" && (
                    <span style={{ marginLeft: 8, fontSize: 12, color: "var(--ifm-color-danger)" }}>
                        {result.error} (Status: {result.status})
                    </span>
                )}
            </div>

            {result.state === "success" && result.previewUrl && (
                <div style={{ marginTop: 4, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', borderRadius: 6 }}>
                    <img
                        src={result.previewUrl}
                        alt="Preview"
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                    />
                </div>
            )}
        </div>
    );
}

export default function NetworkHealthCheck() {
    const [running, setRunning] = useState(false);
    const [copied, setCopied] = useState(false);

    // Initialize all results to idle
    const [results, setResults] = useState<ResultsMap>(() => {
        const initial: ResultsMap = {};
        RESOURCES.forEach((r) => { initial[r.id] = { state: "idle" }; });
        return initial;
    });

    async function runChecks() {
        setRunning(true);
        setCopied(false);

        // Set all to loading
        const loadingState: ResultsMap = {};
        RESOURCES.forEach((r) => { loadingState[r.id] = { state: "loading" }; });
        setResults(loadingState);

        // Run in parallel
        const promises = RESOURCES.map(async (def) => {
            const res = await checkResource(def);
            return { id: def.id, res };
        });

        const outcomes = await Promise.all(promises);

        // Update state with results
        const finalState: ResultsMap = {};
        outcomes.forEach((o) => {
            finalState[o.id] = o.res;
        });

        setResults(finalState);
        setRunning(false);
    }

    function handleCopy() {
        const text = generateReport(results);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    const hasRun = Object.values(results).some(r => r.state !== "idle" && r.state !== "loading");

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
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Connectivity & Asset Troubleshooter</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 10 }}>
                    Check your connection to Blish HUD servers and asset CDNs.
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                        onClick={runChecks}
                        disabled={running}
                        style={{
                            padding: "10px 16px",
                            borderRadius: 10,
                            border: "1px solid var(--ifm-color-primary)",
                            background: !running ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-200)",
                            color: !running ? "white" : "var(--ifm-font-color-base)",
                            fontWeight: 700,
                            cursor: !running ? "pointer" : "not-allowed",
                            flex: "1 1 auto",
                            maxWidth: "200px"
                        }}
                    >
                        {running ? "Testing..." : "Run Network Test"}
                    </button>

                    {hasRun && (
                        <button
                            onClick={handleCopy}
                            style={{
                                padding: "10px 16px",
                                borderRadius: 10,
                                border: "1px solid var(--ifm-color-emphasis-300)",
                                background: "transparent",
                                color: "var(--ifm-font-color-base)",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            {copied ? "Copied!" : "Copy Test Results"}
                        </button>
                    )}
                </div>
            </div>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {RESOURCES.map((def) => (
                    <ResourceBlock key={def.id} def={def} result={results[def.id]} />
                ))}
            </div>
        </div>
    );
}