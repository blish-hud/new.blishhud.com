import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import ModuleCard from './module/moduleCard';
import ModuleProfile from './module/moduleProfile';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Loading from '@theme/Loading';

function sortModules(modules, sortMethod) {
    const sortableModules = [...modules];

    switch (sortMethod) {
        case "Downloads":
            return sortableModules.sort((a, b) => b.Downloads - a.Downloads);
        case "A to Z":
            return sortableModules.sort((a, b) => a.Name.localeCompare(b.Name));
        case "Z to A":
            return sortableModules.sort((a, b) => b.Name.localeCompare(a.Name));
        case "Last Update":
            return sortableModules.sort((a, b) => new Date(b.LastUpdate) - new Date(a.LastUpdate));
        default:
            return sortableModules;
    }
}

function ModuleList({ modules, sortMethod, onSortChange, searchQuery, setSearchQuery, isAuthor = false }) {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    const darkInputStyle = {
        backgroundColor: '#242526',
        color: 'white',
        borderColor: '#444'
    };

    const filteredModules = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return modules;

        return modules.filter((m) =>
            (m.Name && m.Name.toLowerCase().includes(query)) ||
            (m.Summary && m.Summary.toLowerCase().includes(query)) ||
            (m.AuthorName && m.AuthorName.toLowerCase().includes(query))
        );
    }, [modules, searchQuery]);

    const sortedModules = useMemo(() => {
        return sortModules(filteredModules, sortMethod);
    }, [filteredModules, sortMethod]);

    let pageTitle = "Modules";
    let pageDescription = siteConfig.tagline;
    let pageImage = null;

    if (isAuthor) {
        if (sortedModules.length > 0) {
            const authorName = sortedModules[0].AuthorName;

            pageTitle = `Modules by ${authorName}`;
            pageDescription = sortedModules.length > 1
                ? `Check out ${sortedModules.length} modules developed by ${authorName}.`
                : `Check out modules developed by ${authorName}.`;

            pageImage = sortedModules[0].AuthorAvatar;
        } else {
            pageTitle = "Unknown Author";
            pageDescription = "No modules could be found.";
        }
    }

    return (
        <Layout
            title={pageTitle}
            description={pageDescription}>
            <Head>
                <meta name="keywords" content="Guild Wars 2, gw2, Blish, HUD, bhud, TacO, Overlay" />
                {pageImage != null &&
                    <meta name="og:image" content={pageImage} />
                }
            </Head>
            <div className="module-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', width: '100%', flexWrap: 'wrap' }}>
                    <div className="field has-addons" style={{ flexGrow: 1, minWidth: '200px', marginBottom: 0 }}>
                        <p className="control">
                            <a className="button is-static" style={darkInputStyle}>
                                <svg class="mui-icon" style={{ fontSize: "10em" }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path></svg> Search
                            </a>
                        </p>
                        <p className="control is-expanded">
                            <input
                                type="text"
                                className="input" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={darkInputStyle}
                            />
                        </p>
                    </div>
                    <div className="field has-addons" style={{ marginBottom: 0 }}>
                        <p className="control">
                            <a className="button is-static" style={darkInputStyle}>
                                Sort
                            </a>
                        </p>
                        <div className="control">
                            <div className="select">
                                <select 
                                    id="sortOrder" 
                                    value={sortMethod} 
                                    onChange={onSortChange}
                                    style={darkInputStyle}
                                >
                                    <option>Downloads</option>
                                    <option>A to Z</option>
                                    <option>Z to A</option>
                                    <option>Last Update</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                        Showing {sortedModules.length} Modules
                    </div>
                </div>

                <div className="module-cards">
                    <BrowserOnly>{() =>
                        sortedModules.map(module => (
                            <ModuleCard key={module.Namespace} module={module} />
                        ))
                    }
                    </BrowserOnly>
                </div>
            </div>
        </Layout>
    );
}

function ModuleProfilePage({ namespace, module }) {
    return (
        <Layout
            title={`${module.Name} Module`}
            description={`${module.Summary}`}>
            <BrowserOnly>
                {() =>
                    <Head>
                        <link rel="canonical" href={`https://blishhud.com/modules/?module=${namespace}`} data-rh="true" />
                        <link rel="alternate" href={`https://blishhud.com/modules/?module=${namespace}`} hreflang="en" data-rh="true" />
                        <link rel="alternate" href={`https://blishhud.com/modules/?module=${namespace}`} hreflang="x-default" data-rh="true" />
                        <meta property="og:url" content={`https://blishhud.com/modules/?module=${namespace}`} data-rh="true" />

                        <meta name="keywords" content={`${namespace}, ${module.Name}, Module, Guild Wars 2, gw2, Blish, HUD, bhud, TacO, Overlay`} />
                        <meta name="og:image" content={`https://pkgs.blishhud.com/metadata/img/module/${namespace}.png`} />

                        <meta name="robots" content="max-video-preview:0"></meta>
                        <meta name="thumbnail" content={`https://pkgs.blishhud.com/metadata/img/module/${namespace}.png`}></meta>
                    </Head>
                }
            </BrowserOnly>
            <BrowserOnly>
                {() =>
                    <div className="module-content">
                        <ModuleProfile namespace={namespace} module={module} />
                    </div>
                }
            </BrowserOnly>
        </Layout>
    );
}

function MdlLoading() {
    return (
        <Layout>
            <div className="module-content">
                <Loading />
            </div>
        </Layout>
    );
}

function Modules() {
    if (!ExecutionEnvironment.canUseDOM) {
        return MdlLoading();
    }

    const searchParams = new URLSearchParams(window.location.search);
    const moduleNamespace = searchParams.get('module');
    const moduleAuthor = searchParams.get('author');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modules, setModules] = useState([]);
    const [module, setModule] = useState(null);
    const [sortMethod, setSortMethod] = useState("Downloads");
    const [searchQuery, setSearchQuery] = useState('');
    

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                setIsLoaded(false);
                setError(null);
                setModule(null);

                if (moduleNamespace == null) {
                    const response = await fetch("https://pkgs.blishhud.com/metadata/all.json", { signal });

                    if (!response.ok) {
                        throw new Error(`Failed to load module list (${response.status})`);
                    }

                    const result = await response.json();
                    setModules(result);
                } else {
                    const response = await fetch(`https://pkgs.blishhud.com/metadata/${moduleNamespace}.json`, { signal });

                    if (!response.ok) {
                        throw new Error(`Failed to load module profile (${response.status})`);
                    }

                    const result = await response.json();
                    setModule(result);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                setIsLoaded(true);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [moduleNamespace]);

    const filteredModules = useMemo(() => {
        if (moduleNamespace != null || !modules) {
            return [];
        }

        if (!moduleAuthor) {
            return modules;
        }

        return modules.filter(module =>
            !module.AuthorName.localeCompare(moduleAuthor, undefined, { sensitivity: 'base' })
        );
    }, [moduleAuthor, moduleNamespace, modules]);

    if (error) {
        return (
            <Layout>
                <div className="module-content">
                    <p>Error loading: {error.message}</p>
                </div>
            </Layout>
        );
    }

    if (!isLoaded) {
        return MdlLoading();
    }

    if (moduleNamespace == null) {
        return (
            <ModuleList
                modules={filteredModules}
                sortMethod={sortMethod}
                onSortChange={(event) => setSortMethod(event.target.value)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isAuthor={moduleAuthor != null}
            />
        );
    }

    if (module != null) {
        return <ModuleProfilePage namespace={moduleNamespace} module={module} />;
    }

    return MdlLoading();
}

export default Modules;