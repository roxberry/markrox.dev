import React, { useState, useEffect } from "react"
import SubscribeModal from "./SubscribeModal"
import { StaticImage } from "gatsby-plugin-image"
import Social from "./Social"
import Footer from "./Footer"
import Categories from "./Tags"

const SideBar = ({ onHide }) => {

    // modal state and prompt logic
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        localStorage.setItem('newsletterPrompted', 'true');
        setModalOpen(false);
    };

    useEffect(() => {
        let hasShown = false;

        const showModal = () => {
            if (!hasShown && !localStorage.getItem('newsletterPrompted')) {
                setModalOpen(true);
                hasShown = true;
            }
        };

        const timer = setTimeout(showModal, 15000);

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50) {
                showModal();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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