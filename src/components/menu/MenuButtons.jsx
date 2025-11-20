import React, { useState } from 'react';
import PremiumModal from '../premium/PremiumModal';

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

  const visibleItems = showAll ? allItems : allItems.slice(0, 5);

  const totalItems = showAll
    ? [...visibleItems, { label: "Less ▴", id: "less", isToggle: true }]
    : [...visibleItems, { label: "More ▾", id: "more", isToggle: true }];

  const handleClick = (item) => {
    setActiveId(item.id);

    if (item.isToggle) {
      setShowAll(!showAll);
      return;
    }

    if (!item.premium) {
      onMenuSelect && onMenuSelect(item.id);
      return;
    }
    setPremiumFeature(item.label);
    setPremiumOpen(true);
  };

  return (
    <div>
      <div className="menu-grid">
        {totalItems.map((item) => (
          <button
            key={item.id}
            className={`menu-btn ${activeId === item.id ? 'active' : ''} ${item.isToggle ? 'toggle-btn' : ''}`}
            onClick={() => handleClick(item)}
          >
            {!item.isToggle && <span style={{marginRight:8}}>{item.emoji}</span>}
            <span>{item.label}</span>
            {!item.isToggle && item.premium && <span className='lock-badge'>🔒</span>}
          </button>
        ))}
      </div>

      <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} feature={premiumFeature} />
    </div>
  );
}
