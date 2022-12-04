import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

function Seo({ description = '', lang = 'en', meta = [], title, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );

  // const metaDescription = description || site.siteMetadata.description;
  // const defaultTitle = site.siteMetadata?.title;

  const metaDescription =
    'A lush yacht holiday on the 45m long SY Serendipity I for 8 guests. Experience freedom, privacy and luxury in the Mediterranean and Caribbean sea.';
  const defaultTitle = 'SY SERENDIPITY I';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={defaultTitle ? `${defaultTitle} | %s` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `image`,
          content: image,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <meta id="vp" name="viewport" content="width=device-width, initial-scale=1" />
      <script>{`window.onload=function(){if(screen.width<450){var mvp=document.getElementById('vp');mvp.setAttribute('content','user-scalable=no,width=450')}};`}</script>
    </Helmet>
  );
}

export default Seo;
