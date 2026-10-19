import { motion } from 'motion/react';
export default function GiftBox({ onOpen, opening }) {
  return <button className={`gift-stage ${opening ? 'opening' : ''}`} onClick={onOpen} disabled={opening} aria-label="Mở hộp quà dành riêng cho em">
    <span className="gift-orbit orbit-one"/><span className="gift-orbit orbit-two"/>
    <span className="gift-spark spark-one">✧</span><span className="gift-spark spark-two">✦</span><span className="gift-spark spark-three">✧</span>
    <motion.span className="gift" animate={opening ? { y: 0 } : { y: [0, -10, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }}>
      <span className="gift-lid"><span className="bow left"/><span className="bow right"/><span className="bow-knot"/></span>
      <span className="gift-body"><span className="gift-ribbon"/><span className="gift-tag">with<br/><em>love</em><span>♡</span></span></span>
    </motion.span><span className="gift-shadow"/>
  </button>;
}
