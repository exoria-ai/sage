import { getCapability } from '@/lib/capabilities';
import { ScenarioDisplay } from '@/components/ScenarioDisplay';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CapabilityPage({ params }: PageProps) {
  const { slug } = await params;
  const capability = getCapability(slug);

  if (!capability) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
              ←
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-slate-900">Back to SAGE</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Capability Detail</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{capability.title}</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {capability.description}
            </p>
          </header>

          {/* Scenario Spotlight */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Example Scenario</span>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            {capability.scenarios.map((scenario, i) => (
              <div key={i} className="mb-8">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{scenario.title}</h3>
                  <p className="text-slate-600">{scenario.description}</p>
                </div>
                <ScenarioDisplay
                  query={scenario.query}
                  toolCalls={scenario.toolCalls}
                  result={scenario.result}
                />
              </div>
            ))}
          </section>

          {/* Tools Grid */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Available Tools</span>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {capability.tools.map((tool) => (
                <div key={tool.name} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors group">
                  <code className="text-sm font-bold text-teal-600 block mb-2">{tool.name}</code>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Source Info */}
          <footer className="bg-slate-100 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-2">Primary Data Source</p>
            <p className="text-lg font-semibold text-slate-900">{capability.source}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
