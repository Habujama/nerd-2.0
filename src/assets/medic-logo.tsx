import './medic-logo.css'

interface EkgLogoProps {
  width: number | string;
}

const EkgLogo = ({ width }: EkgLogoProps) => (
  <div className="med-wrap" role="img" aria-label="Zdravotnický kříž">
  {/* <!-- SVG zeleného kříže s jemným glow efektem --> */}
  <svg className="med-cross" width={width} height="auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="false" focusable="false">
    <defs>
      {/* <!-- jemné rozostření pro glow --> */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* <!-- gradient pro plastický vzhled kříže --> */}
      <linearGradient id="crossGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#83f8c9"/>
        <stop offset="1" stopColor="#2ad48e"/>
      </linearGradient>

      {/* <!-- drobný stín pro hloubku --> */}
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feOffset result="off" dx="0" dy="2" />
        <feGaussianBlur in="off" stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* <!-- kruhové pozadí (transparentní, protože wrapper má barvu) --> */}
    <circle cx="100" cy="100" r="98" fill="transparent" />

    {/* <!-- 3D-ish kříž: základní tvar + vnitřní vykousnutí pro „ikonický“ kříž --> */}
    <g transform="translate(0,0)" filter="url(#glow)">
      {/* <!-- širší podklad pro kříž (tmavší okraj) --> */}
      <path d="M82 28h36v54h54v36h-54v54h-36v-54H28v-36h54z"
            fill="url(#crossGrad)"
            stroke="#06c77d"
            strokeWidth="1.5"
            strokeLinejoin="round"/>
    </g>

    {/* <!-- jemný vnitřní highlight pro plastický vzhled --> */}
    <path d="M82 28h36v54h54v36h-54v54h-36v-54H28v-36h54z"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
          strokeWidth="2"
          strokeLinejoin="round"/>

    {/* <!-- lehký stín pod ikonou pro hloubku --> */}
    <ellipse cx="100" cy="172" rx="42" ry="6" fill="#000" opacity="0.12" />

  </svg>
</div>
)

export default EkgLogo
