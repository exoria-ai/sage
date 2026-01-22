'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ScenarioDisplayProps {
  query: string;
  toolCalls: string[];
  result: string;
}

export function ScenarioDisplay({ query, toolCalls, result }: ScenarioDisplayProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#3a3a38]" style={{ backgroundColor: '#30302e' }}>
      {/* User Query */}
      <div className="px-5 py-4 border-b border-[#3a3a38]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
            U
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: '#faf9f5' }}>
            {query}
          </p>
        </div>
      </div>

      {/* Tool Calls */}
      <div className="px-5 py-3 border-b border-[#3a3a38] flex flex-wrap gap-2">
        {toolCalls.map((tool, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium"
            style={{ backgroundColor: '#3a3a38', color: '#faf9f5' }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#459315' }}
            />
            {tool}
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="px-5 py-4">
        <div className="prose prose-invert prose-sm max-w-none scenario-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Style tables to match Claude Code
              table: ({ children }) => (
                <div className="overflow-x-auto my-4 -mx-1">
                  <table className="min-w-full text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead style={{ backgroundColor: '#3a3a38' }}>
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left font-semibold border-b border-[#4a4a48]" style={{ color: '#faf9f5' }}>
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 border-b border-[#3a3a38]" style={{ color: '#d4d4d0' }}>
                  {children}
                </td>
              ),
              // Style headers
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mt-0 mb-4" style={{ color: '#faf9f5' }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-bold mt-6 mb-3" style={{ color: '#faf9f5' }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-bold mt-4 mb-2" style={{ color: '#faf9f5' }}>
                  {children}
                </h3>
              ),
              // Style paragraphs
              p: ({ children }) => (
                <p className="my-3 leading-relaxed" style={{ color: '#d4d4d0' }}>
                  {children}
                </p>
              ),
              // Style lists
              ul: ({ children }) => (
                <ul className="my-3 space-y-1 list-disc list-outside pl-5" style={{ color: '#d4d4d0' }}>
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed" style={{ color: '#d4d4d0' }}>
                  {children}
                </li>
              ),
              // Style strong/bold
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: '#faf9f5' }}>
                  {children}
                </strong>
              ),
              // Style emphasis/italic
              em: ({ children }) => (
                <em className="italic" style={{ color: '#b4b4b0' }}>
                  {children}
                </em>
              ),
              // Style code
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ backgroundColor: '#3a3a38', color: '#4ade80' }}>
                  {children}
                </code>
              ),
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
