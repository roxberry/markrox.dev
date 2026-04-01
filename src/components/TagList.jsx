import React from "react"
import { Link } from "gatsby"

const tagSlug = (tag) => tag.toLowerCase().replace(/\s+/g, '-')

const TagList = ({ tags }) => {
    return (
        tags.map((tag, i) => {
                let tagLink = "/tags/" + tagSlug(tag);
                return <span key={i} >{(i ? ', ' : '')}<a href={tagLink}>{ tag }</a></span>
            }
        )
    )
}

export default TagList