'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownMessage({ content, isUser }: MarkdownMessageProps) {
  // For user messages, just render plain text
  if (isUser) {
    return (
      <div className="whitespace-pre-wrap break-words leading-relaxed">
        {content}
      </div>
    );
  }

  // For AI messages, render markdown
  return (
    <div className="markdown-content prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for markdown elements
          h1: ({ ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 text-gray-900 dark:text-gray-100 leading-relaxed" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-900 dark:text-gray-100" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-900 dark:text-gray-100" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="ml-4 text-gray-900 dark:text-gray-100" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-700 dark:text-gray-300"
              {...props}
            />
          ),
          code: ({ inline, className, ...props }: any) => {
            // If it has className, it's likely from highlight.js (code blocks)
            if (inline || !className) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400"
                  {...props}
                />
              );
            }
            // Code blocks from highlight.js - preserve the className
            return (
              <code
                className={`${className} block rounded-lg p-4 overflow-x-auto text-sm`}
                {...props}
              />
            );
          },
          pre: ({ children, ...props }: any) => {
            // Check if it contains a code element with highlight.js classes
            const hasHighlight = React.Children.toArray(children).some(
              (child: any) => child?.props?.className?.includes('hljs')
            );
            return (
              <pre
                className={`rounded-lg p-4 overflow-x-auto mb-4 ${
                  hasHighlight ? '' : 'bg-gray-900 dark:bg-gray-950'
                }`}
                {...props}
              >
                {children}
              </pre>
            );
          },
          a: ({ ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-gray-900 dark:text-white" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-gray-900 dark:text-gray-100" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

