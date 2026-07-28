/**
 * KOMPONEN: Marquee (Neo-Brutalist Ticker)
 * DESKRIPSI: Infinite running text banner dengan arsitektur dual-track seamless scroll.
 */

export default function Marquee() {
  const marqueeText = "Collections & Updates From AZZ PORTFOLIO ☺";

  return (
    <div className="w-full bg-han-green border-b-4 border-black py-2.5 overflow-hidden z-40 relative select-none mt-[68px] sm:mt-[72px] group">
      {/* Wrapper Track Ganda untuk Infinite Loop Tanpa Celah */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {/* Track Pertama (Dipindai oleh Screen Reader) */}
        <div className="flex items-center gap-8 text-black font-pixel text-xs sm:text-sm uppercase tracking-widest font-black pr-8 shrink-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={`primary-${index}`} className="flex items-center gap-8">
              <span>{marqueeText}</span>
              <span className="text-black/40 font-mono">//</span>
            </span>
          ))}
        </div>

        {/* Track Kedua (Duplikat Identik untuk Menyambung Animasi) */}
        <div
          aria-hidden="true"
          className="flex items-center gap-8 text-black font-pixel text-xs sm:text-sm uppercase tracking-widest font-black pr-8 shrink-0"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={`secondary-${index}`}
              className="flex items-center gap-8"
            >
              <span>{marqueeText}</span>
              <span className="text-black/40 font-mono">//</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
