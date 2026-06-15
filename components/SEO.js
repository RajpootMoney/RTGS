import Head from 'next/head';

/**
 * SEO component injects title, description and keywords meta tags.
 * Accepts props:
 *   - title: Page title (string)
 *   - description: Meta description (string)
 *   - keywords: Array of keyword strings (or comma‑separated string)
 */
export default function SEO({ title, description, keywords }) {
  const kw = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {kw && <meta name="keywords" content={kw} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
