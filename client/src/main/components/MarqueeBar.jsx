// 6️⃣ MarqueeBar.jsx (Pure CSS Marquee)
import "./marquee.css";

const news = [
  "React 19 announced!",
  "Bootstrap 6 in alpha",
  "Accessibility 2025 update",
  "New CSS properties released"
];

export default function MarqueeBar() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {news.map((n,i)=><span key={i}>{n}</span>)}
      </div>
    </div>
  );
}
