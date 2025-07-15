// src/components/AdBanner.js
import React, { useEffect } from "react";

const GoogleAdBanner = () => {
    useEffect(() => {
        try {
            if (typeof window !== "undefined" && window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("Adsbygoogle error:", e);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: "block"}}
            data-ad-client="ca-pub-3997623664966064"
            data-ad-slot="8711602606"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
};

export default GoogleAdBanner;