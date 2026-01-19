import React from 'react';
import { useState, useEffect } from "react";
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import HumanDate from '../components/humanDate';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function ModuleProfile({ namespace, module }) {
    if (!ExecutionEnvironment.canUseDOM) {
        return <label>Wait...</label>
    }

    if (!module.AuthorProfile) {
        return <label>Loading...</label>
    }

    const [activeTab, setActiveTab] = useState("profile");

    const [modalImageUrl, setModalImageUrl] = useState(null);
    const profileContainerRef = React.useRef(null);

    // Tab and anchor handling.
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (!hash) {
            return;
        }

        // Hash matches a tab: just switch tabs.
        if (hash === "profile" || hash === "releases") {
            setActiveTab(hash);
            return;
        }

        // Hash is an in-page anchor (e.g. #settings) inside the profile.
        // Make sure the profile tab is active so the content is rendered.
        setActiveTab("profile");

        const scrollToAnchor = () => {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                return true;
            }
            return false;
        };

        // Try immediately, and if not found, retry briefly while the DOM settles.
        if (!scrollToAnchor()) {
            const id = window.setInterval(() => {
                if (scrollToAnchor()) {
                    window.clearInterval(id);
                }
            }, 100);

            return () => window.clearInterval(id);
        }
    }, [module.ProfileSource]);

    // Image modal handling.
    useEffect(() => {
        // Only attach while the profile tab is actually rendered
        if (activeTab !== "profile") return;

        const el = profileContainerRef.current;
        if (!el) return;

        const onClick = (e) => {
            const a = e.target.closest?.("a");
            if (!a) return;

            const img = a.querySelector("img");
            if (!img) return;

            const hrefAttr = a.getAttribute("href");
            const srcAttr = img.getAttribute("src");
            if (!hrefAttr || !srcAttr) return;

            const href = new URL(hrefAttr, window.location.href).href;
            const src = new URL(srcAttr, window.location.href).href;

            if (href === src) {
            e.preventDefault();
            e.stopPropagation();
            setModalImageUrl(src);
            }
        };

        el.addEventListener("click", onClick, true);
        return () => el.removeEventListener("click", onClick, true);
    }, [activeTab, module.ProfileSource]);

    // Image modal esc/scroll lock handling.
    useEffect(() => {
        if (!modalImageUrl) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") setModalImageUrl(null);
        };

        document.addEventListener("keydown", onKeyDown);

        // scroll lock
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [modalImageUrl]);

    const changeTab = (tab) => {
        setActiveTab(tab);
        window.location.replace(`#${tab}`);
    };

    return (
        <div class="container">
            <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                <li><a href="/modules">Modules</a></li>
                <li class="is-active"><a aria-current="page">{module.Name}</a></li>
                </ul>
            </nav>
            <section class="hero">
                <div class="media">
                    <div class="media-left" style={{ marginRight: "1.5rem" }}>
                        <figure class="">
                            <img src={ `https://pkgs.blishhud.com/metadata/img/module/${namespace}.png` } alt="Module image" width="128" height="128" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/156027x2.png";
                            }} style={{ borderRadius: "6px" }} />
                        </figure>
                    </div>
                    <div class="hero-body" style={{ padding: "0.75rem 0" }}>
                        <p class="title">
                            { module.Name }
                        </p>
                        <p class="subtitle" style={{ marginTop: 0 }}>
                            <div class="level">
                                <div class="level-left">
                                    { true && (
                                        <div class="level-item">
                                            <div>
                                                <p class="heading">Module Author</p>
                                                <a class="media" href={`/modules?author=${module.AuthorProfile.DisplayName}`} style={{ paddingTop: 0, border: "none" }}>
                                                    <div class="media-left" style={{ marginRight: "0.25rem" }}>
                                                        <figure class="image is-24x24 is-rounded">
                                                            <img src={`https://pkgs.blishhud.com/metadata/img/author/${module.AuthorProfile.Id}.png`} class="is-rounded" alt="Module Author Image" onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://assets.gw2dat.com/733268.png";
                                                            }} />
                                                        </figure>
                                                    </div>
                                                    <div class="media-content">
                                                        <p>{module.AuthorProfile.DisplayName}</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    <div class="level-item">
                                        <div>
                                            <p class="heading">Downloads</p>
                                            <p>{ module.Downloads > 0 
                                                                ? module.Downloads.toLocaleString() 
                                                                : "Unknown" }</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                            <p class="heading">Last Updated</p>
                                            <p><HumanDate classes='hint--bottom' timestamp={ module.LastRelease } /></p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                            <p class="heading">Latest Release</p>
                                            <p>v{module.Version ?? "Unknown"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="level-right">
                                    { module.IssueUrl != null && 
                                        <p class="level-item"><a target="_blank" href={module.IssueUrl} class="button" style={{ backgroundColor: "#232833", color: "white" }}>Report a Bug</a></p>
                                    }
                                    { module.SuggestionsUrl != null &&
                                        <p class="level-item"><a target="_blank" href={module.SuggestionsUrl} class="button" style={{ backgroundColor: "#232833", color: "white" }}>Suggest an Idea</a></p>
                                    }                                    
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </section>
            { module.OnlyPrereleaseAvailable && (
                <div class="notification is-warning" style={{ marginTop: "1rem" }}>
                    This module is only available as a prerelease.  Prereleases are only visible in the <strong>Module Repo</strong> if you have <strong>'Preview releases'</strong> enabled in your <strong>Overlay Settings</strong>.
                </div>
            )}
            <div class="columns" style={{ marginTop: "1rem" }}>
                <section className={`column ${module.MuklukVideo != null || module.AuthorProfile.GuildWars2Profile != null || module.AuthorProfile.GithubProfile != null || module.AuthorProfile.KofiProfile != null ? "is-two-thirds" : "is-full"}`}>
                    <div className="tabs is-boxed" style={{ marginBottom: 0 }}>
                        <ul>
                            <li className={activeTab === "profile" ? "is-active" : ""} onClick={() => changeTab("profile")} >
                                <a><span>Module Description</span></a>
                            </li>
                            { module.Releases != null && (
                                <li className={activeTab === "releases" ? "is-active" : ""} onClick={() => changeTab("releases")} >
                                    <a><span>Releases</span></a>
                                </li>
                            )}
                        </ul>
                    </div>

                    { activeTab == "profile" && (
                        <div class="box external-source" ref={profileContainerRef} dangerouslySetInnerHTML={{ __html: module.ProfileSource ? module.ProfileSource : "<center><i>No Description</i></center>" }} style={{ borderRadius: "0 0 6px 6px" }}></div>
                    )}

                    { activeTab == "releases" && (
                        <div class="box external-source" style={{ borderRadius: "0 0 6px 6px" }}>
                            <div class="notification is-info">
                                For the best experience, download modules through the Blish HUD <strong>Module Repo</strong>.  If you download a module file (.bhm) with your browser, you will need to <a target="_blank" href="/docs/user/installing-modules#manually-installing-modules">install it manually</a>.
                            </div>
                            <table class="table" style={{ fontSize: "0.9rem", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th style={{ textTransform:"uppercase", letterSpacing: "1px" }}>Version</th>
                                        <th style={{ textTransform:"uppercase", letterSpacing: "1px" }}>Release Date</th>
                                        <th style={{ textTransform:"uppercase", letterSpacing: "1px" }}>Downloads</th>
                                        <th style={{ textTransform:"uppercase", letterSpacing: "1px" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { module.Releases.map(release => (
                                        <React.Fragment key={release.Version}>
                                            <tr style={{ backgroundColor: "#232833" }}>
                                                <td style={{ whiteSpace: "nowrap" }}>{module.Name} v{release.Version ?? "Unknown"}&nbsp;&nbsp;{ release.IsPrerelease && (<span class="tag is-danger hint--top" data-hint="Prereleases are only visible if you have 'Preview releases' enabled in your Overlay Settings.">Prerelease</span>)}</td>
                                                <td><HumanDate classes='hint--bottom' style={{ marginBottom: 0 }} timestamp={ release.ReleaseTimestamp } /></td>
                                                <td>{ release.Downloads > 0 ? release.Downloads.toLocaleString() : "Unknown" }</td>
                                                <td>
                                                    <a target="_blank" rel="noreferrer noopener" href={release.DownloadUrl} class="" style={{ color: "white" }}>Download</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: "left", fontSize: "0.85rem", paddingBottom:"1.25rem" }}>
                                                    <span dangerouslySetInnerHTML={{ __html: release.ChangeLogSource ? release.ChangeLogSource : "<center><i>No Description</i></center>" }}></span>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
                
                <section class="column is-one-third">
                    { module.MuklukVideo != null &&
                        <div class="card" style={{ marginBottom: "1em" }}>
                            <header class="card-header">
                                <p class="card-header-title">
                                    Mukluk Showcase
                                </p>
                            </header>
                            <div class="card-content" style={{ padding: "0", position: "relative", width: "100%", height: "0", paddingBottom: "56.25%" }}>
                                <iframe 
                                style={{ position: "absolute", width: "100%", height: "100%", left: "0", top: "0" }}
                                width="550" height="275" src={module.MuklukVideo} title="YouTube video player" frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                        </div>
                    }

                    { (module.AuthorProfile.GuildWars2Profile != null ||
                       module.AuthorProfile.GithubProfile != null ||
                       module.AuthorProfile.KofiProfile != null) && (
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    {module.AuthorProfile.DisplayName}'s Developer Profile
                                </p>
                            </header>
                            <div class="card-content">
                                { false && (
                                    <a class="media" href={`/modules?author=${module.AuthorProfile.DisplayName}`}>
                                        <div class="media-left">
                                            <figure class="image is-48x48 is-rounded">
                                                <img src={`https://pkgs.blishhud.com/metadata/img/author/${module.AuthorProfile.Id}.png`} class="is-rounded" alt="Module Author Image" onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://assets.gw2dat.com/733268.png";
                                                }} />
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4" style={{ lineHeight: "48px"}}>{module.AuthorProfile.DisplayName}</p>
                                        </div>
                                    </a>
                                )}

                                <div class="content">
                                    { module.AuthorProfile.GuildWars2Profile != null &&
                                        <div class="field has-addons">
                                            <span class="control">
                                                <a class="button is-static" style={{width: "180px"}}>
                                                    <i class="fa fa-dragon"></i>&nbsp;&nbsp;Guild Wars 2
                                                </a>
                                            </span>
                                            <span class="control is-expanded">
                                                <a target="_blank" class="button">{module.AuthorProfile.GuildWars2Profile}</a>
                                            </span>
                                        </div>
                                    }
                                    { module.AuthorProfile.GithubProfile != null &&
                                        <div class="field has-addons">
                                            <span class="control">
                                                <a class="button is-static" style={{width: "180px"}}>
                                                    <i class="fab fa-github"></i>&nbsp;&nbsp;GitHub Profile
                                                </a>
                                            </span>
                                            <span class="control is-expanded">
                                                <a target="_blank" href={`https://github.com/${module.AuthorProfile.GithubProfile}`} class="button">{module.AuthorProfile.GithubProfile}</a>
                                            </span>
                                        </div>
                                    }
                                    { module.AuthorProfile.KofiProfile != null &&
                                        <div class="field has-addons">
                                            <span class="control">
                                                <a class="button is-static" style={{width: "180px"}}>
                                                    <i class="fa fa-heart"></i>&nbsp;&nbsp;Donate on Ko-Fi
                                                </a>
                                            </span>
                                            <span class="control is-expanded">
                                                <a target="_blank" href={`https://ko-fi.com/${module.AuthorProfile.KofiProfile}`} class="button">{module.AuthorProfile.KofiProfile}</a>
                                            </span>
                                        </div>
                                    }
                                    { module.AuthorProfile.KofiProfile != null &&
                                        <div class="field has-addons">
                                            <iframe id='kofiframe' src={`https://ko-fi.com/${module.AuthorProfile.KofiProfile}/?hidefeed=true&widget=true&embed=true&preview=true`} style={{ border: "none", width: "100%", padding: "4px", background: "#f9f9f9", borderRadius: "4px", "min-width": "300px" }} height='660' title={`${module.AuthorProfile.KofiProfile}`}></iframe>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            {modalImageUrl && (
                <div
                    onClick={(e) => {
                    // close only when clicking the backdrop (outside the image)
                    if (e.target === e.currentTarget) setModalImageUrl(null);
                    }}
                    style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.85)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    }}
                >
                    <img
                    src={modalImageUrl}
                    alt=""
                    style={{
                        maxWidth: "95vw",
                        maxHeight: "95vh",
                        objectFit: "contain",
                        borderRadius: "8px",
                    }}
                    />
                </div>
            )}
        </div>
    );
}