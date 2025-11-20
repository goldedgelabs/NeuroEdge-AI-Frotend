import React from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiX } from 'react-icons/fi';
export default function SendButton({ sending, onCancel, disabled, onClick }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <motion.div animate={sending ? { rotate: 360 } : { rotate: 0 }} transition={sending ? { repeat: Infinity, duration: 1.6, ease: 'linear' } : { duration: 0 }} style={{ position: 'absolute', inset: -8, borderRadius: 999, pointerEvents: 'none', display: sending ? 'block' : 'none' }}>
        <div style={{ width: 72, height: 72, borderRadius: 999, boxShadow: '0 0 0 6px rgba(212,162,23,0.06)', border: '3px solid rgba(212,162,23,0.18)' }} />
      </motion.div>
      <motion.button whileTap={{ scale: 0.95 }} onClick={() => { if (sending) { onCancel && onCancel(); return; } if (!disabled) onClick && onClick(); }} animate={sending ? { scale: 1.02 } : { scale: 1 }} style={{ width: 56, height: 56, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer', background: sending ? '#F04438' : 'linear-gradient(90deg,#19a0ff,#5dd1ff)', color: sending ? '#fff' : '#00242b', boxShadow: sending ? '0 8px 28px rgba(240,68,56,0.18)' : '0 8px 28px rgba(25,160,255,0.12)', border: 'none' }} aria-label={sending ? 'Cancel sending' : 'Send message'}>
        {sending ? <FiX size={20} /> : <FiSend size={20} />}
      </motion.button>
    </div>
  );
}
