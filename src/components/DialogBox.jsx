import { motion } from 'motion/react';
export default function DialogBox({ title, children, actions, pixel = false }) {
  return <motion.div className={`dialog ${pixel ? 'pixel-dialog' : ''}`} initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
    <div className="dialog-chrome"><span>LOVE_NOTE.EXE</span><span aria-hidden="true">— &nbsp; □ &nbsp; ×</span></div>
    <div className="dialog-content"><div className="pixel-heart" aria-hidden="true">♥</div><h2>{title}</h2><div className="dialog-copy">{children}</div><div className="dialog-actions">{actions}</div></div>
  </motion.div>;
}
