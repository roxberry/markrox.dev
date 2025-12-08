import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import * as styles from "../styles/contact.module.scss"

const ContactPage = () => {
    return (
        <Layout>
            <Seo title="Contact Me" />
            <section>
                <h1 className="sectionTitle">Contact Me</h1>
                    <div className={styles.contactFormWrapper}>
                    <div className={styles.container}>
                        <form id="contactForm" action="https://formspree.io/f/xnqlpgoo" method="POST">
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name <span className={styles.required}>*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                />
                                <div className={styles.errorMessage} id="nameError">Please enter your name</div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                />
                                <div className={styles.errorMessage} id="emailError">Please enter a valid email</div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="company">Company / Organization</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Optional"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message <span className={styles.required}>*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project, question, or how I can help..."
                                    required
                                ></textarea>
                                <div className={styles.errorMessage} id="messageError">Please enter a message</div>
                            </div>

                            <button type="submit" className={styles.btnSubmit}>Send Message</button>
                        </form>
                    </div>
                </div>

            </section>
        </Layout>
    )
}

export default ContactPage
