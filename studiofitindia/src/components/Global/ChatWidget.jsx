import { useState, useRef, useEffect } from "react";

// ── Robot AI Icon SVG ─────────────────────────────────────────────────
const RobotIcon = ({ size = 24, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Antenna */}
    <line x1="12" y1="1" x2="12" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="1" r="1" fill={color} />
    {/* Head */}
    <rect x="4" y="5" width="16" height="12" rx="3" stroke={color} strokeWidth="1.5" />
    {/* Eyes */}
    <circle cx="9" cy="11" r="2" fill={color} />
    <circle cx="15" cy="11" r="2" fill={color} />
    {/* Mouth */}
    <rect x="8" y="14" width="8" height="1.5" rx="0.75" fill={color} />
    {/* Ears */}
    <rect x="1" y="9" width="2" height="4" rx="1" fill={color} />
    <rect x="21" y="9" width="2" height="4" rx="1" fill={color} />
    {/* Body hint */}
    <path d="M8 17v2.5a1.5 1.5 0 001.5 1.5h5a1.5 1.5 0 001.5-1.5V17" stroke={color} strokeWidth="1.5" />
  </svg>
);

// ── Chatbot endpoint (WordPress theme) ────────────────────────────────
const CHATBOT_URL = (() => {
  if (window.siteSettings?.themeUrl) {
    return `${window.siteSettings.themeUrl}/chatbot.php`;
  }
  return "/chatbot.php";
})();

// ── Typing indicator dots ─────────────────────────────────────────────
const TypingDots = () => (
  <div
    style={{
      display: "flex",
      gap: "4px",
      alignItems: "center",
      padding: "4px 0",
    }}
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#e8521a",
          display: "inline-block",
          animation: `sfi-bounce 1s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

// ── Message bubble ────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e8521a, #ff8c00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: 8,
            alignSelf: "flex-end",
            boxShadow: "0 2px 8px rgba(232,82,26,0.3)",
          }}
        >
          <RobotIcon size={18} color="#fff" />
        </div>
      )}
      <div
        style={{
          maxWidth: "75%",
          padding: "9px 13px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? "#e8521a" : "#1a1a2e",
          color: "#fff",
          fontSize: 13,
          lineHeight: 1.5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.content}
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi! I'm Studio FIT India's assistant. Ask me anything about our classes, pricing, coaches, or how to join!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHATBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            data.reply ||
            "Sorry, something went wrong. Please WhatsApp us at +91 93106 66287.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Network error. Please WhatsApp us at +91 93106 66287 for help!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes sfi-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes sfi-pop-in {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes sfi-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(232,82,26,0.6); }
          70%  { box-shadow: 0 0 0 12px rgba(232,82,26,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,82,26,0); }
        }
        @keyframes sfi-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(232,82,26,0.6)); }
          50%      { filter: drop-shadow(0 0 8px rgba(255,174,1,0.9)); }
        }
      `}</style>

      {/* ── Chat window ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            zIndex: 9999,
            width: 320,
            height: 440,
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            animation: "sfi-pop-in 0.25s ease-out",
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #111122 0%, #1a0a00 100%)",
              borderBottom: "1px solid rgba(232,82,26,0.35)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e8521a, #ff8c00)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 10px rgba(232,82,26,0.4)",
              }}
            >
              <RobotIcon size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1.2,
                }}
              >
                Studio FIT India
              </div>
              <div style={{ color: "#e8521a", fontSize: 11 }}>
                AI Assistant • Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 12px",
              background: "#0d0d1a",
              scrollbarWidth: "thin",
              scrollbarColor: "#333 transparent",
            }}
          >
            {messages.map((msg, i) => (
              <Bubble key={i} msg={msg} />
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e8521a, #ff8c00)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(232,82,26,0.3)",
                  }}
                >
                  <RobotIcon size={18} color="#fff" />
                </div>
                <div
                  style={{
                    background: "#1a1a2e",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "9px 14px",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              background: "#111122",
              borderTop: "1px solid rgba(232,82,26,0.2)",
              padding: "10px 12px",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about classes, pricing…"
              rows={1}
              style={{
                flex: 1,
                background: "#1a1a2e",
                border: "1px solid rgba(232,82,26,0.3)",
                borderRadius: 12,
                padding: "9px 12px",
                color: "#fff",
                fontSize: 13,
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: 1.4,
                maxHeight: 80,
                overflowY: "auto",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background:
                  loading || !input.trim()
                    ? "rgba(232,82,26,0.3)"
                    : "linear-gradient(135deg,#e8521a,#ff8c00)",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                width: 38,
                height: 38,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                transition: "background 0.2s",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* ── Floating bubble button ── */}
      <div
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9998 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tooltip — shown on hover via React state */}
        {hovered && !open && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              right: 0,
              background: "#111",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
          >
            Chat with Our Assistant
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={
            open
              ? "Close chat assistant"
              : "Open Studio FIT India chat assistant"
          }
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#e8521a,#ff8c00)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            boxShadow: "0 4px 20px rgba(232,82,26,0.5)",
            animation: open ? "none" : "sfi-pulse-ring 2s infinite",
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {open ? (
            <span style={{ fontSize: 22, color: "#fff", lineHeight: 1 }}>✕</span>
          ) : (
            <span style={{ animation: "sfi-glow 2s ease-in-out infinite" }}>
              <RobotIcon size={28} color="#fff" />
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default ChatWidget;
