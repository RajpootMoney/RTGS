export default function Schema({ type, data }: { type: string, data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": type, ...data }) }}
    />
  );
}
