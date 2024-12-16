"use strict";(self.webpackChunkmarkrox_dev=self.webpackChunkmarkrox_dev||[]).push([[637],{1744:function(e,t,a){var r=a(6540),n=a(8154),c=a(4810);t.A=function(e){let{description:t="",lang:a="en",meta:i=[],image:l,title:o,pathname:s}=e;const{site:d}=(0,c.GR)("2052298874"),m=t||d.siteMetadata.description,p=l&&l.src?""+d.siteMetadata.siteUrl+l.src:null,g=s?""+d.siteMetadata.siteUrl+s:null;return r.createElement(n.m,{htmlAttributes:{lang:a},title:o,titleTemplate:d.siteMetadata.title+" - %s",link:g?[{rel:"canonical",href:g}]:[],meta:[{name:"description",content:m},{name:"keywords",content:d.siteMetadata.keywords.join(",")},{property:"og:title",content:o},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:creator",content:d.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:m}].concat(l?[{property:"og:image",content:p},{property:"og:image:width",content:l.width},{property:"og:image:height",content:l.height},{name:"twitter:card",content:"summary_large_image"}]:[{name:"twitter:card",content:"summary"}]).concat(i)})}},1623:function(e,t,a){var r=a(6540),n=(a(4810),a(249)),c=a.n(n);t.A=e=>{let{tags:t}=e;return t.map(((e,t)=>{let a="/tags/"+c()(e);return r.createElement("span",{key:t},t?", ":"",r.createElement("a",{href:a},e))}))}},8481:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var r=a(5540),n=a(6540),c=a(5957),i=a(1744),l=a(4810);var o=e=>{let{isFirst:t,isLast:a,prevPage:r,nextPage:c,currentPage:i,numPages:o}=e;return n.createElement("ul",{className:"post-pager",style:{display:"flex",flexWrap:"wrap",alignItems:"center",listStyle:"none",paddingInlineStart:0}},!t&&n.createElement(l.N_,{to:r,rel:"prev",style:{marginRight:20}},"← Previous Page"),Array.from({length:o},((e,t)=>n.createElement("li",{key:"pagination-number"+(t+1),style:{margin:20}},n.createElement(l.N_,{to:"/"+(0===t?"":t+1),style:{textDecoration:"none",color:t+1===i?"#ffffff":"",background:t+1===i?"#007acc":""}},t+1)))),!a&&n.createElement(l.N_,{to:c,rel:"next",style:{marginLeft:20}},"Next Page →"))},s=a(1623),d=a(2532);let m=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.A)(t,e),t.prototype.render=function(){const{data:e}=this.props,t=e.site.siteMetadata.title,{currentPage:r,numPages:m}=this.props.pageContext,p=1===r,g=r===m,u=r-1==1?"/":"/"+(r-1).toString(),f="/"+(r+1).toString();let b;return m>1&&(b=n.createElement(o,{isFirst:p,isLast:g,prevPage:u,nextPage:f,currentPage:r,numPages:m})),n.createElement(c.A,{location:this.props.location,title:t},n.createElement(i.A,{title:"Welcome!"}),n.createElement("section",null,n.createElement("h1",{className:"sectionTitle"},"Featured Projects"),n.createElement("div",{className:"flexbox-widex"},n.createElement("div",{className:"project-card-wide"},n.createElement("div",{className:"project-card-image"},n.createElement(d.S,{formats:["AUTO"],src:"../images/projects/hactu8.png",alt:"project",placeholder:"NONE",background:"#282828",loading:"eager",layout:"constrained",width:250,__imageData:a(4614)})),n.createElement("div",{className:"project-card-wide-text"},n.createElement("h3",null,"HACTU8.COM"),n.createElement("span",null,"A cutting-edge initiative dedicated to ethical hacking in the domains of robotics, AI, IoT, and consumer hardware."),n.createElement("div",{className:"project-card-link"},n.createElement("a",{href:"https://hactu8.com",target:"_blank",rel:"noreferrer"},"Visit the project >")))),n.createElement("div",{className:"project-card-wide"},n.createElement("div",{className:"project-card-image"},n.createElement(d.S,{formats:["AUTO"],src:"../images/projects/briefing-logo.webp",alt:"project",placeholder:"NONE",background:"#282828",loading:"eager",layout:"constrained",width:250,__imageData:a(2744)})),n.createElement("div",{className:"project-card-wide-text"},n.createElement("h3",null,"Briefing"),n.createElement("span",null,"A knowledge tool designed to help professionals master knowledge by delivering curated, topic-specific content."),n.createElement("div",{className:"project-card-link"},n.createElement("a",{href:"https://briefing.driveapplied.com",target:"_blank",rel:"noreferrer"},"Visit the project >")))))),n.createElement("section",null,n.createElement("h1",{className:"sectionTitle"},"Latest Posts"),n.createElement("div",{className:"flexbox"},e.allMarkdownRemark.edges.map(((e,t)=>{const a=e.node.frontmatter.postimage;return n.createElement("div",{key:e.node.fields.slug+t.toString(),className:"post"},n.createElement(l.N_,{to:e.node.fields.slug},n.createElement("h1",{className:"postTitle"},e.node.frontmatter.title)),n.createElement("div",{className:"postedInfo"},"posted on ",e.node.frontmatter.date," | tags: [ ",n.createElement(s.A,{tags:e.node.frontmatter.tags})," ]"),n.createElement(l.N_,{to:e.node.fields.slug},a&&a.src&&n.createElement("div",{className:"postImage"},n.createElement(d.G,{image:a.src.childImageSharp.gatsbyImageData,alt:e.node.frontmatter.title,layout:"fullWidth",formats:["auto","webp"]}),n.createElement("div",{className:"overlay"},n.createElement("div",{className:"innerOverlayText",dangerouslySetInnerHTML:{__html:e.node.frontmatter.excerpt}})))))})),b)))},t}(n.Component);var p=m},2744:function(e){e.exports=JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/a44787ec2b5295b46aed5fd0f6b0532a/e7160/briefing-logo.webp","srcSet":"/static/a44787ec2b5295b46aed5fd0f6b0532a/74c72/briefing-logo.webp 63w,\\n/static/a44787ec2b5295b46aed5fd0f6b0532a/d66e1/briefing-logo.webp 125w,\\n/static/a44787ec2b5295b46aed5fd0f6b0532a/e7160/briefing-logo.webp 250w,\\n/static/a44787ec2b5295b46aed5fd0f6b0532a/5f169/briefing-logo.webp 500w","sizes":"(min-width: 250px) 250px, 100vw"},"sources":[]},"width":250,"height":250}')},4614:function(e){e.exports=JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/d63d1128cb4073d97bea40254456aee0/e7160/hactu8.webp","srcSet":"/static/d63d1128cb4073d97bea40254456aee0/74c72/hactu8.webp 63w,\\n/static/d63d1128cb4073d97bea40254456aee0/d66e1/hactu8.webp 125w,\\n/static/d63d1128cb4073d97bea40254456aee0/e7160/hactu8.webp 250w,\\n/static/d63d1128cb4073d97bea40254456aee0/5f169/hactu8.webp 500w","sizes":"(min-width: 250px) 250px, 100vw"},"sources":[]},"width":250,"height":250}')}}]);
//# sourceMappingURL=component---src-templates-posts-js-5d4d1d4fb30be4f98373.js.map