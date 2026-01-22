import Link from 'next/link';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-teal-700 tracking-tight">
              Solano Agent for Geographic Enquiry
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#setup"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Setup
            </a>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow"
            >
              <span>Open Map</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            SAGE v1.0 • System Online
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            The Intelligence Layer for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
              Solano County
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Integrating 7 cities, 13 departments, and 152,000 parcels into one conversation.
            Ask complex questions about zoning, hazards, and code using natural language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5"
            >
              Open Interactive Map
            </Link>
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-lg font-semibold rounded-xl transition-all shadow-sm"
            >
              See Capabilities
            </a>
          </div>
        </div>
      </header>

      {/* The Integration Layer Concept */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Not just data retrieval. <br />
                <span className="text-teal-600">True Integration.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In the 90s, GIS solved the spatial silo problem by using <strong>location</strong> as the common key.
                Today, SAGE solves the operational silo problem using <strong>natural language</strong>.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                It doesn't ask you to learn 40 different tools. It translates your intent into the precise queries needed to answer your question—whether that requires checking FEMA flood zones, City of Fairfield zoning, or the County Budget.
              </p>
              <ul className="space-y-4">
                <FeatureItem>Automatic Jurisdiction Routing (City vs. County)</FeatureItem>
                <FeatureItem>Cross-Departmental Synthesis</FeatureItem>
                <FeatureItem>Encoded Institutional Knowledge</FeatureItem>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-emerald-50 rounded-2xl transform rotate-3 scale-105 opacity-70"></div>
              <div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-slate-500 font-mono">sage-agent — v1.0.0</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
                  <div className="mb-4">
                    <span className="text-teal-400">user:</span> What are the ADU rules in unincorporated Solano County?
                  </div>
                  <div className="mb-4 animate-pulse opacity-70">
                    <span className="text-purple-400">sage:</span> <span className="text-slate-500">[thinking...]</span>
                  </div>
                  <div className="pl-4 border-l-2 border-slate-800 text-xs text-slate-500 mb-4 space-y-1">
                    <div>→ Checking tool definitions...</div>
                    <div className="text-teal-500/80">→ Calling get_zoning(jurisdiction="county")</div>
                    <div className="text-emerald-500/80">→ Calling search_county_code(q="ADU")</div>
                    <div>→ Synthesizing policy limits...</div>
                  </div>
                  <div>
                    <span className="text-purple-400">sage:</span> ADUs are allowed by-right in Rural Residential districts. County Code Section 28.72.10 limits attached ADUs to 50% of the primary dwelling...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scenarios */}
      <section id="capabilities" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Real County workflows</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SAGE handles the edge cases that trip up basic LLMs—like mailing addresses that don't match legal jurisdictions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScenarioCard
              icon="⚖️"
              title="Jurisdiction Routing"
              question="What's the zoning for 2500 Cordelia Road in Fairfield?"
              result="Identifies the parcel is actually in Unincorporated Solano County (ISD), not City of Fairfield. Routes query to County zoning tools instead of City tools. Prevents misinformation."
            />
            <ScenarioCard
              icon="🍇"
              title="Complex Permitting"
              question="I want to build a medium winery on 30 acres of A-40 land. Can I host weddings?"
              result="Checks 'Medium Winery' definition (production volume), verifies 25% on-site growing rule, and identifies 'Weddings' as a separate 'Special Events Facility' use requiring its own permit."
            />
            <ScenarioCard
              icon="⚡"
              title="Multi-Source Analysis"
              question="Give me a complete property profile for 4300 Suisun Valley Road."
              result="Pulls parcel data, zoning, flood zone, fire hazard, special districts, and relevant General Plan policies in one query. Synthesizes 6 data sources into a single assessment."
            />
          </div>
        </div>
      </section>

      {/* Connected Systems Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore System Capabilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse the catalog of 40+ tools across 11 functional categories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SystemCard title="Property & Parcels" count="152k Records" icon="🗺️" slug="property" />
            <SystemCard title="Zoning (7 Cities)" count="Live Routing" icon="📍" slug="zoning" />
            <SystemCard title="County Code" count="8 Chapters" icon="📜" slug="code" />
            <SystemCard title="General Plan" count="1,345 Policies" icon="📋" slug="general-plan" />
            <SystemCard title="Budget & Staffing" count="3,284 FTEs" icon="💰" slug="budget" />
            <SystemCard title="Hazards (Fire/Flood)" count="FEMA/CAL FIRE" icon="⚠️" slug="hazards" />
            <SystemCard title="Special Districts" count="School/Water" icon="🏫" slug="districts" />
            <SystemCard title="Meeting Minutes" count="BOS & ReGIS" icon="🎙️" slug="meetings" />
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section id="setup" className="py-20 bg-slate-900 text-slate-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Deploy?</h2>
            <p className="text-lg text-slate-400">
              Two ways to connect SAGE to your workflow.
            </p>
          </div>

          <div className="space-y-6">
            {/* Recommended Map */}
            <div className="bg-slate-800/50 border border-teal-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-teal-500 pointer-events-none">
                01
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/30">
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Claude Code Plugin</h3>
                <p className="text-slate-400 mb-6 max-w-2xl">
                  Install the full plugin to get the MCP server <em>plus</em> the specialized Skill that teaches Claude how to answer Solano County questions effectively.
                </p>
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-teal-400 border border-slate-800">
                  /plugin marketplace add exoria-ai/sage-plugin<br/>
                  /plugin install sage@exoria-ai-sage-plugin
                </div>
              </div>
            </div>

            {/* Alternative */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
               <h3 className="text-xl font-bold text-white mb-2">Manual MCP Configuration</h3>
               <p className="text-slate-400 mb-6">
                 For Claude Desktop or other MCP clients.
               </p>
               <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-800 overflow-x-auto">
                 {`{
  "mcpServers": {
    "sage": {
      "url": "https://sage-git-main-ai-machine-dream.vercel.app/api/mcp"
    }
  }
}`}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <span className="text-lg font-bold text-slate-200">SAGE</span>
              <span className="text-slate-600">/</span>
              <span className="text-sm text-slate-400">Solano County Interview Project</span>
            </div>
            <p className="text-sm text-slate-600">
              Built by Ryan Pream for Solano County DoIT.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <p>Data sources: Solano County, CAL FIRE, FEMA, CsGS.</p>
            <p className="mt-1 opacity-60">For demonstration purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mt-0.5">
        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-slate-700 font-medium">{children}</span>
    </li>
  );
}

function ScenarioCard({ icon, title, question, result }: { icon: string; title: string; question: string; result: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-3">{title}</h3>
      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <p className="text-sm font-medium text-slate-700 font-mono">"{question}"</p>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        <span className="font-semibold text-teal-700">Result:</span> {result}
      </p>
    </div>
  );
}

function SystemCard({ title, count, icon, slug }: { title: string; count: string; icon: string; slug: string }) {
  return (
    <Link 
      href={`/capabilities/${slug}`}
      className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-0.5 group block h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        </div>
        <p className="text-xs text-slate-500 pl-8">{count}</p>
      </div>
      <div className="mt-4 pl-8 flex items-center gap-1 text-xs text-teal-600 font-bold group-hover:text-teal-700 transition-colors">
        <span>View examples</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
