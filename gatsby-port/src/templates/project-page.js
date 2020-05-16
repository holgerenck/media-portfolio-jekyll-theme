import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import ImageGallery from '../components/ImageGallery';
import VimeoPlayer from '../components/VimeoPlayer';
import styled from 'styled-components';
// import SEO from '../components/seo';

const InnerWrapper = styled.div`
  padding: 4em 0 2em 0;
  margin: 0 auto;
  max-width: 65em;
  width: calc(100% - 6em);
`;

const ProjectPageTemplate = ({ data, pageContext, location }) => {
  const project = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <div id="main">
        <InnerWrapper>
          <Helmet>
            <title>
              {siteTitle} | {project.frontmatter.title}
            </title>
            <meta name="description" content="Landing Page" />
          </Helmet>
          {/* <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      /> */}
          <article>
            <header class="major">
              <h1>{project.frontmatter.title}</h1>
              {/* <p>{project.frontmatter.date}</p> */}
            </header>
            {project.frontmatter.vimeoId && (
              <VimeoPlayer vimeoId={project.frontmatter.vimeoId} />
            )}
            {project.frontmatter.images && (
              <ImageGallery images={project.frontmatter.images} />
            )}
            <section dangerouslySetInnerHTML={{ __html: project.html }} />
            <footer></footer>
          </article>
        </InnerWrapper>
      </div>
    </Layout>
  );
};

export default ProjectPageTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        vimeoId
        date(formatString: "MMMM DD, YYYY")
        description
        images {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
