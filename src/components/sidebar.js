import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Social from "../components/social"
import Categories from "./tags"
import Footer from "../components/footer"

const SideBar = () =>  {
    return (
        <aside>
          <section>
              <StaticImage
                className="profile"
                layout="fixed"
                formats={["AUTO", "WEBP", "AVIF"]}
                src="../images/profile.1.jpg"
                quality={95}
                alt="Profile picture"
                style={{ borderRadius: '100%' }}
            />
          </section>
          <section>
            <Social />
          </section>
          <section>
            <h2>About Me</h2>
            <p>Cross Platform Consultant</p>
            <a href="https://www.waveseeker.com">@ Database Solutions</a>
            <p>Husband, father, son, brother and uncle.</p><p>Security driven developer and passionate cross platform software engineer, architect and consultant.</p>
          </section>
          <section>
            <a href="https://github.com/roxberry/gatsby-roxberry/actions/workflows/main.yml"><img src="https://github.com/roxberry/gatsby-roxberry/actions/workflows/main.yml/badge.svg" alt="Gatsby Publish" /></a>
          </section>
            <Categories />
          <Footer />
        </aside>
    )
}

export default SideBar