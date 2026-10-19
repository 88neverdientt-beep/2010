export default function Particles() {
  return <div className="particles" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} style={{ '--x': `${(i * 47 + 13) % 100}%`, '--y': `${(i * 31 + 7) % 100}%`, '--delay': `${-i * 1.3}s`, '--duration': `${9 + i % 7}s` }}>{i % 4 === 0 ? '♡' : '·'}</i>)}</div>;
}
