import TimelineMotion from './timeline-motion';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#story">Skip to the story</a>
      <header className="masthead shell">
        <span className="wordmark">Anton Trantin<span className="orange">.</span></span>
        <span className="masthead-note">A WORK IN PROGRESS, SINCE 2003</span>
      </header>
      <main>
        <section className="hero shell" aria-labelledby="intro-title">
          <div className="hero-copy">
            <p className="eyebrow">ENGINEER. ENTREPRENEUR. ANGEL INVESTOR.</p>
          <figure className="portrait-note">
            <img src="/portrait.png" alt="Anton Trantin smiling" width="250" height="250" fetchPriority="high" />
            <figcaption>Hi, I’m Anton.</figcaption>
          </figure>
            <h1 id="intro-title">Still<br /><em>building.</em></h1>
            <p className="intro">I started writing software for satellite ground stations in 2006. Since then, I’ve built products, started businesses, closed some, and kept learning.</p>
            <a className="story-link" href="#story">A few chapters along the way <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-foot"><span>THE THREAD SO FAR</span><span>2003 — PRESENT</span></div>
        </section>
        <section className="timeline shell" id="story" aria-label="My story">
          <TimelineMotion />
          <article className="chapter">
            <div className="chapter-date">2003–2009<span className="chapter-index">01 / THE BEGINNING</span></div>
            <div className="chapter-body"><h2>Curiosity gets practical.</h2><p>I got hooked on technology in 2003. By 2006, I was writing low-level software and drivers for satellite ground stations. C++, assembly, and a very tangible connection between code and the real world.</p><p>At Bauman Moscow State Technical University, my thesis took me to SIBERIA-2, an electron storage ring, to work on a micromechanical gyroscope-accelerometer.</p><p className="aside">An unusually large machine. A very small device.</p></div>
          </article>
          <article className="chapter">
            <div className="chapter-date">2009–2015<span className="chapter-index">02 / THE REAL WORLD</span></div>
            <div className="chapter-body"><h2>Software meets<br />the real world.</h2><p>Airport operations. Enterprise systems. Intelligent transport infrastructure for the 2014 Winter Olympics in Sochi. Different industries, different stacks, and software that had to work beyond a demo.</p><p>I moved from writing code to designing systems and leading teams. Somewhere along the way, I realised that the hardest problems were often in communication and business, rather than the technology itself.</p><p className="aside">The stack changes. That lesson holds up.</p></div>
          </article>
          <article className="chapter">
            <div className="chapter-date">2016–2019<span className="chapter-index">03 / INTO BUSINESS</span></div>
            <div className="chapter-body"><h2>Learning to be<br />a founder.</h2><p>After studying software engineering at Innopolis University, I co-founded Innosoft and became deeply involved in building YORSO, a B2B platform for the seafood industry.</p><p>I went from CTO to CEO, learning product, sales, fundraising, and company-building by doing them. The journey took us through the 500 Startups & Sberbank accelerator and to recognition at Fish 2.0, held at Stanford.</p><p className="aside">I knew software. There was a lot to learn about fish.</p></div>
          </article>
          <article className="chapter">
            <div className="chapter-date">2020–2025<span className="chapter-index">04 / CONSUMER SCALE</span></div>
            <div className="chapter-body"><h2>A much bigger<br />everyday audience.</h2><p>In 2020, I started building in the mass-market consumer space. Products for everyday use, reaching people around the world.</p><p>That work grew into an international business, with companies operating in 11+ countries. The products reach users worldwide.</p><div className="cumulative"><span className="big-number">600M<span>+</span></span><div><strong>Cumulative installs</strong><span>Since 2020, through today</span></div></div></div>
          </article>
          <article className="chapter chapter-investing">
            <div className="chapter-date">Along the way<span className="chapter-index">05 / PEOPLE</span></div>
            <div className="chapter-body"><h2>Backing people.</h2><p className="investing-statement">I back entrepreneurs—the people doing the work.</p><p>Angel investing has become another part of the journey. For me, it starts with the person building the business.</p></div>
          </article>
          <article className="chapter chapter-now">
            <div className="chapter-date">2025–present<span className="chapter-index"><span className="now-dot" />06 / STILL BUILDING</span></div>
            <div className="chapter-body"><h2>Same curiosity.<br /><em>New possibilities.</em></h2><p>Since 2025, I’ve been building an AI-centric company and AI-centric products. Agents are part of how we work every day, alongside a team of five people.</p><p>We currently run ten live products, with five million daily active users—and the audience keeps growing. Everything is built in-house. No contractors.</p><dl className="current-metrics"><div><dt>Live products</dt><dd>10</dd></div><div><dt>Daily active users</dt><dd>5M</dd></div><div><dt>People, fully in-house</dt><dd>5</dd></div></dl><p className="metric-caption">The team today. The next chapter is already underway.</p></div>
          </article>
        </section>
        <section className="closing shell" aria-labelledby="closing-title">
          <p className="eyebrow">NOT A STRAIGHT LINE. STILL A GOOD JOURNEY.</p>
          <h2 id="closing-title">Dozens of experiments that didn’t work out.<br />Two mini-exits. Several businesses still going.<br /><em>And more to build.</em></h2>
          <p className="build-loop"><span>build</span><b aria-hidden="true">→</b><span>fail</span><b aria-hidden="true">→</b><span>analyze</span><b aria-hidden="true">→</b><span>learn</span><b aria-hidden="true">→</b><span className="orange">repeat</span><span className="sr-only">. Repeat the cycle.</span></p>
        </section>
      </main>
      <footer className="footer shell">
        <span className="footer-signature">Anton Trantin<span className="orange">.</span></span>
        <nav aria-label="Find me online"><a href="https://www.linkedin.com/in/atrantin/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://fb.com/anton.trantin" target="_blank" rel="noopener noreferrer">Facebook <span aria-hidden="true">↗</span></a><a href="https://t.me/atrantin" target="_blank" rel="noopener noreferrer">Telegram <span aria-hidden="true">↗</span></a><a href="https://twitter.com/antontrantin" target="_blank" rel="noopener noreferrer">X <span aria-hidden="true">↗</span></a></nav>
      </footer>
    </>
  );
}
