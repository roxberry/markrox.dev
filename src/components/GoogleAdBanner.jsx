// src/components/AdBanner.js
import React, { useEffect, useState } from "react";


const GoogleAdBanner = ({ sidebarVisible }) => {
    const [showAd, setShowAd] = useState(true);
    const adRef = React.useRef(null);

    useEffect(() => {
        setShowAd(false);
        const timeout = setTimeout(() => setShowAd(true), 100);
        return () => clearTimeout(timeout);
    }, [sidebarVisible]);

    useEffect(() => {
        let observer;
        let pollTimeout;
        if (showAd) {
            try {
                if (typeof window !== "undefined" && window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("Adsbygoogle error:", e);
            }
            // Use MutationObserver to watch for data-ad-status changes
            if (adRef.current && typeof MutationObserver !== 'undefined') {
                observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (
                            mutation.type === 'attributes' &&
                            mutation.attributeName === 'data-ad-status' &&
                            adRef.current.getAttribute('data-ad-status') === 'unfilled'
                        ) {
                            setShowAd(false);
                        }
                    }
                });
                observer.observe(adRef.current, { attributes: true, attributeFilter: ['data-ad-status'] });
            }
            // Fallback: after 3s, hide if still unfilled or empty
            pollTimeout = setTimeout(() => {
                if (adRef.current && (adRef.current.offsetHeight < 40 || adRef.current.getAttribute('data-ad-status') === 'unfilled')) {
                    setShowAd(false);
                }
            }, 3000);
        }
        return () => {
            if (observer) observer.disconnect();
            if (pollTimeout) clearTimeout(pollTimeout);
        };
    }, [showAd]);

    return showAd ? (
        <ins
            ref={adRef}
            className="adsbygoogle"
            style={{
                display: "block",
                maxWidth: "870px",
                margin: sidebarVisible ? "0 auto" : undefined
            }}
            data-ad-client="ca-pub-3997623664966064"
            data-ad-slot="8711602606"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    ) : null;
};

export default GoogleAdBanner;