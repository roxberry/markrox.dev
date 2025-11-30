import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {

    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          url
        }
      }
    }
  `)

    return (
        <header>
            <div className="top-nav sub-header">
                <div className="leftSide">
                    <Link to="/" className="title" activeClassName="active">
                        \MARKROX.DEV
                        <span></span>
                        {/* <StaticImage
                            layout="fixed"
                            width={200}
                            formats={["AUTO"]}
                            src="../images/markrox-logo.png"
                            alt={data.site.siteMetadata.title}
                            placeholder="NONE"
                            background="#282828"
                            loading="eager"
                        /> */}
                    </Link>

                </div>
                <input id="menu-toggle" type="checkbox" />
                <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>

                <ul className="menu">
                    <li>
                        <Link to="/tags/applied-ai" className="header-menu-item" activeClassName="active">Applied AI</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="header-menu-item" activeClassName="active">Projects</Link>
                    </li>
                    <li>
                        <Link to="/about" className="header-menu-item" activeClassName="active">About Me</Link>
                    </li>
                    {/* <li>
                        <Link to="/contact" className="header-menu-item" activeClassName="active">Contact</Link>
                    </li> */}
                </ul>

            </div>
        </header>
    )
}

export default Header
