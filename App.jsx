import { useState } from "react";

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
  const isSm = size === "sm";
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative border-none p-0 rounded-xl shrink-0 transition-colors duration-300 ${
        isSm ? "w-9 h-5" : "w-11 h-6"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      style={{ backgroundColor: disabled ? "#D9D9D9" : enabled ? "#2127C3" : "#C4C4C4" }}
    >
      <span
        className={`absolute rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isSm ? "w-3.5 h-3.5 top-[3px]" : "w-[18px] h-[18px] top-[3px]"
        }`}
        style={{
          left: 3,
          transform: enabled ? `translateX(${isSm ? 16 : 20}px)` : "translateX(0)",
        }}
      />
    </button>
  );
};

const Badge = ({ text, variant = "default" }) => {
  const styles = {
    default: "bg-stride-light-bg text-stride-muted border-stride-border",
    custom: "bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]",
    inherited: "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]",
    required: "bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]",
    on: "bg-[#E8EAF6] text-stride-blue border-[#C5CAE9]",
    off: "bg-stride-light-bg text-stride-muted border-stride-border",
  };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-0.5 border whitespace-nowrap font-body tracking-wide ${styles[variant] || styles.default}`}>
      {text}
    </span>
  );
};

const ConsentModal = ({ onAccept, onDecline, phone }) => (
  <div className="fixed inset-0 z-[100] bg-stride-navy/60 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white border border-stride-border p-6 sm:p-10 max-w-[440px] mx-4 shadow-2xl">
      <div className="w-12 h-12 bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center mb-6 text-xl">
        📱
      </div>
      <h3 className="text-xl font-bold text-stride-navy mb-2 font-heading">
        Enable Text Messages
      </h3>
      <p className="text-sm text-stride-muted leading-relaxed mb-4">
        By enabling SMS notifications, you consent to receive text messages at{" "}
        <strong className="text-stride-navy">{phone || "(your number)"}</strong>.
        Message frequency varies by your preferences.
      </p>
      <div className="bg-stride-light-bg border border-stride-border p-4 mb-7">
        <p className="text-xs text-stride-muted leading-relaxed m-0">
          Msg & data rates may apply. Reply <strong className="text-stride-text">STOP</strong> to
          cancel at any time. Reply <strong className="text-stride-text">HELP</strong> for assistance.
          View our <span className="text-stride-blue underline cursor-pointer">Privacy Policy</span> and{" "}
          <span className="text-stride-blue underline cursor-pointer">Terms of Use</span>.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onDecline}
          className="flex-1 py-3.5 px-5 bg-white text-stride-text border border-stride-text text-[13px] font-semibold tracking-wider uppercase cursor-pointer font-body transition-colors hover:bg-stride-light-bg"
        >
          Not Now
        </button>
        <button
          onClick={onAccept}
          className="flex-1 py-3.5 px-5 bg-stride-blue text-white border border-stride-blue text-[13px] font-semibold tracking-wider uppercase cursor-pointer font-body transition-colors hover:bg-stride-blue-hover"
        >
          I Agree
        </button>
      </div>
    </div>
  </div>
);

const Toast = ({ message, show }) => (
  <div
    className={`fixed top-6 right-6 z-[200] bg-stride-navy text-white py-3.5 px-6 flex items-center gap-3 shadow-xl transition-all duration-400 text-sm font-body ${
      show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
  >
    <span className="w-[22px] h-[22px] rounded-full bg-white/20 flex items-center justify-center text-[11px] text-stride-light-blue">
      ✓
    </span>
    {message}
  </div>
);

export default function StrideCommunicationPreferences() {
  const [email, setEmail] = useState("s•••••l@gmail.com");
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

  const customCount = STRIDE_BRANDS.filter(p => hasAnyCustom(p.id)).length;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      <div className="min-h-screen bg-white font-body text-stride-text">
        <Toast {...toast} />
        {showConsent && (
          <ConsentModal
            phone={phone}
            onAccept={() => { setSmsConsented(true); setGlobalSms(true); setShowConsent(false); showToast("SMS notifications enabled"); }}
            onDecline={() => setShowConsent(false)}
          />
        )}

        {/* Sticky Header Bar */}
        <div className="bg-stride-navy py-4 border-b-[3px] border-stride-blue">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 flex items-center gap-3">
            <img src="https://stridelearning.com/wp-content/uploads/2024/07/stride-logo.svg" className="img-fluid" alt="Stride: A Learning Company" title="Stride : A Learning Company" width="240" height="24" />
            <span className="text-white/30 text-sm">|</span>
            <span className="text-[11px] text-white tracking-widest uppercase font-medium hidden sm:inline">
              Communication Preferences
            </span>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-[720px] mx-auto px-4 md:px-0">

          {/* Header */}
          <div className="pt-12 sm:pt-10 pb-10">
            <h1 className="font-heading text-2xl sm:text-[32px] font-bold text-stride-navy tracking-tight mb-3 leading-tight">
              Communication Settings
            </h1>
            <p className="text-[15px] text-stride-muted leading-relaxed">
              Control how we reach you across all Stride products. Set global defaults or fine-tune notifications for each brand individually.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-stride-muted mb-5 font-body border-b-2 border-stride-light-blue pb-2.5 inline-block">
              Contact Information
            </h2>

            <div className="border border-stride-border bg-white">
              {/* Email Row */}
              <div className="p-4 sm:p-6 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-11 h-11 bg-[#E8EAF6] border border-[#C5CAE9] flex items-center justify-center text-base shrink-0">
                    @
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stride-navy mb-1">Email Address</p>
                    {editingEmail ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        <input
                          type="email" value={tempEmail} onChange={e => setTempEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="bg-white border border-stride-border py-2.5 px-3.5 text-sm text-stride-text font-body outline-none w-full sm:w-60 transition-colors"
                          autoFocus
                        />
                        <button onClick={() => { if (tempEmail) { setEmail(tempEmail); setEditingEmail(false); showToast("Email updated"); }}}
                          className="text-xs text-stride-blue font-semibold cursor-pointer bg-transparent border-none font-body tracking-wider uppercase">
                          Save
                        </button>
                        <button onClick={() => setEditingEmail(false)}
                          className="text-xs text-stride-muted cursor-pointer bg-transparent border-none font-body tracking-wider uppercase">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-stride-muted truncate">{email}</p>
                    )}
                  </div>
                </div>
                {!editingEmail && (
                  <button onClick={() => { setTempEmail(""); setEditingEmail(true); }}
                    className="text-xs font-semibold text-stride-blue cursor-pointer bg-transparent border border-stride-blue py-2 px-4.5 tracking-wider uppercase font-body transition-colors hover:bg-stride-blue hover:text-white self-start sm:self-auto shrink-0"
                  >
                    Update
                  </button>
                )}
              </div>

              <div className="border-t border-stride-border" />

              {/* Phone Row */}
              <div className="p-4 sm:p-6 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div
                    className={`w-11 h-11 flex items-center justify-center text-base shrink-0 ${
                      phone
                        ? "bg-[#E8F5E9] border border-[#A5D6A7]"
                        : "bg-stride-light-bg border border-dashed border-[#C4C4C4]"
                    }`}
                  >
                    📱
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stride-navy mb-1">Phone Number</p>
                    {editingPhone ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        <input
                          type="tel" value={tempPhone} onChange={e => setTempPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="bg-white border border-stride-border py-2.5 px-3.5 text-sm text-stride-text font-body outline-none w-full sm:w-60 transition-colors"
                          autoFocus
                        />
                        <button onClick={() => { if (tempPhone) { setPhone(tempPhone); setEditingPhone(false); showToast("Phone number added"); }}}
                          className="text-xs text-stride-blue font-semibold cursor-pointer bg-transparent border-none font-body tracking-wider uppercase">
                          Save
                        </button>
                        <button onClick={() => setEditingPhone(false)}
                          className="text-xs text-stride-muted cursor-pointer bg-transparent border-none font-body tracking-wider uppercase">
                          Cancel
                        </button>
                      </div>
                    ) : phone ? (
                      <p className="text-sm text-stride-muted truncate">{phone}</p>
                    ) : (
                      <p className="text-sm text-stride-muted italic">Required for SMS notifications</p>
                    )}
                  </div>
                </div>
                {!editingPhone && (
                  <button onClick={() => { setTempPhone(phone); setEditingPhone(true); }}
                    className={`text-xs font-semibold cursor-pointer bg-transparent py-2 px-4.5 tracking-wider uppercase font-body transition-colors self-start sm:self-auto shrink-0 ${
                      phone
                        ? "text-stride-blue border border-stride-blue hover:bg-stride-blue hover:text-white"
                        : "text-stride-orange border border-stride-orange hover:bg-stride-orange hover:text-white"
                    }`}
                  >
                    {phone ? "Update" : "+ Add"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Global Preferences */}
          <div className="mb-12">
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-stride-muted mb-5 font-body border-b-2 border-stride-light-blue pb-2.5 inline-block">
              Global Preferences
            </h2>

            <div className="border border-stride-border bg-white">
              {/* Email */}
              <div className="p-4 sm:p-6 sm:px-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  <div className="w-11 h-11 bg-[#E8EAF6] border border-[#C5CAE9] flex items-center justify-center text-lg shrink-0">
                    ✉️
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <p className="text-sm font-semibold text-stride-navy">Email Notifications</p>
                      <Badge text={globalEmail ? "On" : "Off"} variant={globalEmail ? "on" : "off"} />
                    </div>
                    <p className="text-[13px] text-stride-muted hidden sm:block">Product updates, newsletters, and announcements</p>
                    <p className="text-[13px] text-stride-muted sm:hidden">Updates & newsletters</p>
                  </div>
                </div>
                <Toggle enabled={globalEmail} onChange={v => { setGlobalEmail(v); showToast(v ? "Email enabled" : "Email disabled"); }} />
              </div>

              <div className="border-t border-stride-border" />

              {/* SMS */}
              <div className="p-4 sm:p-6 sm:px-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  <div
                    className={`w-11 h-11 flex items-center justify-center text-lg shrink-0 ${
                      phone ? "bg-[#E8F5E9] border border-[#A5D6A7]" : "bg-stride-light-bg border border-stride-border"
                    }`}
                  >
                    {phone ? "💬" : "🔒"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <p className={`text-sm font-semibold ${phone ? "text-stride-navy" : "text-stride-muted"}`}>
                        Text Messages (SMS)
                      </p>
                      {!phone ? (
                        <Badge text="Phone required" variant="required" />
                      ) : (
                        <Badge text={globalSms ? "On" : "Off"} variant={globalSms ? "on" : "off"} />
                      )}
                    </div>
                    <p className="text-[13px] text-stride-muted">
                      {phone ? "Time-sensitive alerts and reminders" : "Add a phone number to enable SMS"}
                    </p>
                  </div>
                </div>
                <Toggle enabled={globalSms} onChange={handleGlobalSmsToggle} disabled={!phone} />
              </div>
            </div>

            <p className="text-xs text-stride-muted mt-4 leading-relaxed">
              Email preferences apply to marketing and product communications. Transactional emails (receipts, security alerts, password resets) cannot be disabled.
            </p>
          </div>

          {/* Per-Product Overrides */}
          <div className="mb-12">
            <button
              onClick={() => setProductExpanded(!productExpanded)}
              className="w-full cursor-pointer bg-transparent border-none py-3 flex items-center justify-between font-body"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold tracking-[0.12em] uppercase text-stride-muted border-b-2 border-stride-light-blue pb-2.5">
                  Product Preferences
                </h2>
                {customCount > 0 && <Badge text={`${customCount} customized`} variant="custom" />}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-stride-muted hidden sm:inline">{STRIDE_BRANDS.length} products</span>
                <span
                  className="text-sm text-stride-muted transition-transform duration-300 inline-block"
                  style={{ transform: productExpanded ? "rotate(180deg)" : "rotate(0)" }}
                >
                  ▾
                </span>
              </div>
            </button>

            <div
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: productExpanded ? 3000 : 0,
                opacity: productExpanded ? 1 : 0,
              }}
            >
              <p className="text-[13px] text-stride-muted mb-5 leading-relaxed">
                Override global settings for individual Stride products. Unmodified products follow your global preferences above.
              </p>

              <div className="flex flex-col gap-2">
                {STRIDE_BRANDS.map((product, idx) => {
                  const emailVal = getVal(product.id, "email");
                  const smsVal = getVal(product.id, "sms");
                  const emailC = isCustom(product.id, "email");
                  const smsC = isCustom(product.id, "sms");
                  const anyC = hasAnyCustom(product.id);

                  return (
                    <div
                      key={product.id}
                      className={`p-4 sm:p-5 sm:px-6 transition-all duration-300 ${
                        anyC
                          ? "border border-[#FFCC80] bg-[#FFFBF5]"
                          : "border border-stride-border bg-white"
                      }`}
                      style={{ animation: `fadeInUp 0.3s ease ${idx * 0.05}s both` }}
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
                        <div
                          className="w-9 h-9 flex items-center justify-center text-xs font-bold font-heading tracking-tight shrink-0"
                          style={{
                            color: product.color,
                            backgroundColor: product.color + "12",
                            border: `1px solid ${product.color}30`,
                          }}
                        >
                          {product.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-stride-navy">{product.name}</span>
                            {!product.interacted && <Badge text="Not used yet" />}
                            {anyC && <Badge text="Custom" variant="custom" />}
                          </div>
                          <span className="text-xs text-stride-muted">{product.desc}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 sm:gap-7 pl-0 sm:pl-[50px]">
                        <div className="flex items-center gap-2.5">
                          <Toggle size="sm" enabled={emailVal} onChange={v => handleProductOverride(product.id, "email", v)} />
                          <span className={`text-xs ${emailC ? "text-[#E65100] font-semibold" : "text-stride-muted"}`}>
                            Email {emailC ? "" : "(global)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Toggle size="sm" enabled={smsVal}
                            onChange={v => {
                              if (!phone) { showToast("Add a phone number first"); return; }
                              if (!smsConsented && v) { setShowConsent(true); return; }
                              handleProductOverride(product.id, "sms", v);
                            }}
                            disabled={!phone}
                          />
                          <span className={`text-xs ${!phone ? "text-[#D9D9D9]" : smsC ? "text-[#E65100] font-semibold" : "text-stride-muted"}`}>
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
                          }}
                            className="text-[11px] text-stride-muted cursor-pointer bg-transparent border-none font-body ml-auto underline tracking-wide"
                          >
                            Reset to global ↩
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>
          </div>

          {/* Save */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7 border-t border-stride-border mb-12 sm:mb-20">
            <p className="text-xs text-stride-muted">
              Changes take effect immediately for new communications.
            </p>
            <button
              onClick={() => { setSaveAnim(true); setTimeout(() => { setSaveAnim(false); showToast("Preferences saved successfully"); }, 1200); }}
              onMouseEnter={() => setHoverSave(true)}
              onMouseLeave={() => setHoverSave(false)}
              className="py-3.5 px-9 text-[13px] font-bold tracking-[0.08em] uppercase font-body cursor-pointer transition-all duration-300 w-full sm:w-auto shrink-0"
              style={{
                border: saveAnim ? "1px solid #2127C3" : "1px solid transparent",
                backgroundColor: saveAnim ? "#E8EAF6" : hoverSave ? "#1a1f9e" : "#2127C3",
                color: saveAnim ? "#2127C3" : "#fff",
              }}
            >
              {saveAnim ? "✓ SAVED" : "SAVE PREFERENCES"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stride-light-blue py-12 px-4 sm:px-6">
          <div className="max-w-[720px] mx-auto">
            <img className="mb-6" src="https://stridelearning.com/wp-content/themes/stridelearning-wp/assets/img/stride-logo.png" alt="Stride Logo" width="107.5" height="20" />

            <div className="flex flex-wrap gap-y-2 gap-x-6 mb-5">
              {["Privacy Policy", "Your Privacy Choices", "Do Not Sell/Share My Info", "Terms of Use", "Accessibility"].map(link => (
                <span key={link} className="text-[13px] text-stride-muted cursor-pointer transition-colors hover:text-stride-blue">
                  {link}
                </span>
              ))}
            </div>

            <div className="border-t border-[rgba(0,0,0,0.1)] pt-5">
              <p className="text-[11px] text-stride-muted leading-relaxed">
                &copy; 2026 Stride, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
