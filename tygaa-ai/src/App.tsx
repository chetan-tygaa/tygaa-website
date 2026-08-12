import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Brain, Check, ChevronDown, CircleUserRound, MessageCircle, ShieldCheck } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logoAsset from '@assets/tygaa-logo-edge-blended.png';

const queryClient = new QueryClient();

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const roleData = {
  athlete: {
    label: 'For athletes',
    title: 'A steadier mind for the moments that count.',
    copy: 'A private, practical space to build mental fitness alongside physical and skills training. Small prompts and reflections turn awareness into habits that travel with you.',
    quote: 'Practice the pause. Then play your game.',
  },
  coach: {
    label: 'For coaches',
    title: 'More context. Better conversations.',
    copy: 'Coaches can invite context from the people around an athlete and use shared progress reports to support the person behind the performance — without adding noise to the training day.',
    quote: 'See the whole athlete, not only the result.',
  },
  psychologist: {
    label: 'For psychologists',
    title: 'Your approach, extended with care.',
    copy: 'A psychologist’s approach can power a supervised AI surrogate for reinforcement, reminders, feedback collection, and personalized learning. Human review keeps the relationship real and the work grounded.',
    quote: 'Technology carries the thread. You hold the relationship.',
  },
  family: {
    label: 'For parents',
    title: 'A clearer way to support from the side-lines.',
    copy: 'Parents can be invited to contribute useful context and receive progress reports, so support at home feels informed, encouraging, and aligned with the athlete’s wider environment.',
    quote: 'Support the person. Let performance follow.',
  },
};

type RoleKey = keyof typeof roleData;

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a className="brand-logo" href="#top" data-testid="link-brand-home" aria-label="Tygaa.ai home">
      <img
        src={logoAsset}
        alt="Tygaa.ai"
        className="brand-logo-image"
        data-testid="img-header-logo"
      />
    </a>
  );
}

function Header() {
  return (
    <header className="topbar" data-testid="header-navigation">
      <div className="container-wide nav-inner">
        <Brand />
        <a className="nav-cta" href="mailto:chetan@tygaa.ai?subject=Bring Tygaa.ai to our program" data-testid="link-nav-contact">
          Talk to us <ArrowRight size={14} />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="hero" id="top" data-testid="section-hero">
      <div className="container-wide">
        <div className="hero-grid">
          <div className="hero-copy reveal" ref={ref}>
            <span className="eyebrow">Mental fitness for the full journey</span>
            <h1 className="display">Train the mind.<br /><em>Find your true north.</em></h1>
            <p>Tygaa.ai helps budding athletes build resilience and perform with more clarity — bringing psychologists, coaches, and families into one supportive training environment.</p>
            <div className="hero-actions">
              <span className="button-primary coming-soon" aria-label="Coming Soon" data-testid="status-coming-soon">Coming Soon</span>
              <a className="button-quiet" href="mailto:chetan@tygaa.ai?subject=Talk to Tygaa.ai" data-testid="link-hero-contact">Contact us <ArrowRight size={15} /></a>
            </div>
            <div className="hero-note"><i /> Built for academies and school programs</div>
          </div>
          <div className="hero-art" data-testid="visual-hero-logo">
            <div className="orbit" aria-hidden="true" />
            <img className="logo-art" src={logoAsset} alt="Tygaa.ai prism compass logo" data-testid="img-brand-logo" />
            <div className="hero-art-label"><strong>Mind in motion</strong><span>Practice, reflect, return</span></div>
          </div>
        </div>
      </div>
      <span className="scroll-marker">Scroll to explore</span>
    </section>
  );
}

function Ribbon() {
  return (
    <div className="ribbon" data-testid="section-program-ribbon">
      <div className="container-wide ribbon-inner">
        <p>Because potential is more than what shows on the scoreboard.</p>
        <div className="ribbon-markers"><span><i /> athletes</span><span><i /> coaches</span><span><i /> psychologists</span><span><i /> families</span></div>
      </div>
    </div>
  );
}

function Approach() {
  const headingRef = useReveal<HTMLDivElement>();
  return (
    <section className="section" id="approach" data-testid="section-approach">
      <div className="container-wide">
        <div className="split-intro reveal" ref={headingRef}>
          <div className="section-heading">
            <span className="eyebrow">The Tygaa approach</span>
            <h2 className="display">The inner game deserves a <em>training plan.</em></h2>
          </div>
          <div className="intro-statement">
            “The goal isn’t to make athletes feel invincible. It’s to help them notice what’s happening, choose their next move, and keep growing.”
            <small>MENTAL FITNESS AS A DAILY PRACTICE<br />NOT A LAST RESORT</small>
          </div>
        </div>
        <div className="three-points" data-testid="list-approach-principles">
          <article className="point" data-testid="card-approach-01">
            <span className="point-number">01 / NOTICE</span>
            <h3>Build self-awareness</h3>
            <p>Make room for athletes to recognise patterns, emotions, and the conditions that help them do their best work.</p>
          </article>
          <article className="point" data-testid="card-approach-02">
            <span className="point-number">02 / PRACTICE</span>
            <h3>Turn insight into habits</h3>
            <p>Short, consistent reinforcement bridges the space between a good conversation and what happens in the next session.</p>
          </article>
          <article className="point" data-testid="card-approach-03">
            <span className="point-number">03 / RETURN</span>
            <h3>Come back to the work</h3>
            <p>Resilience is not a finish line. It is the ability to reset, learn, and step back into the moment with intention.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Model() {
  return (
    <section className="section model-section" id="ecosystem" data-testid="section-ecosystem">
      <div className="container-wide model-grid">
        <div className="model-visual" data-testid="visual-ecosystem-model">
          <div className="model-core"><span>ONE<br />SUPPORTIVE<br />LOOP</span></div>
          <div className="node node-athlete">ATHLETE</div>
          <div className="node node-coach">COACH</div>
          <div className="node node-psych">PSYCHOLOGIST</div>
          <div className="node node-family">PARENT</div>
        </div>
        <div className="model-copy">
          <span className="eyebrow">A connected environment</span>
          <h2 className="display">Nobody supports an athlete <em>alone.</em></h2>
          <p>Tygaa.ai brings the right people into the same picture, while respecting the role each person plays. The result is a more continuous kind of support — between sessions, competitions, and conversations.</p>
          <ul className="model-list">
            <li><Check size={16} /><span>Psychologists stay involved through review, summaries, and progress context.</span></li>
            <li><Check size={16} /><span>Coaches and parents can contribute what they notice and receive useful reports.</span></li>
            <li><Check size={16} /><span>Athletes get a private, approachable way to keep practising between touchpoints.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  const steps = [
    { icon: CircleUserRound, title: 'Connect', body: 'An academy or school program creates the setting and invites the people who support the athlete.' },
    { icon: Brain, title: 'Personalise', body: 'The athlete’s journey is shaped by their goals, context, and the psychologist’s approach.' },
    { icon: MessageCircle, title: 'Reinforce', body: 'AI agents help with reminders, reflection, feedback collection, and personalised learning.' },
    { icon: ShieldCheck, title: 'Stay human', body: 'Psychologists review summaries and progress, stepping in when their expertise is needed.' },
  ];
  return (
    <section className="section section-dark" id="how-it-works" data-testid="section-how-it-works">
      <div className="container-wide">
        <div className="section-heading" ref={ref}>
          <span className="eyebrow">How it works</span>
          <h2 className="display">A smarter layer around the <em>human work.</em></h2>
          <p>Technology makes the practice more present. People keep it personal, thoughtful, and grounded.</p>
        </div>
        <div className="steps" data-testid="list-how-it-works">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <article className="step" key={title} data-testid={`card-step-${index + 1}`}>
              <span className="step-index">0{index + 1}</span>
              <Icon className="step-icon" size={23} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roles() {
  const [role, setRole] = useState<RoleKey>('athlete');
  const active = roleData[role];
  return (
    <section className="section roles-section" data-testid="section-roles">
      <div className="container-wide roles-layout">
        <div className="roles-sidebar">
          <span className="eyebrow">A place for every perspective</span>
          <div className="section-heading">
            <h2 className="display">Support that meets people <em>where they are.</em></h2>
          </div>
          <div className="role-tabs" role="tablist" aria-label="Tygaa.ai perspectives">
            {(Object.keys(roleData) as RoleKey[]).map((key) => (
              <button className={`role-tab ${role === key ? 'active' : ''}`} type="button" role="tab" aria-selected={role === key} onClick={() => setRole(key)} key={key} data-testid={`button-role-${key}`}>
                {roleData[key].label} <ChevronDown size={15} />
              </button>
            ))}
          </div>
        </div>
        <div className="role-panel" role="tabpanel" data-testid={`panel-role-${role}`}>
          <span className="role-tag">{active.label}</span>
          <h3 className="display">{active.title}</h3>
          <p>{active.copy}</p>
          <span className="role-quote">“{active.quote}”</span>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <>
      <section className="closing" id="contact" data-testid="section-contact">
        <div className="container-wide closing-inner">
          <div>
            <span className="eyebrow">The next session starts here</span>
            <h2 className="display">Give potential a place to <em>grow.</em></h2>
          </div>
          <div className="closing-copy">
            <p>Bring Tygaa.ai to your academy or school program. Tell us what you are building and we will start a conversation.</p>
            <a className="button-primary" href="mailto:chetan@tygaa.ai?subject=Bring Tygaa.ai to our program" data-testid="link-contact-email">Contact us <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>
      <footer className="footer" data-testid="footer-site">
        <div className="container-wide footer-inner">
          <Brand />
          <span data-testid="text-footer-note">Mental fitness for the full journey.</span>
          <div className="footer-links">
            <a href="#approach" data-testid="link-footer-approach">Approach</a>
            <a href="#how-it-works" data-testid="link-footer-how-it-works">How it works</a>
            <a href="mailto:chetan@tygaa.ai" data-testid="link-footer-email">chetan@tygaa.ai</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <main className="tygaa-page">
      <Header />
      <Hero />
      <Ribbon />
      <Approach />
      <Model />
      <HowItWorks />
      <Roles />
      <Closing />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
