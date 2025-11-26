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
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Simple e‑mail validation regex
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3eg0hvwdSDrY_h8sHzZ_HANM3L2DVjRVlb4ILpa07rcqqmzNVXFFO4S7rLNgXbMYP/exec'; // <-- Replace with your deployed script URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setStatus("error");
            return;
        }
        setIsSubmitting(true);
        const data = new FormData(e.target);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    // Close on Escape key press
    useEffect(() => {
        // --- Google Apps Script Setup ---
        // 1. Create a Google Sheet.
        // 2. Go to Extensions > Apps Script, paste the doPost code from the previous message.
        // 3. Deploy as Web App (Anyone can access).
        // 4. Copy the Web App URL and replace YOUR_SCRIPT_URL below.

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
                    action={GOOGLE_SCRIPT_URL} /* replace with real Formspree ID */
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
                    {status !== "success" && (
                        <>
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
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Get Insights"}
                            </button>
                        </>
                    )}
                    {status === "success" && (
                        <p className="msg success fade-in">
                            🎉 Thanks for subscribing!<br />
                            You’re on the list for AI insights.
                        </p>
                    )}
                    {status === "error" && (
                        <p className="msg error">❌ Please enter a valid e‑mail.</p>
                    )}
                </form>
            </div>
        </div>
    );
    {/* Classic HTML form for best compatibility (avoids CORS issues) */ }
    // <form action={GOOGLE_SCRIPT_URL} method="POST" target="_blank">
    //     <input type="email" name="email" required placeholder="you@example.com" />
    //     <button type="submit">Subscribe</button>
    // </form>
    {/* Optionally add a privacy/consent checkbox and link to privacy policy */ }
    {/* <label><input type="checkbox" required /> I agree to receive emails</label> */ }
    {/* <a href="/privacy">Privacy Policy</a> */ }

    // Render the modal into the body to avoid clipping by parent containers
    return isBrowser ? ReactDOM.createPortal(modal, document.body) : null;
}
