import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import SubscribeModal from "./SubscribeModal"

const currentYear = new Date().getFullYear();

const Footer = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          version
        }
      }
    }
  `);

    // modal state
    // const [isModalOpen, setModalOpen] = useState(false);
    // const openModal = () => setModalOpen(true);
    // const closeModal = () => setModalOpen(false);

    // Prompt on first visit (client‑side only)
    //   useEffect(() => {
    //     if (typeof window === "undefined") return;
    //     const prompted = localStorage.getItem("newsletterPrompted");
    //     if (!prompted) {
    //       setModalOpen(true);
    //       localStorage.setItem("newsletterPrompted", "true");
    //     }
    //   }, []);


    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        let hasShown = false;

        const showModal = () => {
            if (!hasShown && !localStorage.getItem('newsletterPrompted')) {
                setIsOpen(true); // ← Now this works
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

    const handleCloseModal = () => {
        localStorage.setItem('newsletterPrompted', 'true');
        setIsOpen(false);
    };

    return (
        <footer>
            <div>
                © {currentYear} {data.site.siteMetadata.author} (v{data.site.siteMetadata.version})
            </div>
        </footer>
    );
}

export default Footer
