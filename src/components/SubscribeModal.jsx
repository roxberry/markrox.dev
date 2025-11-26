import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image"
import ReactDOM from "react-dom";
// import "../styles/subscribe.module.scss";
// import "./SubscribeModal.scss";
/**
 * SubscribeModal renders a modal dialog containing a Formspree form.
 * Props:
 *   - isOpen: boolean – whether the modal is visible
 *   - onClose: function – called to close the modal
 */
export default function SubscribeModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null); // "success" | "error"

    // Simple e‑mail validation regex
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setStatus("error");
            return;
        }

        const data = new FormData(e.target);
        // Post to the Formspree endpoint defined in the form's action attribute
        const action = e.target.getAttribute("action");
        try {
            const response = await fetch(action, {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });
            if (response.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    // Close on Escape key press
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!isOpen) return null;

    // In Gatsby the component may be rendered during SSR where `document` is undefined.
    // Guard against that by only creating the portal on the client side.
    const isBrowser = typeof document !== "undefined";

    const modal = (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    ×
                </button>
                <h2 className="modal-title">Subscribe for AI Security Insights</h2>

                <form   
                    name="newsletter-subscribe"
                    method="POST"
                    action="https://formspree.io/f/mgvbqrdk" /* replace with real Formspree ID */
                    onSubmit={handleSubmit}
                >
                    {/* honeypot field for bots */}
                    <p hidden>
                        <label>
                            Don’t fill this out: <input name="bot-field" />
                        </label>
                    </p>
                    <div className="modal-message">
                        <h3 className="modal-headline">Get AI Security and Architecture Insights</h3>

                        <ul className="modal-benefits">
                            <li>Practical guides on securing multi-agent systems</li>
                            <li>Enterprise AI architecture patterns</li>
                            <li>GenAI implementation strategies</li>
                        </ul>

                        <p className="modal-privacy">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                    <label htmlFor="email-input" className="sr-only">
                        Your email address
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">
                        Get Insights
                    </button>
                    {status === "success" && (
                        <p className="msg success">✅ Thanks! You’re subscribed.</p>
                    )}
                    {status === "error" && (
                        <p className="msg error">❌ Please enter a valid e‑mail.</p>
                    )}
                </form>
            </div>
        </div>
    );

    // Render the modal into the body to avoid clipping by parent containers
    return isBrowser ? ReactDOM.createPortal(modal, document.body) : null;
}
