import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Banner from '../components/Banner';

import { getConfig } from './../theme.config';

const { hideBanner } = getConfig();

const StyledArticle = styled.article`
  &:before {
    background-color: black !important;
    opacity: 0 !important;
  }
  header {
    opacity: 0 !important;
    transition: opacity 0.5s ease-in-out;
  }
  &:hover {
    &:before {
      opacity: 0.55 !important;
    }
    header {
      opacity: 1 !important;
    }
  }
`;

const HomeIndex = () => {
  const { site, allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                preview {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const projects = allMarkdownRemark.edges;
  console.log(projects);

  return (
    <Layout>
      <Helmet
        title={site.siteMetadata.title}
        meta={[
          { name: 'description', content: site.siteMetadata.description },
          { name: 'keywords', content: site.siteMetadata.keywords },
        ]}
      ></Helmet>

      {!hideBanner && <Banner />}

      <div id="main">
        <section id="one" className="tiles">
          {projects.map(({ node }) => (
            <StyledArticle
              style={{
                backgroundImage: `url(${node.frontmatter.preview.childImageSharp.fluid.src})`,
              }}
            >
              <header className="major">
                <h3>{node.frontmatter.title}</h3>
                <p>{node.frontmatter.subtitle}</p>
              </header>
              <Link to={node.fields.slug} className="link primary"></Link>
            </StyledArticle>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default HomeIndex;
