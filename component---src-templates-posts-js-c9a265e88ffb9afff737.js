"use strict";(self.webpackChunkmarkrox_dev=self.webpackChunkmarkrox_dev||[]).push([[637],{1744:function(e,t,a){var n=a(6540),r=a(8154),o=a(4810);t.A=function(e){let{description:t="",lang:a="en",meta:l=[],image:s,title:i,pathname:c}=e;const{site:m}=(0,o.GR)("2052298874"),g=t||m.siteMetadata.description,p=s&&s.src?""+m.siteMetadata.siteUrl+s.src:null,d=c?""+m.siteMetadata.siteUrl+c:null;return n.createElement(r.m,{htmlAttributes:{lang:a},title:i,titleTemplate:m.siteMetadata.title+" - %s",link:d?[{rel:"canonical",href:d}]:[],meta:[{name:"description",content:g},{name:"keywords",content:m.siteMetadata.keywords.join(",")},{property:"og:title",content:i},{property:"og:description",content:g},{property:"og:type",content:"website"},{name:"twitter:creator",content:m.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:g}].concat(s?[{property:"og:image",content:p},{property:"og:image:width",content:s.width},{property:"og:image:height",content:s.height},{name:"twitter:card",content:"summary_large_image"}]:[{name:"twitter:card",content:"summary"}]).concat(l)})}},1623:function(e,t,a){var n=a(6540),r=(a(4810),a(249)),o=a.n(r);t.A=e=>{let{tags:t}=e;return t.map(((e,t)=>{let a="/tags/"+o()(e);return n.createElement("span",{key:t},t?", ":"",n.createElement("a",{href:a},e))}))}},8481:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var n=a(5540),r=a(6540),o=a(5957),l=a(1744),s=a(4810);var i=e=>{let{isFirst:t,isLast:a,prevPage:n,nextPage:o,currentPage:l,numPages:i}=e;return r.createElement("ul",{className:"post-pager",style:{display:"flex",flexWrap:"wrap",alignItems:"center",listStyle:"none",paddingInlineStart:0}},!t&&r.createElement(s.N_,{to:n,rel:"prev",style:{marginRight:20}},"← Previous Page"),Array.from({length:i},((e,t)=>r.createElement("li",{key:"pagination-number"+(t+1),style:{margin:20}},r.createElement(s.N_,{to:"/"+(0===t?"":t+1),style:{textDecoration:"none",color:t+1===l?"#ffffff":"",background:t+1===l?"#007acc":""}},t+1)))),!a&&r.createElement(s.N_,{to:o,rel:"next",style:{marginLeft:20}},"Next Page →"))},c=a(1623),m=a(2532);let g=function(e){function t(){return e.apply(this,arguments)||this}return(0,n.A)(t,e),t.prototype.render=function(){const{data:e}=this.props,t=e.site.siteMetadata.title,{currentPage:a,numPages:n}=this.props.pageContext,g=1===a,p=a===n,d=a-1==1?"/":"/"+(a-1).toString(),u="/"+(a+1).toString();let f;return n>1&&(f=r.createElement(i,{isFirst:g,isLast:p,prevPage:d,nextPage:u,currentPage:a,numPages:n})),r.createElement(o.A,{location:this.props.location,title:t},r.createElement(l.A,{title:"Welcome!"}),r.createElement("section",null,r.createElement("h1",{className:"sectionTitle"},"Latest Posts"),r.createElement("div",{className:"flexbox"},e.allMarkdownRemark.edges.map(((e,t)=>{const a=e.node.frontmatter.postimage;return r.createElement("div",{key:e.node.fields.slug+t.toString(),className:"post"},r.createElement(s.N_,{to:e.node.fields.slug},r.createElement("h1",{className:"postTitle"},e.node.frontmatter.title)),r.createElement("div",{className:"postedInfo"},"posted on ",e.node.frontmatter.date," | tags: [ ",r.createElement(c.A,{tags:e.node.frontmatter.tags})," ]"),r.createElement(s.N_,{to:e.node.fields.slug},a&&a.src&&r.createElement("div",{className:"postImage"},r.createElement(m.G,{image:a.src.childImageSharp.gatsbyImageData,alt:e.node.frontmatter.title,layout:"fullWidth",formats:["auto","webp"]}),r.createElement("div",{className:"overlay"},r.createElement("div",{className:"innerOverlayText",dangerouslySetInnerHTML:{__html:e.node.frontmatter.excerpt}})))))})),f)))},t}(r.Component);var p=g}}]);
//# sourceMappingURL=component---src-templates-posts-js-c9a265e88ffb9afff737.js.map