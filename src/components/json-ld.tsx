export function JsonLd() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Abhishek Biradar",
      givenName: "Prasenjit",
      familyName: "Nayak",
      url: "https://prasen.dev",
      jobTitle: "Full Stack Developer",
      description:
        "Abhishek Biradar is a Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Creating modern web applications with clean, efficient code.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Abhishek Biradar",
      url: "https://prasen.dev",
      description:
        "Portfolio and blog of Abhishek Biradar, Full Stack Developer",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://prasen.dev/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: "Main Navigation",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Projects",
          description: "Featured development projects and work",
          url: "https://prasen.dev/projects",
        },
        {
          "@type": "WebPage",
          name: "Blog",
          description: "Technical articles and tutorials",
          url: "https://prasen.dev/blog",
        },
        {
          "@type": "WebPage",
          name: "CLI",
          description: "Command line interface projects",
          url: "https://prasen.dev/cli",
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
