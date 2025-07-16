// src/components/AdBanner.js
import React, { useEffect, useState } from "react";


const GoogleAdBanner = ({ sidebarVisible }) => {
    const [showAd, setShowAd] = useState(true);

    useEffect(() => {
        setShowAd(false);
        const timeout = setTimeout(() => setShowAd(true), 100);
        return () => clearTimeout(timeout);
    }, [sidebarVisible]);

    useEffect(() => {
        if (showAd) {
            try {
                if (typeof window !== "undefined" && window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("Adsbygoogle error:", e);
            }
        }
    }, [showAd]);

    return showAd ? (
        <ins
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