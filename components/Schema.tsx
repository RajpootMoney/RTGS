export default function Schema({ type, data }: { type: string, data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": type, ...data }) }}
    />
  );
}
