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

  const seoImage =
    'https://ik.imagekit.io/bgmwrkfoi/tr:f-jpg,w-1200,h-630,c-maintain_ratio/all/ship-16.jpeg';

  // const metaDescription = description || site.siteMetadata.description;
  // const defaultTitle = site.siteMetadata?.title;

  const metaDescription =
    'A lush yacht holiday on the 45m long SY Serendipity I for 8 guests. Experience freedom, privacy and luxury in the Mediterranean and Caribbean sea.';
  const defaultTitle = 'SY SERENDIPITY I';

  const fullTitle =
    title === 'Charter Sailing Yacht | Set Sails. Now.'
      ? `${defaultTitle} | ${title}`
      : title
      ? `${title} | ${defaultTitle}`
      : defaultTitle;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={
        title === 'Charter Sailing Yacht | Set Sails. Now.'
          ? `${defaultTitle} | %s`
          : defaultTitle
          ? `%s | ${defaultTitle}`
          : null
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `image`,
          content: seoImage,
        },
        {
          property: `og:title`,
          content: fullTitle,
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
          content: seoImage,
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
          content: fullTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `viewport`,
          content: 'width=device-width, initial-scale=1',
          id: 'vp',
        },
      ].concat(meta)}
    >
      <script>{`function ready(callback) {
        if (document.readyState != 'loading') callback();
        else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
        else
          document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') callback();
          });
      }
      function resize() {
        const mvp = document.getElementById('vp');
        mvp.setAttribute('content', 'user-scalable=no,width=450');
      }
      ready(function () {
        if (screen.width < 450) {
          setInterval(resize, 250);
        }
      });`}</script>
    </Helmet>
  );
}

export default Seo;
