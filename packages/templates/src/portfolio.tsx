import React, { type CSSProperties } from "react";
import {
  Kino,
  Scene,
  Reveal,
  Parallax,
  TextReveal,
  HorizontalScroll,
  Panel,
  Progress,
  StickyHeader,
  ScrollTransform,
  Marquee,
} from "react-kino";

interface PortfolioProps {
  /** Your name */
  name: string;
  /** Your role / title */
  role: string;
  /** Short bio text */
  bio: string;
  /** Accent color for highlights */
  accentColor?: string;
  /** Portfolio projects */
  projects?: Array<{
    title: string;
    description: string;
    year: string | number;
    tags?: string[];
  }>;
  /** List of skills */
  skills?: string[];
  /** Contact email address */
  contactEmail?: string;
  /** Optional navigation items for sticky header */
  navItems?: Array<{ label: string; href?: string }>;
  /** Show scroll-down hint on hero. Default: true */
  showScrollHint?: boolean;
  /** Custom items for the skills marquee ticker */
  marqueeItems?: string[];
}

export function Portfolio({
  name,
  role,
  bio,
  accentColor = "#3b82f6",
  projects = [],
  skills = [],
  contactEmail,
  navItems,
  showScrollHint = true,
  marqueeItems,
}: PortfolioProps) {
  const baseStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#ffffff",
    background: "#050505",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const sectionCenter: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "0 24px",
    textAlign: "center",
  };

  const tickerItems = marqueeItems ?? skills;

  return (
    <div style={baseStyle}>
      <Kino>
        <Progress color={accentColor} position="top" />

        {/* Sticky Header */}
        <StickyHeader
          threshold={40}
          background="rgba(0, 0, 0, 0.72)"
          blur
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            <span
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}
            >
              {name}
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "24px" }}
            >
              {navItems && navItems.length > 0 && (
                <nav style={{ display: "flex", gap: "20px" }}>
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href ?? "#"}
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                  }}
                >
                  {contactEmail}
                </a>
              )}
            </div>
          </div>
        </StickyHeader>

        {/* Hero with ScrollTransform */}
        <Scene duration="150vh">
          {(progress) => (
            <div
              style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <Parallax speed={0.3}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-10%",
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </Parallax>
              <div
                style={{
                  ...sectionCenter,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <ScrollTransform
                  from={{ scale: 1, y: 0, opacity: 1 }}
                  to={{ scale: 0.85, y: -50, opacity: 0 }}
                  span={0.7}
                  easing="ease-out"
                >
                  <h1
                    style={{
                      fontSize: "clamp(3.5rem, 12vw, 10rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.05em",
                      lineHeight: 0.95,
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </h1>
                  <p
                    style={{
                      fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                      color: accentColor,
                      marginTop: "20px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      textAlign: "center",
                    }}
                  >
                    {role}
                  </p>
                </ScrollTransform>
                {showScrollHint && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      opacity: Math.max(0, 1 - progress * 5),
                      fontSize: "1.5rem",
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    &#8595;
                  </div>
                )}
              </div>
            </div>
          )}
        </Scene>

        {/* Bio - TextReveal */}
        <Scene duration="200vh">
          <div style={sectionCenter}>
            <div style={{ maxWidth: "750px" }}>
              <TextReveal
                mode="word"
                at={0.05}
                span={0.85}
                color="#ffffff"
                dimColor="rgba(255, 255, 255, 0.1)"
              >
                {bio}
              </TextReveal>
            </div>
          </div>
        </Scene>

        {/* Projects with ScrollTransform cards */}
        {projects.length > 0 && (
          <Scene duration={`${Math.max(projects.length * 80, 200)}vh`}>
            <div style={sectionCenter}>
              <div
                style={{
                  maxWidth: "900px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  padding: "0 24px",
                }}
              >
                <Reveal at={0.05} animation="fade">
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255, 255, 255, 0.35)",
                      textAlign: "left",
                      margin: 0,
                    }}
                  >
                    Selected Work
                  </p>
                </Reveal>
                {projects.map((project, i) => {
                  const step =
                    projects.length > 1 ? 0.7 / (projects.length - 1) : 0;
                  return (
                    <ScrollTransform
                      key={project.title}
                      from={{ y: 40, opacity: 0 }}
                      to={{ y: 0, opacity: 1 }}
                      at={0.15 + i * step}
                      span={0.15}
                      easing="ease-out"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "32px 0",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                          textAlign: "left",
                          gap: "24px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <h3
                            style={{
                              fontSize: "clamp(1.25rem, 3vw, 2rem)",
                              fontWeight: 700,
                              margin: "0 0 8px",
                            }}
                          >
                            {project.title}
                          </h3>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.5)",
                              margin: 0,
                              lineHeight: 1.6,
                              fontSize: "0.95rem",
                            }}
                          >
                            {project.description}
                          </p>
                          {project.tags && project.tags.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                marginTop: "12px",
                              }}
                            >
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: "0.75rem",
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    background: `${accentColor}15`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}30`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.3)",
                            flexShrink: 0,
                          }}
                        >
                          {project.year}
                        </span>
                      </div>
                    </ScrollTransform>
                  );
                })}
              </div>
            </div>
          </Scene>
        )}

        {/* Skills Marquee Ticker */}
        {tickerItems.length > 0 && (
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.08)",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
              padding: "20px 0",
            }}
          >
            <Marquee speed={30}>
              {tickerItems.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        )}

        {/* Skills - Horizontal Scroll */}
        {skills.length > 0 && (
          <HorizontalScroll>
            {chunkArray(skills, Math.ceil(skills.length / 3)).map(
              (group, panelIndex) => (
                <Panel key={panelIndex}>
                  <div
                    style={{
                      ...sectionCenter,
                      gap: "24px",
                    }}
                  >
                    {panelIndex === 0 && (
                      <p
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color: "rgba(255, 255, 255, 0.35)",
                          margin: "0 0 16px",
                        }}
                      >
                        Skills & Tools
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        justifyContent: "center",
                        maxWidth: "600px",
                      }}
                    >
                      {group.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "1rem",
                            padding: "10px 24px",
                            borderRadius: "999px",
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            color: "rgba(255, 255, 255, 0.8)",
                            transition: "border-color 200ms ease",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Panel>
              )
            )}
          </HorizontalScroll>
        )}

        {/* Contact */}
        <div style={sectionCenter}>
          <p
            style={{
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              color: "rgba(255, 255, 255, 0.4)",
              margin: "0 0 24px",
              fontWeight: 500,
            }}
          >
            Let&apos;s work together
          </p>
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#ffffff",
                textDecoration: "none",
                transition: "color 150ms ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              {contactEmail}
            </a>
          )}
        </div>
      </Kino>
    </div>
  );
}

/** Split an array into chunks of the given size */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
