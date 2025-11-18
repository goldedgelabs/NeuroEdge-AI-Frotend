import React, { useState } from "react";
import PremiumModal from "../premium/PremiumModal";

export default function MenuButtons({ onMenuSelect }) {
  const allItems = [
    { label: "Generate Ideas", emoji: "💡", id: "ideas", premium: false },
    { label: "Summarize & Simplify", emoji: "📝", id: "summarize", premium: false },
    { label: "Create Something New", emoji: "✨", id: "create", premium: true },
    { label: "Write & Refine", emoji: "✍️", id: "write", premium: false },
    { label: "Get Smart Advice", emoji: "🧠", id: "advice", premium: true },
    { label: "Plan & Organize", emoji: "📅", id: "plan", premium: true },
    { label: "Build with Code", emoji: "💻", id: "code", premium: true },
    { label: "Analyze & Predict", emoji: "🔍", id: "analyze", premium: true },
    { label: "Understand Images", emoji: "🖼️", id: "images", premium: true },
    { label: "Translate & Explore", emoji: "🌐", id: "translate", premium: false },
  ];

  const [showAll, setShowAll] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [premiumOpen, setPremiumOpen] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState(null);

  const visibleItems = showAll ? allItems : allItems.slice(0, 4);

  const totalItems = showAll
    ? [...visibleItems, { label: "Less ▴", id: "less", isToggle: true }]
    : [...visibleItems, { label: "More ▾", id: "more", isToggle: true }];

  const handleClick = (item) => {
    setActiveId(item.id);

    // Free feature → call handler
    if (!item.premium) {
      onMenuSelect && onMenuSelect(item.id);
      return;
    }

    // Premium feature → show modal
    setPremiumFeature(item.label);
    setPremiumOpen(true);
  };

  return (
    <div className="menu-wrapper">
      <div className="premium-menu-grid">
        {totalItems.map((item) => (
          <button
            key={item.id}
            className={`
              premium-menu-btn
              ${activeId === item.id ? "active" : ""}
              ${item.isToggle ? "toggle-btn" : ""}
            `}
            onClick={() => {
              if (item.isToggle) setShowAll(!showAll);
              else handleClick(item);
            }}
          >
            {!item.isToggle && <span className="icon">{item.emoji}</span>}
            <span className="label">{item.label}</span>

            {/* Lock for premium features */}
            {!item.isToggle && item.premium && <span className="lock">🔒</span>}

            {!item.isToggle && <span className="hover-ring"></span>}
          </button>
        ))}
      </div>

      {/* PREMIUM MODAL */}
      <PremiumModal
        open={premiumOpen}
        onClose={() => setPremiumOpen(false)}
        feature={premiumFeature}
      />
    </div>
  );
    }
