import React from 'react';
import { useState, useEffect } from "react";
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import HumanDate from '../components/humanDate';
import BrowserOnly from '@docusaurus/BrowserOnly';

function AutoEmbedYouTube(profile) {
    const ytEmbedPattern = /<a href="https:\/\/(www\.)?youtube\.com.*\/([^"]*)"[^<]+<\/a>/gm;

    let m;

    while ((m = ytEmbedPattern.exec(profile)) !== null) {
        if (m.index === ytEmbedPattern.lastIndex) {
            ytEmbedPattern.lastIndex++;
        }

        profile = profile.replace(m[0], `<iframe width='560' height='315' src='https://www.youtube.com/embed/${m[2]}' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`);
    }

    return profile;
}

function AssignTitleIds(profile) {
    const titlePattern = /<h([0-9]) dir="auto">([^<]*)<\/h[0-9]>/gm;

    let m;

    while ((m = titlePattern.exec(profile)) !== null) {
        if (m.index === titlePattern.lastIndex) {
            titlePattern.lastIndex++;
        }

        profile = profile.replace(m[0], `<h${m[1]} id="${encodeURIComponent(m[2].replaceAll(' ', '-').toLowerCase())}" dir="auto">${m[2]}</h${m[1]}>`);
    }

    return profile;
}

function CleanModuleProfile(profile) {
    profile = AutoEmbedYouTube(profile);
    
    // Currently pointless since the page is rendered too late for anchor links to work.
    //profile = AssignTitleIds(profile);

    return profile;
}

export default function ModuleProfile({ namespace, module }) {
    if (!ExecutionEnvironment.canUseDOM) {
        return <label>Wait...</label>
    }

    if (!module.AuthorProfile) {
        return <label>Loading...</label>
    }

    module.ProfileSource = CleanModuleProfile(module.ProfileSource);

    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash === "profile" || hash === "releases") {
            setActiveTab(hash);
        }
    }, []);

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
                <section class="column is-two-thirds">
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
                        <div class="box external-source" dangerouslySetInnerHTML={{ __html: module.ProfileSource ? module.ProfileSource : "<center><i>No Description</i></center>" }} style={{ borderRadius: "0 0 6px 6px" }}></div>
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
                                                <td>{module.Name} v{release.Version ?? "Unknown"}&nbsp;&nbsp;{ release.IsPrerelease && (<span class="tag is-danger hint--top" data-hint="Prereleases are only visible if you have 'Preview releases' enabled in your Overlay Settings.">Prerelease</span>)}</td>
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
                                width="550" height="275" src={module.MuklukVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
        </div>
    );
}