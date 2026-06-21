import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  
  let currentList: React.ReactNode[] = [];

  const parseInline = (text: string): React.ReactNode[] => {
    const tokens: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const italicMatch = remaining.match(/\*(.*?)\*/);
      const codeMatch = remaining.match(/`(.*?)`/);
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
      const underlineMatch = remaining.match(/<u>(.*?)<\/u>/);

      const matches = [
        { name: "bold", index: boldMatch ? remaining.indexOf(boldMatch[0]) : -1, match: boldMatch },
        { name: "italic", index: italicMatch ? remaining.indexOf(italicMatch[0]) : -1, match: italicMatch },
        { name: "code", index: codeMatch ? remaining.indexOf(codeMatch[0]) : -1, match: codeMatch },
        { name: "link", index: linkMatch ? remaining.indexOf(linkMatch[0]) : -1, match: linkMatch },
        { name: "underline", index: underlineMatch ? remaining.indexOf(underlineMatch[0]) : -1, match: underlineMatch },
      ].filter((m) => m.index !== -1);

      if (matches.length === 0) {
        tokens.push(<span key={`text-${keyIndex++}`}>{remaining}</span>);
        break;
      }

      matches.sort((a, b) => a.index - b.index);
      const first = matches[0];

      if (first.index > 0) {
        tokens.push(<span key={`text-${keyIndex++}`}>{remaining.substring(0, first.index)}</span>);
      }

      const matchContent = first.match![1];
      const matchFull = first.match![0];

      if (first.name === "bold") {
        tokens.push(<strong key={`bold-${keyIndex++}`} className="font-bold text-gray-900">{matchContent}</strong>);
      } else if (first.name === "italic") {
        tokens.push(<em key={`italic-${keyIndex++}`} className="italic text-gray-800">{matchContent}</em>);
      } else if (first.name === "code") {
        tokens.push(<code key={`code-${keyIndex++}`} className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded font-mono text-sm">{matchContent}</code>);
      } else if (first.name === "underline") {
        tokens.push(<u key={`underline-${keyIndex++}`} className="underline text-gray-900">{matchContent}</u>);
      } else if (first.name === "link") {
        const url = first.match![2];
        tokens.push(
          <a
            key={`link-${keyIndex++}`}
            href={url}
            className="text-secondary hover:text-accent font-medium hover:underline transition-colors duration-200"
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {matchContent}
          </a>
        );
      }

      remaining = remaining.substring(first.index + matchFull.length);
    }

    return tokens;
  };

  const pushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "---") {
      pushList();
      elements.push(<hr key={`hr-${i}`} className="my-8 border-t border-gray-200" />);
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      pushList();
      elements.push(
        <h1 key={`h1-${i}`} className="text-3xl md:text-4xl font-extrabold text-primary mt-8 mb-4 tracking-tight leading-tight">
          {parseInline(line.substring(2))}
        </h1>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      pushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-primary mt-8 mb-4 border-b border-gray-100 pb-2">
          {parseInline(line.substring(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      pushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl md:text-2xl font-bold text-primary mt-6 mb-3">
          {parseInline(line.substring(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      currentList.push(
        <li key={`li-${i}`} className="leading-relaxed">
          {parseInline(line.substring(2))}
        </li>
      );
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      pushList();
      elements.push(
        <blockquote key={`blockquote-${i}`} className="border-l-4 border-accent bg-gray-50 pl-4 py-3 pr-2 my-6 italic text-gray-600 rounded-r-md">
          {parseInline(line.substring(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    if (line === "") {
      pushList();
      i++;
      continue;
    }

    pushList();
    elements.push(
      <p key={`p-${i}`} className="mb-5 text-gray-700 leading-relaxed text-lg">
        {parseInline(lines[i].trim())}
      </p>
    );
    i++;
  }

  pushList();

  return <div className="markdown-body font-sans">{elements}</div>;
}
