import React, { useState, useEffect } from "react"
import Header from "./Header"
import Disclaimer from "./Disclaimer"
import Sidebar from "./Sidebar"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faRss, faEnvelope, faX, faLink, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faGithub, faLinkedin, faXingSquare, faSquareXTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import "../styles/index.scss"

const themeOptions = ["system", "light", "dark"];

const Layout = props => {
    const [sidebarVisible, setSidebarVisible] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = window.localStorage.getItem("sidebarVisible");
            return stored === null ? true : stored === "true";
        }
        return true;
    });

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem("theme") || "system";
        }
        return "system";
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("sidebarVisible", sidebarVisible);
        }
    }, [sidebarVisible]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("theme", theme);
            if (theme === "system") {
                document.body.removeAttribute("data-theme");
            } else {
                document.body.setAttribute("data-theme", theme);
            }
        }
    }, [theme]);

    return (
        <div className="container">
            <Header />
            <Disclaimer />
            <main>
                {sidebarVisible && <Sidebar onHide={() => setSidebarVisible(false)} />}
                <article>
                    <div className="article-toolbar">
                        <button
                            className="sidebar-toggle-main"
                            onClick={() => setSidebarVisible((v) => !v)}
                            aria-label={sidebarVisible ? "Full view" : "Show sidebar"}
                        >
                            {sidebarVisible ? <><span style={{ marginRight: 4 }}>Full view</span> <span role="img" aria-label="expand"><FontAwesomeIcon icon={faExpand} /></span></> : <><span style={{ marginRight: 4 }}>Show sidebar</span> <span role="img" aria-label="sidebar"><FontAwesomeIcon icon={faCompress} /></span></>}
                        </button>
                        <div className="theme-toggle-group">
                            <div className="sharing-buttons">
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Share on Twitter"
                                >
                                    <span role="img" aria-label="Twitter"><FontAwesomeIcon icon={faXTwitter} /></span>
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Share on Facebook"
                                >
                                    <span role="img" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></span>
                                </a>
                                <a
                                    href={`mailto:?subject=Check this out&body=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ''}`}
                                    aria-label="Share by Email"
                                >
                                    <span role="img" aria-label="Email"><FontAwesomeIcon icon={faEnvelope} /></span>
                                </a>
                            </div>
                        </div>
                        <button
                            className="copy-link-btn"
                            aria-label="Copy link"
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    navigator.clipboard.writeText(window.location.href);
                                }
                            }}
                        >
                            <span role="img" aria-label="Copy link"><FontAwesomeIcon icon={faLink} /></span>
                        </button>
                        {/* <div className="theme-toggle-group">
                          <button
                            className="theme-toggle-btn"
                            aria-label="Switch theme"
                            onClick={() => {
                              setTheme(prev => {
                                const idx = themeOptions.indexOf(prev);
                                return themeOptions[(idx + 1) % themeOptions.length];
                              });
                            }}
                          >
                            {theme === "system" && <span title="System"><span role="img" aria-label="System">💻</span></span>}
                            {theme === "light" && <span title="Light"><span role="img" aria-label="Light">🌞</span></span>}
                            {theme === "dark" && <span title="Dark"><span role="img" aria-label="Dark">🌚</span></span>}
                          </button>
                        </div> */}
                    </div>
                    {props.children}
                </article>
            </main>
        </div>
    )
}

export default Layout
