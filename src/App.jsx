import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#E8FF00",
  dark: "#1a1a2e",
  darkAlt: "#16213e",
  accent: "#ff4d4d",
  teal: "#00c896",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  white: "#ffffff",
  offWhite: "#f9fafb",
  lightGray: "#f3f4f6",
  border: "#e5e7eb",
  pink: "#ff6b9d",
  orange: "#ff8c42",
};

const navLinks = ["Home", "About", "Services", "Portfolio", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView();
  const translateMap = { up: "translateY(32px)", down: "translateY(-32px)", left: "translateX(32px)", right: "translateX(-32px)", none: "none" };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : translateMap[direction],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Avatar({ src, color, initials, size = 52, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color || COLORS.primary,
      border: `3px solid ${COLORS.white}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.3, color: COLORS.dark,
      overflow: "hidden", flexShrink: 0, ...style,
    }}>
      {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      transition: "all 0.3s ease",
      padding: "0 5%",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ fontWeight: 800, fontSize: 22, color: COLORS.dark, letterSpacing: -0.5 }}>
          <span style={{ color: COLORS.accent }}>●</span> Symun
        </div>
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}
          className="desktop-nav">
          {navLinks.map(link => (
            <li key={link}>
              <a href="#" style={{ textDecoration: "none", color: COLORS.text, fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = COLORS.accent}
                onMouseLeave={e => e.target.style.color = COLORS.text}>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <button style={{
          background: COLORS.dark, color: COLORS.white, border: "none", borderRadius: 50,
          padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          transition: "transform 0.2s, background 0.2s",
        }}
          onMouseEnter={e => { e.target.style.background = COLORS.accent; e.target.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.target.style.background = COLORS.dark; e.target.style.transform = "scale(1)"; }}
          className="desktop-cta">
          Get Started
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 24, color: COLORS.dark, display: "none",
        }}>☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: COLORS.white, padding: "16px 5%", borderTop: `1px solid ${COLORS.border}` }}>
          {navLinks.map(link => (
            <a key={link} href="#" style={{ display: "block", padding: "10px 0", textDecoration: "none", color: COLORS.text, fontSize: 15 }}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const avatarData = [
    { initials: "FX", color: "#6366f1", top: "12%", left: "4%" },
    { initials: "PL", color: COLORS.primary, top: "8%", left: "22%" },
    { initials: "RT", color: "#f59e0b", top: "40%", left: "2%" },
    { initials: "BK", color: "#10b981", top: "60%", left: "18%" },
    { initials: "LM", color: COLORS.pink, top: "30%", left: "34%" },
  ];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(135deg, #fefefe 0%, #f0f9ff 50%, #fef9ee 100%)`,
      padding: "100px 5% 60px", overflow: "hidden", position: "relative",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
        className="hero-grid">
        <FadeIn direction="right">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fef3c7", borderRadius: 50, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              Digital Agency
            </div>
            <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: COLORS.dark, margin: "0 0 8px", letterSpacing: -2 }}>
              Makers and
            </h1>
            <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: COLORS.dark, margin: "0 0 8px", letterSpacing: -2 }}>
              <span style={{ color: COLORS.accent, fontStyle: "italic" }}>Changing</span>
            </h1>
            <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: COLORS.dark, margin: "0 0 24px", letterSpacing: -2 }}>
              the Quo with
            </h1>
            <p style={{ fontSize: 17, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
              We help ambitious brands evolve — through strategy, design, and technology that moves fast and hits hard.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <button style={{
                background: COLORS.dark, color: COLORS.white, border: "none", borderRadius: 50,
                padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = COLORS.dark; e.currentTarget.style.transform = "translateY(0)"; }}>
                Start a Project →
              </button>
              <button style={{
                background: "transparent", color: COLORS.dark, border: `2px solid ${COLORS.dark}`, borderRadius: 50,
                padding: "13px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.dark; e.currentTarget.style.color = COLORS.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.dark; }}>
                View Work
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
              <div style={{ display: "flex" }}>
                {[COLORS.primary, "#6366f1", COLORS.pink, "#10b981"].map((c, i) => (
                  <Avatar key={i} color={c} initials={["AK","JD","MR","TL"][i]} size={38}
                    style={{ marginLeft: i > 0 ? -12 : 0 }} />
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.dark }}>500+ Happy Clients</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>★★★★★ 4.9 / 5 rating</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.2}>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              width: 380, height: 380, borderRadius: "50%",
              background: `radial-gradient(circle at 40% 40%, ${COLORS.primary}55, transparent 60%), radial-gradient(circle at 70% 70%, #6366f155, transparent 60%)`,
              border: `2px dashed ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", flexShrink: 0,
            }}
              className="hero-orb">
              <div style={{ width: 260, height: 260, borderRadius: "50%", overflow: "hidden", border: `4px solid ${COLORS.white}`, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
                <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #a8edea 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.dark }}>SY</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.dark, opacity: 0.7 }}>SYMUN HQ</div>
                  </div>
                </div>
              </div>
              {avatarData.map((a, i) => (
                <div key={i} style={{
                  position: "absolute", top: a.top, left: a.left,
                  animation: `float${i % 3} ${3 + i * 0.4}s ease-in-out infinite`,
                }}>
                  <Avatar initials={a.initials} color={a.color} size={50}
                    style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }} />
                </div>
              ))}
            </div>

            <div style={{ position: "absolute", top: "10%", right: -10, background: COLORS.white, borderRadius: 16, padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", minWidth: 140 }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>Projects Done</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.dark }}>1,200+</div>
            </div>
            <div style={{ position: "absolute", bottom: "15%", right: -20, background: COLORS.dark, borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: 130 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Team Size</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.white }}>45 Experts</div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-16px)} }
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;gap:40px!important}
          .desktop-nav,.desktop-cta{display:none!important}
          .mobile-menu-btn{display:block!important}
        }
      `}</style>
    </section>
  );
}

function TomorrowSection() {
  return (
    <section style={{ padding: "100px 5%", background: COLORS.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
        className="two-col">
        <FadeIn direction="right">
          <div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, lineHeight: 1.2, color: COLORS.dark, marginBottom: 20, letterSpacing: -1 }}>
              Tomorrow should be<br />
              <span style={{ color: COLORS.accent }}>better</span> than today.
            </h2>
            <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.75, marginBottom: 28 }}>
              We partner with forward-thinking organisations to craft digital experiences that stand out. Strategy first, execution always.
            </p>
            <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 36 }}>
              From early-stage startups to enterprise brands — our team delivers clarity, consistency, and momentum at every stage of the journey.
            </p>
            <button style={{
              background: "transparent", color: COLORS.dark, border: `2px solid ${COLORS.dark}`,
              borderRadius: 50, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.dark; e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.dark; }}>
              Learn More →
            </button>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { bg: `linear-gradient(135deg, ${COLORS.primary} 0%, #a8edea 100%)`, h: 200, label: "Creative Direction" },
              { bg: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`, h: 170, label: "Brand Strategy" },
              { bg: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`, h: 170, label: "Product Design" },
              { bg: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`, h: 200, label: "Development" },
            ].map((card, i) => (
              <div key={i} style={{
                borderRadius: 20, background: card.bg, height: card.h,
                display: "flex", alignItems: "flex-end", padding: 18,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)", transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:768px){.two-col{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}

function ProgressSection() {
  return (
    <section style={{ padding: "100px 5%", background: "#f8f9ff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
        className="two-col">
        <FadeIn direction="right">
          <div style={{ position: "relative" }}>
            <div style={{
              width: "100%", paddingTop: "80%", borderRadius: 32,
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
              position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(102,126,234,0.3)",
            }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", color: COLORS.white }}>
                  <div style={{ fontSize: 64 }}>📈</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>Growth Focused</div>
                </div>
              </div>
              <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, background: COLORS.white, borderRadius: 18, padding: "16px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>Avg. Growth Rate</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.dark }}>+240%</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.15}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#ede9fe", borderRadius: 50, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#6d28d9", marginBottom: 24 }}>
              How We Help
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, color: COLORS.dark, marginBottom: 20, letterSpacing: -1 }}>
              See how we can<br />help you <span style={{ color: "#6366f1" }}>progress</span>
            </h2>
            <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.75, marginBottom: 32 }}>
              Our process is built around measurable outcomes — not deliverables for deliverables' sake. We set bold goals, track what matters, and ship work that performs.
            </p>
            {[
              { icon: "🎯", title: "Strategy & Positioning", desc: "Defining your edge and how to own it." },
              { icon: "⚡", title: "Rapid Execution", desc: "From concept to live — faster than you think." },
              { icon: "📊", title: "Data-Driven Iteration", desc: "We optimise until the numbers sing." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.lightGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.dark, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: COLORS.textMuted }}>{item.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const services = [
  {
    icon: "🤝",
    title: "Collaborative & Partnership",
    desc: "We embed with your team — not just deliver to them. Your wins are our wins, and that shapes every decision we make.",
    color: COLORS.primary,
    tag: "Culture",
  },
  {
    icon: "⚖️",
    title: "We Pull Our Weight",
    desc: "No bloated processes or padded timelines. We show up prepared, think fast, and take real ownership of outcomes.",
    color: "#6366f1",
    tag: "Delivery",
  },
  {
    icon: "🧭",
    title: "Piloting Digital Confidence",
    desc: "Whether it's a rebrand or a full platform build, we navigate complexity so you can move forward without doubt.",
    color: "#10b981",
    tag: "Strategy",
  },
];

function OffersSection() {
  return (
    <section style={{ padding: "100px 5%", background: COLORS.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#dcfce7", borderRadius: 50, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 16 }}>
                What We Offer
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, lineHeight: 1.15, color: COLORS.dark, margin: 0, letterSpacing: -1 }}>
                What we offer <span style={{ color: COLORS.accent }}>you.</span>
              </h2>
            </div>
            <button style={{
              background: "transparent", color: COLORS.dark, border: `2px solid ${COLORS.dark}`,
              borderRadius: 50, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "all 0.25s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.dark; e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.dark; }}>
              View All Services
            </button>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                borderRadius: 24, border: `1.5px solid ${COLORS.border}`,
                padding: 36, background: COLORS.white, transition: "all 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = s.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = COLORS.border;
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: s.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                    {s.icon}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, background: COLORS.lightGray, borderRadius: 50, padding: "4px 12px" }}>
                    {s.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: s.color || COLORS.dark, fontWeight: 700, fontSize: 14 }}>
                  Learn more
                  <span style={{ fontSize: 18, transition: "transform 0.2s" }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Symun transformed our digital presence completely. From strategy through to execution, the team delivered well beyond what we expected — on time, every time.",
    name: "Sarah Chen",
    role: "CEO, NexaTech",
    color: "#6366f1",
  },
  {
    quote: "The team's collaborative spirit sets them apart. They genuinely care about the outcome, not just the deliverable. We've seen a 3× improvement in our conversion rates since working together.",
    name: "Marcus Webb",
    role: "CMO, Vantage Group",
    color: COLORS.pink,
  },
  {
    quote: "Professional, creative, and relentlessly focused on results. I've worked with a lot of agencies — Symun is the one I'd recommend without hesitation.",
    name: "Priya Nair",
    role: "Founder, Greenroot Labs",
    color: "#10b981",
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "100px 5%", background: COLORS.dark, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
              Client Stories
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: COLORS.white, margin: 0, letterSpacing: -1 }}>
              What our customers<br />say <span style={{ color: COLORS.primary }}>About Us</span>
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: active === i ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                border: `1.5px solid ${active === i ? t.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: 24, padding: 36, transition: "all 0.4s", cursor: "pointer",
              }}
                onClick={() => setActive(i)}>
                <div style={{ fontSize: 36, color: t.color, marginBottom: 20, opacity: 0.8 }}>"</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Avatar initials={t.name.split(" ").map(n => n[0]).join("")} color={t.color} size={46} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.white }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <section style={{ padding: "100px 5%", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #a8edea 100%)` }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💌</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: COLORS.dark, marginBottom: 16, letterSpacing: -1 }}>
            Subscribe to<br />our newsletter
          </h2>
          <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.7, marginBottom: 40 }}>
            Get weekly insights on design, strategy, and digital culture — straight to your inbox. No fluff, just signal.
          </p>
          {submitted ? (
            <div style={{ background: COLORS.dark, color: COLORS.white, borderRadius: 16, padding: "20px 32px", fontSize: 16, fontWeight: 600 }}>
              🎉 You're in! Check your inbox for a welcome note.
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, maxWidth: 460, margin: "0 auto", flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{
                  flex: 1, minWidth: 220, padding: "14px 20px", borderRadius: 50, border: "2px solid transparent",
                  fontSize: 15, outline: "none", background: COLORS.white, color: COLORS.dark,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <button onClick={handleSubmit} style={{
                background: COLORS.dark, color: COLORS.white, border: "none",
                borderRadius: 50, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "all 0.25s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = COLORS.dark; e.currentTarget.style.transform = "scale(1)"; }}>
                Subscribe →
              </button>
            </div>
          )}
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 16 }}>No spam. Unsubscribe anytime.</p>
        </FadeIn>
      </div>
    </section>
  );
}

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press"],
  Services: ["Strategy", "Design", "Development", "Analytics"],
  "Follow Us": ["Twitter", "LinkedIn", "Instagram", "Dribbble"],
  "More Info": ["Privacy Policy", "Terms of Service", "Sitemap", "Contact"],
};

function Footer() {
  return (
    <footer style={{ background: COLORS.dark, padding: "80px 5% 40px", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(4,1fr)", gap: 40, marginBottom: 60, flexWrap: "wrap" }}
          className="footer-grid">
          <div>
            <div style={{ fontWeight: 800, fontSize: 24, color: COLORS.white, marginBottom: 16 }}>
              <span style={{ color: COLORS.accent }}>●</span> Symun
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 24, maxWidth: 240 }}>
              A digital agency crafting experiences that outlast the moment.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["tw", "li", "ig", "dr"].map(s => (
                <div key={s} style={{
                  width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", color: COLORS.white,
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.primary}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
                {group}
              </div>
              {links.map(link => (
                <a key={link} href="#" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = COLORS.primary}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 13 }}>© 2026 Symun. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Terms</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Cookies</a>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Navbar />
      <Hero />
      <TomorrowSection />
      <ProgressSection />
      <OffersSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
