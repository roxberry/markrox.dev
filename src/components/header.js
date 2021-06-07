import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const Header = () => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header>
      <div className="sub-header">
        <div className="leftSide">
            <Link to="/" className="title" activeClassName="active">{data.site.siteMetadata.title}</Link>
          <ul>
            <li>
              <Link to="/contact" className="header-menu-item" activeClassName="active">Contact</Link>
            </li>
              {/* <li>
              <Link to="/blog" className="header-menu-item"  activeClassName="active">Blog</Link>
            </li> */}
          </ul>
        </div>
        <div className="center">
          
        </div>
        <div className="rightSide">
          <p>coder, maker, hacker, mentor</p>
        </div>
      </div>
    </header>
  )
}

export default Header
// <header className={headerStyles.header}>
//     <nav>
//         <h1><Link className={headerStyles.title} activeClassName={headerStyles.activeNavItem} to="/">Mark Roxberry</Link></h1>

//         <ul className={headerStyles.navList}>
//             <li>
//                 <Link className={headerStyles.navItem}  activeClassName={headerStyles.activeNavItem} to="/contact">Contact</Link>
//             </li>
//             <li>
//                 <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/blog">Blog</Link>
//             </li>
//         </ul>
//     </nav>
// </header>
