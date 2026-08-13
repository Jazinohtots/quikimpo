// Replicates the exact letter-by-letter wordmark and colours already defined
// in static/css/styles.css (.l-q through .l-o): "Quik" in gold, "Impo" in
// white/grey, so the React header matches the Django templates precisely.

interface LogoProps {
  small?: boolean;
  dark?: boolean; // true when placed on the light/paper background
}

export default function Logo({ small = false, dark = false }: LogoProps) {
  const size = small ? "text-lg" : "text-2xl";
  const white = dark ? "#0f172a" : "#ffffff";
  const grey1 = dark ? "#1e293b" : "#f0f0f0";
  const grey2 = dark ? "#334155" : "#e0e0e0";
  const grey3 = dark ? "#475569" : "#d0d0d0";

  return (
    <span className="flex flex-col leading-none">
      <span className={`${size} font-extrabold tracking-tight`}>
        <span style={{ color: "#ffd700" }}>Q</span>
        <span style={{ color: "#ffcc00" }}>u</span>
        <span style={{ color: "#ffdd44" }}>i</span>
        <span style={{ color: "#ffe066" }}>k</span>
        <span style={{ color: white, marginLeft: 4 }}>I</span>
        <span style={{ color: grey1 }}>m</span>
        <span style={{ color: grey2 }}>p</span>
        <span style={{ color: grey3 }}>o</span>
      </span>
      {!small && (
        <span className="mt-0.5 font-mono text-[10px] tracking-widest text-sky">
          FREIGHT &amp; LOGISTICS
        </span>
      )}
    </span>
  );
}
