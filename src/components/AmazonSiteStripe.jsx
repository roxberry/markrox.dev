import React from 'react'
import "../styles/ads.scss"

const AmazonSiteStripe = ({
    amazonProducts = [],
    tag = "markroxdev-20",
    layout = "vertical", // or "horizontal"
}) => {
    // Helper to build the Amazon URL for each product
    const buildUrl = (product) => {
        if (product.url) return product.url;
        if (product.slug && product.asin && product.linkId) {
            return `https://www.amazon.com/${product.slug}/dp/${product.asin}?th=1&linkCode=ll1&tag=${tag}&linkId=${product.linkId}&language=en_US&ref_=as_li_ss_tl`;
        }
        return "https://www.amazon.com/b?node=53629917011&linkCode=ll2&tag=markroxdev-20&language=en_US&ref_=as_li_ss_tl";
    };

    const containerStyle = layout === "horizontal"
        ? { display: "flex", gap: 24, flexDirection: "row" }
        : { display: "flex", gap: 24, flexDirection: "column" };

    return (
        <div style={{ padding: "20px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#282828" }}>
            <div style={containerStyle}>
                {amazonProducts.map((product, idx) => (
                    <a
                        key={product.asin || idx}
                        href={buildUrl(product)}
                        target="_blank"
                        rel="nofollow sponsored"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: 240,
                            height: 340, // adjust as needed for your image + text
                            margin: 10,
                            textDecoration: "none",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            boxSizing: "border-box",
                            background: "#282828",
                        }}
                    >
                        <div style={{ padding: 50, flex: "0 0 auto" }}>
                            <img
                                src={product.imageUrl || "https://via.placeholder.com/120x240?text=Amazon+Product"}
                                alt={product.name || "Product Name"}
                                style={{ display: "block", margin: "0 auto", maxWidth: "100%", maxHeight: "100%" }}
                            />
                        </div>
                        <p style={{ margin: "0 0 20px 0", flex: "0 0 auto", padding: "0 5px", textAlign: "center" }}>
                            {product.name || "Product Name"}
                        </p>
                    </a>
                ))}
            </div>
            <p>As an Amazon Associate, I earn from qualifying purchases.</p>
        </div>
    );
};

export default AmazonSiteStripe
