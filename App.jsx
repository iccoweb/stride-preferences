import { useState } from "react";

/*
  Stride Learning Brand Tokens (extracted from stridelearning.com):
  ─────────────────────────────────────────────────────────────────
  Primary Blue:     #2127C3 (rgb(33, 39, 195))
  Navy:             #000F42 (rgb(0, 15, 66))
  Light Blue:       #B3E4FF (rgb(179, 228, 255))
  Orange Accent:    #F06500 (used in logo "i" dot)
  Body Text:        #2D2D2D (rgb(45, 45, 45))
  Muted Text:       #595959 (rgb(89, 89, 89))
  Light BG:         #F3F3F3 (rgb(243, 243, 243))
  Footer BG:        light blue tint
  White:            #FFFFFF
  
  Fonts:
  - Headings: "Monument Extended Bold" (display)
  - Body/Nav: "ABCMonumentGrotesk" (Regular, Medium, Bold)
  
  Buttons: Outlined with 1px border, uppercase tracking, no border-radius (0px)
  Section padding: 80px vertical
  Nav: Uppercase, letter-spacing 0.32px, 16px
  Footer category headings: Uppercase, bold
*/

const STRIDE_BRANDS = [
  { id: "k12", name: "K12", desc: "Online public & private schools", color: "#2127C3", interacted: true },
  { id: "k12tutoring", name: "K12 Tutoring", desc: "Personalized K-12 tutoring", color: "#FF6B00", interacted: true },
  { id: "k12hub", name: "K12 Learning Hub", desc: "Self-paced learning platform", color: "#2127C3", interacted: false },
  { id: "galvanize", name: "Galvanize", desc: "Software engineering programs", color: "#00A86B", interacted: true },
  { id: "hackreactor", name: "Hack Reactor", desc: "Coding bootcamp", color: "#E63946", interacted: true },
  { id: "medcerts", name: "MedCerts", desc: "Healthcare certifications", color: "#2127C3", interacted: true },
  { id: "techelevator", name: "Tech Elevator", desc: "Coding bootcamp & career prep", color: "#00BCD4", interacted: false },
  { id: "tallo", name: "Tallo", desc: "Career discovery platform", color: "#1A1A1A", interacted: true },
  { id: "stride_careers", name: "Stride Career Prep", desc: "Career readiness programs", color: "#2127C3", interacted: false },
];

const Toggle = ({ enabled, onChange, disabled = false, size = "md" }) => {
  const dims = size === "sm"
    ? { w: 36, h: 20, dot: 14, move: 16 }
    : { w: 44, h: 24, dot: 18, move: 20 };
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      style={{
        width: dims.w, height: dims.h, borderRadius: 12,
        backgroundColor: disabled ? "#D9D9D9" : enabled ? "#2127C3" : "#C4C4C4",
        border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer",
        position: "relative", transition: "background-color 0.3s ease",
        opacity: disabled ? 0.5 : 1, flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute", top: (dims.h - dims.dot) / 2, left: 3,
        width: dims.dot, height: dims.dot, borderRadius: "50%",
        backgroundColor: "#fff", transition: "transform 0.3s ease",
        transform: enabled ? `translateX(${dims.move}px)` : "translateX(0)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
};

const Badge = ({ text, variant = "default" }) => {
  const styles = {
    default: { bg: "#F3F3F3", color: "#595959", border: "#E0E0E0" },
    custom: { bg: "#FFF3E0", color: "#E65100", border: "#FFCC80" },
    inherited: { bg: "#E8F5E9", color: "#2E7D32", border: "#A5D6A7" },
    required: { bg: "#E3F2FD", color: "#1565C0", border: "#90CAF9" },
    on: { bg: "#E8EAF6", color: "#2127C3", border: "#C5CAE9" },
    off: { bg: "#F3F3F3", color: "#9E9E9E", border: "#E0E0E0" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 10px", borderRadius: 2,
      backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontFamily: "'ABCMonumentGrotesk', 'DM Sans', sans-serif",
      letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
};

const ConsentModal = ({ onAccept, onDecline, phone }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 100,
    backgroundColor: "rgba(0, 15, 66, 0.6)", backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <div style={{
      backgroundColor: "#fff", border: "1px solid #E0E0E0",
      padding: 40, maxWidth: 440, margin: "0 16px",
      boxShadow: "0 24px 48px rgba(0,15,66,0.15)",
    }}>
      <div style={{
        width: 48, height: 48, backgroundColor: "#E3F2FD",
        border: "1px solid #90CAF9", display: "flex",
        alignItems: "center", justifyContent: "center",
        marginBottom: 24, fontSize: 20,
      }}>📱</div>
      <h3 style={{
        fontSize: 20, fontWeight: 700, color: "#000F42", marginBottom: 8,
        fontFamily: "'Monument Extended', 'DM Sans', sans-serif",
      }}>
        Enable Text Messages
      </h3>
      <p style={{ fontSize: 14, color: "#595959", lineHeight: 1.7, marginBottom: 16 }}>
        By enabling SMS notifications, you consent to receive text messages at{" "}
        <strong style={{ color: "#000F42" }}>{phone || "(your number)"}</strong>.
        Message frequency varies by your preferences.
      </p>
      <div style={{
        backgroundColor: "#F3F3F3", border: "1px solid #E0E0E0",
        padding: 16, marginBottom: 28,
      }}>
        <p style={{ fontSize: 12, color: "#595959", lineHeight: 1.7, margin: 0 }}>
          Msg & data rates may apply. Reply <strong style={{ color: "#2D2D2D" }}>STOP</strong> to
          cancel at any time. Reply <strong style={{ color: "#2D2D2D" }}>HELP</strong> for assistance.
          View our <span style={{ color: "#2127C3", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span> and{" "}
          <span style={{ color: "#2127C3", textDecoration: "underline", cursor: "pointer" }}>Terms of Use</span>.
        </p>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onDecline} style={{
          flex: 1, padding: "14px 20px", backgroundColor: "#fff", color: "#2D2D2D",
          border: "1px solid #2D2D2D", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
          fontFamily: "'ABCMonumentGrotesk', 'DM Sans', sans-serif",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.backgroundColor = "#F3F3F3"; }}
          onMouseLeave={e => { e.target.style.backgroundColor = "#fff"; }}
        >
          Not Now
        </button>
        <button onClick={onAccept} style={{
          flex: 1, padding: "14px 20px", backgroundColor: "#2127C3", color: "#fff",
          border: "1px solid #2127C3", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
          fontFamily: "'ABCMonumentGrotesk', 'DM Sans', sans-serif",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.backgroundColor = "#1a1f9e"; }}
          onMouseLeave={e => { e.target.style.backgroundColor = "#2127C3"; }}
        >
          I Agree
        </button>
      </div>
    </div>
  </div>
);

const Toast = ({ message, show }) => (
  <div style={{
    position: "fixed", top: 24, right: 24, zIndex: 200,
    backgroundColor: "#000F42", color: "#fff", padding: "14px 24px",
    display: "flex", alignItems: "center", gap: 12,
    boxShadow: "0 8px 24px rgba(0,15,66,0.3)",
    transition: "all 0.4s ease", fontSize: 14,
    fontFamily: "'ABCMonumentGrotesk', 'DM Sans', sans-serif",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(-16px)",
    pointerEvents: show ? "auto" : "none",
  }}>
    <span style={{
      width: 22, height: 22, borderRadius: "50%", backgroundColor: "rgba(179,228,255,0.2)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
      color: "#B3E4FF",
    }}>✓</span>
    {message}
  </div>
);

export default function StrideCommunicationPreferences() {
  const [email, setEmail] = useState("g•••••o@stride.com");
  const [phone, setPhone] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [globalEmail, setGlobalEmail] = useState(true);
  const [globalSms, setGlobalSms] = useState(false);
  const [smsConsented, setSmsConsented] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [productOverrides, setProductOverrides] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [saveAnim, setSaveAnim] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleGlobalSmsToggle = (val) => {
    if (val && !phone) { showToast("Please add a phone number first"); return; }
    if (val && !smsConsented) { setShowConsent(true); return; }
    setGlobalSms(val);
    showToast(val ? "SMS notifications enabled" : "SMS notifications disabled");
  };

  const handleProductOverride = (pid, ch, val) => {
    const key = `${pid}_${ch}`;
    const gVal = ch === "email" ? globalEmail : globalSms;
    setProductOverrides(p => ({ ...p, [key]: val === gVal ? null : val }));
  };

  const getVal = (pid, ch) => {
    const key = `${pid}_${ch}`;
    if (productOverrides[key] != null) return productOverrides[key];
    return ch === "email" ? globalEmail : globalSms;
  };

  const isCustom = (pid, ch) => productOverrides[`${pid}_${ch}`] != null;
  const hasAnyCustom = (pid) => isCustom(pid, "email") || isCustom(pid, "sms");

  const visibleProducts = showAllProducts ? STRIDE_BRANDS : STRIDE_BRANDS.filter(p => p.interacted);
  const interactedCount = STRIDE_BRANDS.filter(p => p.interacted).length;
  const customCount = STRIDE_BRANDS.filter(p => hasAnyCustom(p.id)).length;

  // Shared style constants (Stride brand)
  const S = {
    blue: "#2127C3",
    navy: "#000F42",
    lightBlue: "#B3E4FF",
    orange: "#F06500",
    text: "#2D2D2D",
    muted: "#595959",
    lightBg: "#F3F3F3",
    footerBg: "#E8F4FB",
    border: "#E0E0E0",
    white: "#FFFFFF",
    heading: "'Monument Extended', 'DM Sans', sans-serif",
    body: "'ABCMonumentGrotesk', 'DM Sans', sans-serif",
    sectionPad: 80,
  };

  const inputStyle = {
    backgroundColor: S.white, border: `1px solid ${S.border}`,
    padding: "10px 14px", fontSize: 14, color: S.text,
    fontFamily: S.body, outline: "none", width: 240,
    transition: "border-color 0.2s",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", backgroundColor: S.white, fontFamily: S.body, color: S.text }}>
        <Toast {...toast} />
        {showConsent && (
          <ConsentModal
            phone={phone}
            onAccept={() => { setSmsConsented(true); setGlobalSms(true); setShowConsent(false); showToast("SMS notifications enabled"); }}
            onDecline={() => setShowConsent(false)}
          />
        )}

        {/* ── Sticky Header Bar ── */}
        <div style={{
          backgroundColor: S.navy, padding: "16px 0",
          borderBottom: `3px solid ${S.blue}`,
        }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: S.heading, fontSize: 22, fontWeight: 700,
              color: S.white, letterSpacing: "-0.02em",
            }}>
              Str<span style={{ color: S.orange }}>i</span>de
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>|</span>
            <span style={{
              fontSize: 11, color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Communication Preferences
            </span>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>

          {/* Header */}
          <div style={{ padding: `${S.sectionPad}px 0 40px` }}>
            <h1 style={{
              fontFamily: S.heading, fontSize: 32, fontWeight: 700,
              color: S.navy, letterSpacing: "-0.01em", marginBottom: 12, lineHeight: 1.2,
            }}>
              Communication Settings
            </h1>
            <p style={{ fontSize: 15, color: S.muted, lineHeight: 1.7, maxWidth: 520 }}>
              Control how we reach you across all Stride products. Set global defaults or fine-tune notifications for each brand individually.
            </p>
          </div>

          {/* ══════════ Contact Information ══════════ */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: S.muted,
              marginBottom: 20, fontFamily: S.body,
              borderBottom: `2px solid ${S.lightBlue}`,
              paddingBottom: 10, display: "inline-block",
            }}>
              Contact Information
            </h2>

            <div style={{ border: `1px solid ${S.border}`, backgroundColor: S.white }}>
              {/* Email Row */}
              <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44, backgroundColor: "#E8EAF6",
                    border: `1px solid #C5CAE9`, display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>@</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: S.navy, marginBottom: 4 }}>Email Address</p>
                    {editingEmail ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                          type="email" value={tempEmail} onChange={e => setTempEmail(e.target.value)}
                          placeholder="your@email.com" style={inputStyle} autoFocus
                        />
                        <button onClick={() => { if (tempEmail) { setEmail(tempEmail); setEditingEmail(false); showToast("Email updated"); }}}
                          style={{ fontSize: 12, color: S.blue, fontWeight: 600, cursor: "pointer", background: "none", border: "none", fontFamily: S.body, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Save
                        </button>
                        <button onClick={() => setEditingEmail(false)}
                          style={{ fontSize: 12, color: S.muted, cursor: "pointer", background: "none", border: "none", fontFamily: S.body, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p style={{ fontSize: 14, color: S.muted }}>{email}</p>
                    )}
                  </div>
                </div>
                {!editingEmail && (
                  <button onClick={() => { setTempEmail(""); setEditingEmail(true); }}
                    style={{
                      fontSize: 12, fontWeight: 600, color: S.blue, cursor: "pointer",
                      background: "none", border: `1px solid ${S.blue}`,
                      padding: "8px 18px", letterSpacing: "0.05em", textTransform: "uppercase",
                      fontFamily: S.body, transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.target.style.backgroundColor = S.blue; e.target.style.color = "#fff"; }}
                    onMouseLeave={e => { e.target.style.backgroundColor = "transparent"; e.target.style.color = S.blue; }}
                  >
                    Update
                  </button>
                )}
              </div>

              <div style={{ borderTop: `1px solid ${S.border}` }} />

              {/* Phone Row */}
              <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44,
                    backgroundColor: phone ? "#E8F5E9" : S.lightBg,
                    border: `1px ${phone ? "solid" : "dashed"} ${phone ? "#A5D6A7" : "#C4C4C4"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>📱</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: S.navy, marginBottom: 4 }}>Phone Number</p>
                    {editingPhone ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                          type="tel" value={tempPhone} onChange={e => setTempPhone(e.target.value)}
                          placeholder="(555) 000-0000" style={inputStyle} autoFocus
                        />
                        <button onClick={() => { if (tempPhone) { setPhone(tempPhone); setEditingPhone(false); showToast("Phone number added"); }}}
                          style={{ fontSize: 12, color: S.blue, fontWeight: 600, cursor: "pointer", background: "none", border: "none", fontFamily: S.body, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Save
                        </button>
                        <button onClick={() => setEditingPhone(false)}
                          style={{ fontSize: 12, color: S.muted, cursor: "pointer", background: "none", border: "none", fontFamily: S.body, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Cancel
                        </button>
                      </div>
                    ) : phone ? (
                      <p style={{ fontSize: 14, color: S.muted }}>{phone}</p>
                    ) : (
                      <p style={{ fontSize: 14, color: "#BDBDBD", fontStyle: "italic" }}>Required for SMS notifications</p>
                    )}
                  </div>
                </div>
                {!editingPhone && (
                  <button onClick={() => { setTempPhone(phone); setEditingPhone(true); }}
                    style={{
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      background: "none", padding: "8px 18px",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      fontFamily: S.body, transition: "all 0.2s",
                      color: phone ? S.blue : S.orange,
                      border: `1px solid ${phone ? S.blue : S.orange}`,
                    }}
                    onMouseEnter={e => {
                      const c = phone ? S.blue : S.orange;
                      e.target.style.backgroundColor = c; e.target.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = phone ? S.blue : S.orange;
                    }}
                  >
                    {phone ? "Update" : "+ Add"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ══════════ Global Preferences ══════════ */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: S.muted,
              marginBottom: 20, fontFamily: S.body,
              borderBottom: `2px solid ${S.lightBlue}`,
              paddingBottom: 10, display: "inline-block",
            }}>
              Global Preferences
            </h2>

            <div style={{ border: `1px solid ${S.border}`, backgroundColor: S.white }}>
              {/* Email */}
              <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44, backgroundColor: "#E8EAF6",
                    border: "1px solid #C5CAE9", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>✉️</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: S.navy }}>Email Notifications</p>
                      <Badge text={globalEmail ? "On" : "Off"} variant={globalEmail ? "on" : "off"} />
                    </div>
                    <p style={{ fontSize: 13, color: S.muted }}>Product updates, newsletters, and announcements</p>
                  </div>
                </div>
                <Toggle enabled={globalEmail} onChange={v => { setGlobalEmail(v); showToast(v ? "Email enabled" : "Email disabled"); }} />
              </div>

              <div style={{ borderTop: `1px solid ${S.border}` }} />

              {/* SMS */}
              <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44,
                    backgroundColor: phone ? "#E8F5E9" : S.lightBg,
                    border: `1px solid ${phone ? "#A5D6A7" : S.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{phone ? "💬" : "🔒"}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: phone ? S.navy : "#BDBDBD" }}>
                        Text Messages (SMS)
                      </p>
                      {!phone ? (
                        <Badge text="Phone required" variant="required" />
                      ) : (
                        <Badge text={globalSms ? "On" : "Off"} variant={globalSms ? "on" : "off"} />
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: S.muted }}>
                      {phone ? "Time-sensitive alerts and reminders" : "Add a phone number above to enable SMS"}
                    </p>
                  </div>
                </div>
                <Toggle enabled={globalSms} onChange={handleGlobalSmsToggle} disabled={!phone} />
              </div>
            </div>

            <p style={{ fontSize: 12, color: "#9E9E9E", marginTop: 16, lineHeight: 1.6 }}>
              Email preferences apply to marketing and product communications. Transactional emails (receipts, security alerts, password resets) cannot be disabled.
            </p>
          </div>

          {/* ══════════ Per-Product Overrides ══════════ */}
          <div style={{ marginBottom: 48 }}>
            <button
              onClick={() => setProductExpanded(!productExpanded)}
              style={{
                width: "100%", cursor: "pointer", background: "none", border: "none",
                padding: "12px 0", display: "flex", alignItems: "center",
                justifyContent: "space-between", fontFamily: S.body,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2 style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: S.muted,
                  borderBottom: `2px solid ${S.lightBlue}`,
                  paddingBottom: 10,
                }}>
                  Brand Preferences
                </h2>
                {customCount > 0 && <Badge text={`${customCount} customized`} variant="custom" />}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#BDBDBD" }}>{interactedCount} brands</span>
                <span style={{
                  fontSize: 14, color: S.muted, transition: "transform 0.3s",
                  transform: productExpanded ? "rotate(180deg)" : "rotate(0)",
                  display: "inline-block",
                }}>▾</span>
              </div>
            </button>

            <div style={{
              maxHeight: productExpanded ? 3000 : 0,
              opacity: productExpanded ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.5s ease",
            }}>
              <p style={{ fontSize: 13, color: S.muted, marginBottom: 20, lineHeight: 1.6 }}>
                Override global settings for individual Stride brands. Unmodified brands follow your global preferences above.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {visibleProducts.map((product, idx) => {
                  const emailVal = getVal(product.id, "email");
                  const smsVal = getVal(product.id, "sms");
                  const emailC = isCustom(product.id, "email");
                  const smsC = isCustom(product.id, "sms");
                  const anyC = hasAnyCustom(product.id);

                  return (
                    <div key={product.id} style={{
                      border: `1px solid ${anyC ? "#FFCC80" : S.border}`,
                      backgroundColor: anyC ? "#FFFBF5" : S.white,
                      padding: "20px 24px",
                      transition: "all 0.3s ease",
                      animation: `fadeInUp 0.3s ease ${idx * 0.05}s both`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                        <div style={{
                          width: 36, height: 36, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700, color: product.color,
                          backgroundColor: product.color + "12",
                          border: `1px solid ${product.color}30`,
                          fontFamily: S.heading, letterSpacing: "-0.02em",
                        }}>
                          {product.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: S.navy }}>{product.name}</span>
                            {!product.interacted && <Badge text="Not used yet" />}
                            {anyC && <Badge text="Custom" variant="custom" />}
                          </div>
                          <span style={{ fontSize: 12, color: "#9E9E9E" }}>{product.desc}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 28, paddingLeft: 50 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Toggle size="sm" enabled={emailVal} onChange={v => handleProductOverride(product.id, "email", v)} />
                          <span style={{ fontSize: 12, color: emailC ? "#E65100" : S.muted, fontWeight: emailC ? 600 : 400 }}>
                            Email {emailC ? "" : "(global)"}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Toggle size="sm" enabled={smsVal}
                            onChange={v => {
                              if (!phone) { showToast("Add a phone number first"); return; }
                              if (!smsConsented && v) { setShowConsent(true); return; }
                              handleProductOverride(product.id, "sms", v);
                            }}
                            disabled={!phone}
                          />
                          <span style={{ fontSize: 12, color: !phone ? "#D9D9D9" : smsC ? "#E65100" : S.muted, fontWeight: smsC ? 600 : 400 }}>
                            SMS {smsC ? "" : phone ? "(global)" : ""}
                          </span>
                        </div>
                        {anyC && (
                          <button onClick={() => {
                            setProductOverrides(p => {
                              const n = { ...p };
                              delete n[`${product.id}_email`];
                              delete n[`${product.id}_sms`];
                              return n;
                            });
                            showToast(`${product.name} reset to global`);
                          }} style={{
                            fontSize: 11, color: S.muted, cursor: "pointer",
                            background: "none", border: "none", fontFamily: S.body,
                            marginLeft: "auto", textDecoration: "underline",
                            letterSpacing: "0.03em",
                          }}>
                            Reset to global ↩
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!showAllProducts ? (
                <button onClick={() => setShowAllProducts(true)} style={{
                  width: "100%", marginTop: 12, padding: 16,
                  textAlign: "center", fontSize: 12, color: S.muted,
                  border: `1px dashed ${S.border}`, backgroundColor: S.white,
                  cursor: "pointer", fontFamily: S.body,
                  letterSpacing: "0.03em", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = S.blue; e.target.style.color = S.blue; }}
                  onMouseLeave={e => { e.target.style.borderColor = S.border; e.target.style.color = S.muted; }}
                >
                  Show all {STRIDE_BRANDS.length} brands ({STRIDE_BRANDS.length - interactedCount} you haven't used yet)
                </button>
              ) : (
                <button onClick={() => setShowAllProducts(false)} style={{
                  width: "100%", marginTop: 8, padding: 10,
                  textAlign: "center", fontSize: 12, color: S.muted,
                  border: "none", backgroundColor: "transparent",
                  cursor: "pointer", fontFamily: S.body,
                }}>
                  Show only brands I've used
                </button>
              )}
            </div>
          </div>

          {/* ══════════ Save ══════════ */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: 28, borderTop: `1px solid ${S.border}`, marginBottom: S.sectionPad,
          }}>
            <p style={{ fontSize: 12, color: "#BDBDBD" }}>
              Changes take effect immediately for new communications.
            </p>
            <button
              onClick={() => { setSaveAnim(true); setTimeout(() => { setSaveAnim(false); showToast("Preferences saved successfully"); }, 1200); }}
              onMouseEnter={() => setHoverSave(true)}
              onMouseLeave={() => setHoverSave(false)}
              style={{
                padding: "14px 36px", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: S.body, cursor: "pointer",
                border: saveAnim ? `1px solid ${S.blue}` : "1px solid transparent",
                backgroundColor: saveAnim ? "#E8EAF6" : hoverSave ? "#1a1f9e" : S.blue,
                color: saveAnim ? S.blue : S.white,
                transition: "all 0.3s ease",
              }}
            >
              {saveAnim ? "✓ SAVED" : "SAVE PREFERENCES"}
            </button>
          </div>
        </div>

        {/* ══════════ Footer ══════════ */}
        <div style={{ backgroundColor: S.footerBg, padding: "48px 24px 40px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <span style={{
              fontFamily: S.heading, fontSize: 20, fontWeight: 700,
              color: S.navy, display: "block", marginBottom: 24,
            }}>
              Str<span style={{ color: S.orange }}>i</span>de
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginBottom: 20 }}>
              {["Privacy Policy", "Your Privacy Choices", "Do Not Sell/Share My Info", "Terms of Use", "Accessibility", "Unsubscribe from All"].map(link => (
                <span key={link} style={{
                  fontSize: 13, color: S.muted, cursor: "pointer",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = S.blue}
                  onMouseLeave={e => e.target.style.color = S.muted}
                >{link}</span>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 20 }}>
              <p style={{ fontSize: 12, color: "#9E9E9E", lineHeight: 1.7, marginBottom: 8 }}>
                To stop all text messages, reply <strong style={{ color: S.text }}>STOP</strong> to any message.
                For questions about your communication preferences, contact{" "}
                <span style={{ color: S.blue }}>support@stridelearning.com</span>.
              </p>
              <p style={{ fontSize: 11, color: "#BDBDBD", lineHeight: 1.6 }}>
                Copyright © 2026 Stride, Inc. All rights reserved. The Stride wordmark, logo, and other marks referenced herein are trademarks of Stride, Inc. and its subsidiaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
