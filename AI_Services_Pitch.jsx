import { useState, useEffect, useRef } from "react";

const LOGO_B64 = "";

const colors = {
  primary: '#1a4f6e',
  accent: '#2b7aab',
  gold: '#c9a84c',
  dark: '#111827',
  mid: '#374151',
  lightBg: '#f8f9fa',
  blueBg: '#f0f4f8',
  white: '#ffffff',
  text: '#1f2937',
  lightText: '#4b5563',
  muted: '#6b7280',
};

const images = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
  city: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1600&q=80',
  future: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export default function PitchDeck() {
  const [activeSection, setActiveSection] = useState('hero');
  const isScrollingRef = useRef(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'summary', label: 'Executive Summary' },
    { id: 'purpose', label: 'Purpose' },
    { id: 'frankie', label: 'Frankie Integration' },
    { id: 'rationale', label: 'Strategic Rationale' },
    { id: 'functions', label: 'Core Functions' },
    { id: 'impact', label: 'Business Impact' },
    { id: 'rollout', label: 'Rollout' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'compensation', label: 'Compensation' },
    { id: 'guardrails', label: 'Guardrails' },
    { id: 'closing', label: 'Closing' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (sectionId) => {
    setActiveSection(sectionId);
    isScrollingRef.current = true;
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isScrollingRef.current = false; }, 1200);
  };

  // ─── Reusable Styles ───
  const sectionStyle = (bg = colors.white) => ({
    background: bg,
    padding: '5rem 2rem',
  });
  const innerStyle = { maxWidth: '960px', margin: '0 auto' };
  const eyebrow = {
    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: colors.accent, marginBottom: '0.75rem',
  };
  const h2Style = {
    fontSize: '2.4rem', fontWeight: 800, color: colors.primary,
    lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.02em',
  };
  const prose = {
    fontSize: '1.05rem', color: colors.text, lineHeight: 1.85, marginBottom: '1.5rem',
  };
  const goldBar = {
    width: 48, height: 3, background: colors.gold, marginBottom: '2rem', borderRadius: 2,
  };

  // ─── Photo Divider ───
  const PhotoDivider = ({ src, alt }) => (
    <div style={{
      height: 280, width: '100%',
      backgroundImage: `linear-gradient(rgba(26,79,110,0.35), rgba(26,79,110,0.35)), url(${src})`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
    }} role="img" aria-label={alt} />
  );

  return (
    <div style={{ fontFamily: font, color: colors.text, background: colors.white }}>

      {/* ═══ STICKY NAV ═══ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)', borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', display: 'flex', overflowX: 'auto',
          padding: '0 1.5rem', gap: 0,
        }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => handleNav(s.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.9rem 1.1rem', fontSize: '0.8rem', fontWeight: 600,
              color: activeSection === s.id ? colors.primary : colors.muted,
              borderBottom: activeSection === s.id ? `3px solid ${colors.primary}` : '3px solid transparent',
              whiteSpace: 'nowrap', transition: 'all 0.2s', fontFamily: font,
              letterSpacing: '0.01em',
            }}>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{
        backgroundImage: `linear-gradient(rgba(13,31,45,0.75), rgba(26,79,110,0.7)), url(${images.hero})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: colors.white, padding: '6rem 2rem 5rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {LOGO_B64 ? (
            <img src={`data:image/png;base64,${LOGO_B64}`} alt="Franklin Street"
              style={{ height: 56, marginBottom: '2.5rem', filter: 'brightness(0) invert(1)' }} />
          ) : (
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '0.01em' }}>
              Franklin<span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>Street</span>
            </div>
          )}
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Internal Leadership Proposal · April 2026
          </div>
          <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            AI Services Division
          </h1>
          <div style={{ width: 48, height: 3, background: colors.gold, margin: '0 auto 1.5rem', borderRadius: 2 }} />
          <p style={{ fontSize: '1.2rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 2.5rem' }}>
            Building client-facing platforms, workflow systems, and data tools that extend the power of Frankie — not create another data silo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Prepared by Alex Wright', 'New Business Line', 'Board Presentation'].map((t) => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 100, padding: '0.4rem 1.1rem', fontSize: '0.8rem', fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
      <div style={{ width: '100%', height: 4, background: `linear-gradient(90deg, ${colors.gold} 0%, transparent 60%)` }} />

      {/* ═══ EXECUTIVE SUMMARY ═══ */}
      <section id="summary" style={sectionStyle(colors.lightBg)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Executive Summary</div>
          <h2 style={h2Style}>A New Division Built on Frankie</h2>
          <div style={goldBar} />
          <p style={prose}>
            I would like to propose the creation of an AI Services Division focused on building custom dashboards, software tools, CRM-style workflow platforms, data aggregation systems, site selection tools, and marketing support tools for our brokerage teams and clients. The goal is to move beyond spreadsheet-based workflows and create better systems that improve visibility, collaboration, reporting, and execution.
          </p>
          <p style={prose}>
            A key part of this proposal is that these systems should integrate with Frankie, not replace it. Frankie is our proprietary internal CRM system that houses people, companies, and properties and helps connect relationships across the company for our services. I believe Frankie should remain the internal foundation and system of record. What I am proposing is an external and functional layer that lives on top of Frankie, multiplies its power, and pushes useful structured data back into it so we do not create more fragmentation.
          </p>
          <p style={prose}>
            I believe this initiative would strengthen client relationships, improve service delivery, and create a meaningful company-level competitive advantage. By building company-owned tools on top of Frankie, we can create a more durable infrastructure that improves cross-office collaboration, increases producer effectiveness, strengthens agent retention, enhances recruiting, and makes it much harder for important organized workflows and intelligence to leave the firm.
          </p>
          <p style={prose}>
            The broader vision is to create systems that make each agent more effective, more scalable, and more valuable within the company platform. In many cases, these tools can materially multiply the effectiveness of one agent or team by reducing manual work, improving data access, and creating more organized workflows. This would apply not only to leasing, but also to insurance, property management, project management, investment sales, hospitality, capital advisory, and occupier services through custom site selection and decision-making tools.
          </p>

          <div style={{
            background: `linear-gradient(135deg, rgba(43,122,171,0.06), rgba(201,168,76,0.06))`,
            border: `2px solid ${colors.gold}`, borderRadius: 16,
            padding: '2rem 2.5rem', marginTop: '2rem',
          }}>
            <div style={{ fontWeight: 700, color: colors.primary, fontSize: '1.05rem', marginBottom: '0.75rem' }}>Core Principle</div>
            <p style={{ ...prose, marginBottom: 0, fontStyle: 'italic', color: colors.mid }}>
              What we build should integrate with Frankie, live on top of it, and push structured value back into it. The goal is to multiply the power of Frankie, not create another data silo.
            </p>
          </div>
        </div>
      </section>

      <PhotoDivider src={images.office} alt="Modern office space" />

      {/* ═══ PURPOSE ═══ */}
      <section id="purpose" style={sectionStyle(colors.white)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Purpose</div>
          <h2 style={h2Style}>What This Division Will Build</h2>
          <div style={goldBar} />
          <p style={prose}>
            My goal is to help move our service model beyond fragmented spreadsheets, manual reporting, and disconnected processes, and instead create more intelligent, centralized systems that improve execution, visibility, collaboration, and client service. The division would focus on building:
          </p>
          <p style={prose}>
            Custom dashboards for deal tracking, leasing activity, and portfolio analysis. CRM-style operating systems for workflows, reporting, and client-facing use cases. Client-facing reporting platforms that make our role more embedded in how clients operate. Data research and aggregation tools that centralize information currently spread across spreadsheets, emails, and static files. Marketing support systems for proposals, packages, presentations, and reporting. Custom software or lightweight apps that solve recurring workflow problems for agents and clients. And custom site selection tools for occupier services that organize market, demographic, traffic, co-tenancy, competition, and deal criteria into a more intelligent decision-making platform.
          </p>
        </div>
      </section>

      {/* ═══ FRANKIE INTEGRATION ═══ */}
      <section id="frankie" style={sectionStyle(colors.blueBg)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Frankie Integration Principle</div>
          <h2 style={h2Style}>Frankie Stays the Foundation</h2>
          <div style={goldBar} />
          <p style={prose}>
            A critical part of this proposal is that what I am describing should integrate with Frankie, not compete with Frankie. For context, Frankie is our proprietary internal CRM system that houses people, companies, and properties, and helps connect relationships across the company for our services. I believe Frankie should remain the core internal system of record.
          </p>
          <p style={prose}>
            What this division would build is not meant to become a separate house for company data. The goal would be to build tools, dashboards, workflows, and client-facing applications that live on top of Frankie, draw from it, enhance it, and feed useful structured data back into it.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
            margin: '2.5rem 0',
          }}>
            {[
              { label: 'Frankie', role: 'Internal Foundation', desc: 'Remains the core internal system of record. Houses people, companies, properties, and relationship mapping across services.', color: colors.primary },
              { label: 'AI Services Division', role: 'External Superpower', desc: 'Builds tools, dashboards, workflows, and client-facing applications that live on top of Frankie and multiply its power.', color: colors.accent },
              { label: 'Data Feedback Loop', role: 'Structured Intelligence', desc: 'Data generated through these tools flows back into Frankie so the company becomes smarter and more connected over time.', color: colors.gold },
            ].map(({ label, role, desc, color }) => (
              <div key={label} style={{
                background: colors.white, borderRadius: 14, padding: '1.75rem',
                borderTop: `4px solid ${color}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color, marginBottom: '0.5rem' }}>{label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.dark, marginBottom: '0.75rem' }}>{role}</div>
                <p style={{ fontSize: '0.92rem', color: colors.lightText, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}, #0d3350)`,
            borderRadius: 14, padding: '1.75rem 2.25rem', color: colors.white,
            fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic',
          }}>
            "Any system developed through this division should be evaluated first on how it integrates with Frankie, avoids unnecessary fragmentation, and contributes useful structured intelligence back into the company ecosystem."
          </div>
        </div>
      </section>

      <PhotoDivider src={images.city} alt="City skyline" />

      {/* ═══ STRATEGIC RATIONALE ═══ */}
      <section id="rationale" style={sectionStyle(colors.white)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Strategic Rationale</div>
          <h2 style={h2Style}>Why Franklin Street Should Do This Now</h2>
          <div style={goldBar} />
          <p style={prose}>
            A large portion of the real estate industry still operates through spreadsheets, static reports, and manual workflows. I believe that if we can provide clients and producers with systems that are materially better than what they currently use, we create a more embedded relationship and a more efficient operating model.
          </p>

          {[
            { num: '1', title: 'Stronger Client Retention', text: 'When clients rely on company-built dashboards, reporting tools, site selection systems, and workflow platforms, our services become more integrated into their day-to-day operations. That makes our relationships stickier and reduces the likelihood of clients moving business elsewhere.' },
            { num: '2', title: 'Better Cross-Office Collaboration and Institutional Knowledge', text: 'By building systems that sit on top of Frankie and push valuable data back into it, I believe we can improve collaboration across offices, producers, and service lines without creating new fragmentation.' },
            { num: '3', title: 'Frankie Becomes More Powerful, Not Less Relevant', text: 'Frankie already gives the company a proprietary internal CRM foundation by housing people, companies, properties, and relationship mapping across services. What I am proposing is an external and functional layer that expands what Frankie can do.' },
            { num: '4', title: 'Company-Owned Systems and Workflows Create Lasting Value', text: 'If agents build or maintain their own independent tools, those systems and the information inside them can leave with them. By contrast, if the company builds these systems and ties them back to Frankie, the value remains inside the organization and can continue benefiting multiple teams and offices over time.' },
            { num: '5', title: 'Recruiting Advantage', text: 'A company that can offer agents access to proprietary internal infrastructure like Frankie, plus custom-built dashboards, AI-enabled tools, workflow automation, reporting systems, and site selection platforms built on top of it, becomes much more attractive from a recruiting standpoint.' },
            { num: '6', title: 'Stronger Retention of Existing Agents', text: 'When agents work inside a platform ecosystem that makes them more effective and efficient, it becomes harder to walk away from that support structure.' },
            { num: '7', title: 'Increased Producer Effectiveness', text: 'Better tools can reduce administrative burden, improve reporting speed, create better access to information, and make workflows more organized and scalable.' },
            { num: '8', title: 'Future-Oriented Service Model', text: 'Creating this division now would position the company ahead of competitors and allow us to build an internal capability that can become a major differentiator in how we service clients and support agents.' },
          ].map(({ num, title, text }) => (
            <div key={num} style={{ marginBottom: '2rem', display: 'flex', gap: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dbeafe', lineHeight: 1, flexShrink: 0, marginTop: 4 }}>{num}</div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.primary, marginBottom: '0.5rem' }}>{title}</div>
                <p style={{ ...prose, marginBottom: 0 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CORE FUNCTIONS & EXAMPLES ═══ */}
      <section id="functions" style={sectionStyle(colors.lightBg)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Core Functions & Cross-Company Opportunities</div>
          <h2 style={h2Style}>What This Division Could Build</h2>
          <div style={goldBar} />
          <p style={prose}>
            One of the strengths of this concept is that it is not limited to one service line. The same core capability can support multiple business units across the company, while using Frankie as the internal data backbone.
          </p>

          {/* Business Lines Table */}
          <div style={{ overflowX: 'auto', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', marginBottom: '3rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <thead>
                <tr>
                  <th style={{ background: colors.primary, color: colors.white, padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.03em' }}>Business Line</th>
                  <th style={{ background: colors.primary, color: colors.white, padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.03em' }}>Example Opportunities</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Insurance', 'Renewal dashboards, prospect/submission trackers, producer reporting, AI summaries of notes and service requests, and tools that sync key account activity back into Frankie.'],
                  ['Property Management', 'Owner dashboards, work-order and vendor coordination tools, property-level reporting, tenant request systems, and workflows that capture operating activity back into Frankie.'],
                  ['Project Management / Development', 'Project dashboards for budgets, milestones, approvals, contractors, and client portals; AI meeting-note summaries and structured project updates tied back to Frankie.'],
                  ['Leasing', 'Landlord leasing dashboards, tenant rep workflows, broker outreach systems, marketing dashboards, and custom site selection tools for occupier services.'],
                  ['Investment Sales', 'Buyer outreach trackers, NDA and diligence dashboards, seller reporting portals, and deal-room style tools that preserve activity records back in Frankie.'],
                  ['Hospitality', 'Owner and operator dashboards for asset performance, capital plans, renovation timelines, market comps, and investor reporting.'],
                  ['Capital Advisory', 'Capital raise dashboards, lender and investor workflow tools, financing comparison dashboards, and client portals that feed relationship and process data back into Frankie.'],
                ].map(([line, desc], i) => (
                  <tr key={line}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: colors.primary, background: i % 2 === 1 ? '#f8fafc' : colors.white, borderBottom: '1px solid #e5e7eb', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{line}</td>
                    <td style={{ padding: '1rem 1.25rem', color: colors.text, background: i % 2 === 1 ? '#f8fafc' : colors.white, borderBottom: '1px solid #e5e7eb', lineHeight: 1.65 }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Core Function Descriptions */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: colors.primary, marginBottom: '1.25rem' }}>Core Function Areas</h3>

          <p style={prose}>
            <strong style={{ color: colors.primary }}>Client Platform Development</strong> — Leasing dashboards, deal and pipeline tracking systems, portfolio reporting tools, tenant activity tracking platforms, owner reporting portals, CRM-style workflow systems for active assignments, and custom site selection platforms for occupier clients.
          </p>
          <p style={prose}>
            <strong style={{ color: colors.primary }}>Internal Producer Tools</strong> — Prospect tracking, workflow automation, market research dashboards, internal reporting tools, pipeline management tools, and collaborative deal and assignment visibility.
          </p>
          <p style={prose}>
            <strong style={{ color: colors.primary }}>Marketing and Presentation Support</strong> — Leasing packages, proposal tools, presentation dashboards, customized reporting outputs, and data-backed marketing support materials.
          </p>
          <p style={prose}>
            <strong style={{ color: colors.primary }}>Data Research and Aggregation</strong> — Centralize and structure information currently spread across spreadsheets, emails, and static files. Write useful structured outputs back into Frankie so the company captures more lasting value.
          </p>
          <p style={prose}>
            <strong style={{ color: colors.primary }}>AI Workflow Integration</strong> — Research and summarization, reporting automation, information organization, repetitive process execution, internal search and knowledge retrieval, and draft content generation where helpful.
          </p>
        </div>
      </section>

      <PhotoDivider src={images.dashboard} alt="Data analytics dashboard" />

      {/* ═══ BUSINESS IMPACT ═══ */}
      <section id="impact" style={sectionStyle(colors.white)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Business Impact</div>
          <h2 style={h2Style}>Why This Creates Lasting Company Value</h2>
          <div style={goldBar} />

          {[
            { title: 'Revenue Protection and Account Stickiness', text: 'If clients begin relying on company-built tools and reporting systems, our role becomes more embedded and harder to replace.' },
            { title: 'Better Support for Producers', text: 'Providing stronger systems to agents allows them to operate with more leverage, better information, and less administrative friction.' },
            { title: 'More Value from Frankie', text: 'Instead of Frankie only being an internal repository, it becomes the core data engine behind a broader ecosystem of dashboards, workflows, reporting tools, and client-facing systems.' },
            { title: 'Company-Level Competitive Advantage', text: 'I believe this initiative can create a real infrastructure advantage that competitors may not have, particularly if most firms are still operating through spreadsheets and disconnected workflows.' },
            { title: 'Recruiting and Retention Value', text: 'A company that gives agents access to better internal platforms, automation, reporting tools, and specialized workflow systems becomes more attractive to new talent and more difficult for existing producers to leave.' },
            { title: 'Better Control of Structured Company Intelligence', text: 'If the company houses the systems and Frankie remains the connected internal source of truth, we have stronger control over how information is stored, managed, protected, and shared.' },
            { title: 'Long-Term Scalability', text: 'Over time, the best systems created for one team or client can be standardized, improved, and deployed more broadly across the company.' },
          ].map(({ title, text }, i) => (
            <div key={i} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: i < 6 ? '1px solid #e5e7eb' : 'none' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.primary, marginBottom: '0.5rem' }}>{title}</div>
              <p style={{ ...prose, marginBottom: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ROLLOUT ═══ */}
      <section id="rollout" style={sectionStyle(colors.blueBg)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Proposed Operating Model</div>
          <h2 style={h2Style}>Rollout Approach</h2>
          <div style={goldBar} />

          <p style={prose}>
            This division would serve brokerage teams and clients who request custom platforms, dashboards, workflow systems, site selection tools, or reporting tools. It would be opt-in and demand-driven rather than imposed firmwide. Only participating teams would be included in the funding structure.
          </p>
          <p style={prose}>
            The service approach would focus on improving client retention, improving producer effectiveness, replacing spreadsheet-heavy workflows, increasing internal collaboration, creating repeatable tools and systems, strengthening the company's long-term platform advantage, and reinforcing and extending Frankie rather than fragmenting around it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              { phase: 'Phase 1', title: 'Launch & Prove', text: 'Launch with a select group of teams and projects. Focus on high-value use cases. Prove impact. Ensure strong Frankie integration principles from the beginning.', color: colors.primary },
              { phase: 'Phase 2', title: 'Standardize & Expand', text: 'Standardize the best-performing tools. Expand support to additional teams and offices. Create reusable frameworks. Deepen the feedback loop between external tools and Frankie.', color: colors.accent },
              { phase: 'Phase 3', title: 'Broaden & Scale', text: 'Broaden company adoption. Explore additional revenue or service opportunities. Further develop the company\'s technology-enabled service model built on top of Frankie.', color: colors.gold },
            ].map(({ phase, title, text, color }, i) => (
              <div key={i} style={{
                background: colors.white, borderRadius: 14, padding: '1.75rem',
                borderTop: `4px solid ${color}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color, marginBottom: '0.5rem' }}>{phase}</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: colors.dark, marginBottom: '0.75rem' }}>{title}</div>
                <p style={{ fontSize: '0.92rem', color: colors.lightText, lineHeight: 1.7, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoDivider src={images.team} alt="Team collaboration" />

      {/* ═══ PROPOSED LEADERSHIP ═══ */}
      <section id="leadership" style={sectionStyle(colors.white)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Proposed Leadership Structure</div>
          <h2 style={h2Style}>Why I Should Lead This</h2>
          <div style={goldBar} />
          <p style={prose}>
            I would like to lead the AI Services Division. I believe this role should be led by someone who understands the brokerage business, sees where current workflows fall short, understands the opportunity to improve client and agent outcomes through technology, and can translate real estate needs into practical platforms and tools.
          </p>
          <p style={prose}>
            I believe I am well positioned to lead this initiative because I already work closely with the operational and client-facing problems this division is meant to solve. That gives me the ability to identify high-value opportunities, prioritize solutions that matter in practice, and help ensure the tools being built actually improve how teams and clients operate while fitting into the company's broader platform strategy.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: colors.primary, marginTop: '2rem', marginBottom: '1rem' }}>My Primary Responsibilities Would Include</h3>
          <p style={prose}>
            Identifying and prioritizing opportunities for platforms and tools. Working directly with agents and clients to understand operational needs. Building and overseeing custom dashboards, software, apps, and reporting systems. Ensuring these systems integrate appropriately with Frankie. Leading AI, data, and automation initiatives tied to brokerage services. Improving adoption and internal awareness across offices and teams. Helping standardize high-value tools for wider company use. And overseeing implementation, support, and long-term improvement.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: colors.primary, marginTop: '2rem', marginBottom: '1rem' }}>Support Hire</h3>
          <p style={prose}>
            To make the division functional and scalable, I believe there should also be at least one additional support person. This role would assist with dashboard and platform creation, support data cleanup, organization, and uploads, help maintain and improve workflows and reporting tools, assist with implementation details, QA, revisions, and ongoing support, and help manage requests and execution as adoption grows.
          </p>
        </div>
      </section>

      {/* ═══ COMPENSATION ═══ */}
      <section id="compensation" style={sectionStyle(colors.lightBg)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Compensation & Funding Model</div>
          <h2 style={h2Style}>A Structure Aligned with Adoption</h2>
          <div style={goldBar} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              borderRadius: 16, padding: '2.5rem 2rem', color: colors.white, textAlign: 'center',
              boxShadow: '0 8px 24px rgba(26,79,110,0.2)',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>DIVISION LEAD</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem' }}>$200K</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.75 }}>Minimum Annual Base</div>
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.gold})`,
              borderRadius: 16, padding: '2.5rem 2rem', color: colors.white, textAlign: 'center',
              boxShadow: '0 8px 24px rgba(43,122,171,0.2)',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>SUPPORT HIRE</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem' }}>$75K</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.75 }}>Annual Base Salary</div>
            </div>
          </div>

          <p style={prose}>
            I would propose a minimum annual base salary of $200,000 for leading this division. I believe the structure should be designed so that this base is funded through actual adoption of the division's services and not simply treated as general overhead. I would also propose an additional support hire with an annual base salary of $75,000, which I believe is important to make the division operationally viable.
          </p>

          <div style={{
            background: `linear-gradient(135deg, ${colors.primary}, #0d3350)`,
            borderRadius: 16, padding: '2.25rem 2.5rem', color: colors.white, marginTop: '2rem',
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Funding Model: 5% Opt-In Commission Allocation</div>
            <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              For teams that elect to use the AI Services Division, I would propose that 5% of the company's side of commission revenue from those teams be allocated toward funding this division. The 5% contribution would apply only to participating teams. Those funds would first go toward covering my minimum annual base of $200,000. Once that threshold is met, additional 5% allocations would become incremental compensation to me. This structure would directly incentivize me to create valuable tools, drive adoption, and expand participation across the company. The funding pool would also help support the cost justification for the additional $75,000 support hire.
            </p>
            <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, margin: 0 }}>
              I believe this model makes sense because it aligns cost with usage, avoids forcing all teams to subsidize the division, creates buy-in from teams that want the service, rewards growth and adoption, and allows the division to scale based on actual demand and value creation.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ GUARDRAILS ═══ */}
      <section id="guardrails" style={sectionStyle(colors.white)}>
        <div style={innerStyle}>
          <div style={eyebrow}>Suggested Guardrails</div>
          <h2 style={h2Style}>Keeping This Focused and Accountable</h2>
          <div style={goldBar} />

          {[
            { num: '1', title: 'Opt-In Participation', text: 'Only teams that want these services and agree to the funding model would participate.' },
            { num: '2', title: 'Clear Project Scope', text: 'Each engagement should have a defined scope, timeline, and objective so the division remains focused on high-impact work.' },
            { num: '3', title: 'Frankie-First Integration Standard', text: 'Any system developed through this division should be evaluated first on how it integrates with Frankie, avoids unnecessary fragmentation, and contributes useful structured intelligence back into the company ecosystem.' },
            { num: '4', title: 'Prioritization Standards', text: 'Projects should materially improve a client relationship, improve the effectiveness of a producing team, create repeatable long-term value for the company, be adaptable for broader company use over time, strengthen the company\'s ownership and control of important workflows and structured intelligence, and extend the value of Frankie rather than sitting outside of it.' },
            { num: '5', title: 'Annual Review', text: 'The division would be reviewed annually on adoption across teams, client retention impact, producer feedback, workflow efficiency gains, recruiting value, retention value, platform usage and business outcomes, and degree of successful integration with Frankie.' },
            { num: '6', title: 'Company Ownership of Systems', text: 'All systems, workflows, dashboards, platforms, and structured logic developed through this division should be company-owned assets so the long-term value remains with the firm.' },
          ].map(({ num, title, text }) => (
            <div key={num} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: num !== '6' ? '1px solid #e5e7eb' : 'none', display: 'flex', gap: '1.25rem' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dbeafe', lineHeight: 1, flexShrink: 0, marginTop: 4 }}>{num}</div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.primary, marginBottom: '0.5rem' }}>{title}</div>
                <p style={{ ...prose, marginBottom: 0 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section id="closing" style={{
        backgroundImage: `linear-gradient(rgba(13,31,45,0.82), rgba(26,79,110,0.75)), url(${images.future})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: colors.white, padding: '6rem 2rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={eyebrow}>The Bottom Line</div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.5rem' }}>
            The Future Belongs to Firms That Combine Expertise with Technology
          </h2>
          <div style={{ width: 48, height: 3, background: colors.gold, margin: '0 auto 2rem', borderRadius: 2 }} />
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            I do not see this as simply adding an internal tech role. I see it as building a new service capability and a new layer of company infrastructure that extends the power of an asset we already have in Frankie.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            If done correctly, I believe this division would allow us to provide better client service, create stickier client relationships, improve collaboration across offices, make agents more effective and scalable, attract stronger talent through better support systems, retain existing producers by giving them tools competitors do not offer, increase the value and usefulness of Frankie across the company, and keep the value of these systems and their intelligence inside the company rather than with individual agents.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: '0' }}>
            In a market where many firms still rely on spreadsheets and disconnected workflows, I believe this can become a real and meaningful differentiator. The firms that can combine brokerage expertise with custom technology, AI-enabled workflows, structured data systems, and a strong proprietary internal platform will have a major advantage over those that continue operating in a more manual and fragmented way.
          </p>
          <div style={{
            marginTop: '3.5rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'inline-flex', gap: '2.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)',
          }}>
            <div><div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Prepared by</div><strong style={{ color: 'rgba(255,255,255,0.9)' }}>Alex Wright</strong></div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div><div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Date</div><strong style={{ color: 'rgba(255,255,255,0.9)' }}>April 6, 2026</strong></div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div><div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Classification</div><strong style={{ color: 'rgba(255,255,255,0.9)' }}>Internal — Board</strong></div>
          </div>
        </div>
      </section>

    </div>
  );
}
