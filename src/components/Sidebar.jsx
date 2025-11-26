import React, { useState } from "react"
import SubscribeModal from "./SubscribeModal"
import { StaticImage } from "gatsby-plugin-image"
import Social from "./Social"
import Footer from "./Footer"
import Categories from "./Tags"

const SideBar = ({ onHide }) => {

    // modal state
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <aside className="side-bar">
            <section>
                <StaticImage
                    className="profile"
                    width={200}
                    layout="fixed"
                    formats={["AUTO", "WEBP", "AVIF"]}
                    src="../images/profile.4.jpg"
                    quality={95}
                    alt="Profile picture"
                    style={{ borderRadius: '100%' }}
                />
            </section>
            <section>
                <h2>Mark Roxberry</h2>
                <span><a href="https://www.waveseeker.com">@ Database Solutions</a></span><br /><br />
                <span>AI Security Architect | OWASP Leader | Secure GenAI &amp; Multi-Agent Systems | CISSP, CEH</span><br />
                <Social />
                {/* Subscribe button */}
                <button
                    className="subscribe-btn"
                    onClick={openModal}
                >
                    Subscribe to Newsletter
                </button>
                {/* Modal */}
                <SubscribeModal isOpen={isModalOpen} onClose={closeModal} />
                {/* <p>Husband, father, son, brother and uncle.</p> */}
                {/* <p>Security driven developer and passionate cross platform software engineer, architect and consultant.</p> */}
            </section>
            <section>
                <a href="https://github.com/roxberry/gatsby-roxberry/actions/workflows/main-ci.yml"><img src="https://github.com/roxberry/gatsby-roxberry/actions/workflows/main-ci.yml/badge.svg" width="170px" height="20px" alt="markrox.dev CI" /></a>
            </section>
            <Categories />
            <Footer />
        </aside>
    )
}

export default SideBar