import type { FaceId, HairId, EyesId, PaletteId } from "../lib/forge";
import { PALETTE_COLORS } from "../lib/forge";

type Props = {
  face: FaceId;
  hair: HairId;
  eyes: EyesId;
  palette: PaletteId;
  className?: string;
  /** id prefix so multiple SVGs on page don't clash gradients */
  uid?: string;
};

function facePath(face: FaceId): string {
  switch (face) {
    case "sharp":
      return "M70 38 C52 38 44 52 44 72 C44 96 52 118 70 128 C88 118 96 96 96 72 C96 52 88 38 70 38 Z";
    case "soft":
      return "M70 36 C50 36 42 54 42 74 C42 102 52 122 70 130 C88 122 98 102 98 74 C98 54 90 36 70 36 Z";
    default:
      return "M70 40 C54 40 46 54 46 72 C46 98 54 118 70 126 C86 118 94 98 94 72 C94 54 86 40 70 40 Z";
  }
}

function hairPath(hair: HairId): string {
  switch (hair) {
    case "long":
      return "M40 58 L44 28 L54 48 L62 22 L70 42 L78 22 L86 48 L96 28 L100 58 C100 70 92 78 70 78 C48 78 40 70 40 58 Z M48 78 L52 140 L46 140 Z M88 78 L94 140 L88 140 Z M58 78 L62 150 L58 150 Z M78 78 L82 150 L78 150 Z";
    case "short":
      return "M48 58 L52 36 L60 50 L70 30 L80 50 L88 36 L92 58 C92 68 84 74 70 74 C56 74 48 68 48 58 Z";
    case "wavy":
      return "M42 60 C40 40 52 28 70 26 C88 28 100 40 98 60 C96 52 88 48 80 52 C76 40 64 38 60 50 C52 46 44 50 42 60 Z M48 62 C46 90 50 118 54 140 L48 140 C46 110 44 84 48 62 Z M92 62 C94 90 90 118 86 140 L92 140 C94 110 96 84 92 62 Z";
    default: // spiky
      return "M40 58 L46 26 L52 50 L58 18 L64 48 L70 14 L76 48 L82 18 L88 50 L94 26 L100 58 C100 70 90 76 70 76 C50 76 40 70 40 58 Z";
  }
}

function eyesGroup(eyes: EyesId, color: string, glow: boolean) {
  const ry = eyes === "narrow" ? 4 : eyes === "glow" ? 7 : 6;
  const rx = eyes === "narrow" ? 10 : 8;
  return (
    <g>
      {glow && (
        <>
          <ellipse cx="56" cy="78" rx={rx + 4} ry={ry + 3} fill={color} opacity="0.35" />
          <ellipse cx="84" cy="78" rx={rx + 4} ry={ry + 3} fill={color} opacity="0.35" />
        </>
      )}
      <ellipse cx="56" cy="78" rx={rx} ry={ry} fill="#1a0f24" />
      <ellipse cx="84" cy="78" rx={rx} ry={ry} fill="#1a0f24" />
      <ellipse cx="56" cy="78" rx={rx * 0.55} ry={ry * 0.7} fill={color} />
      <ellipse cx="84" cy="78" rx={rx * 0.55} ry={ry * 0.7} fill={color} />
      <circle cx="58" cy="76" r="1.5" fill="#fff" opacity="0.85" />
      <circle cx="86" cy="76" r="1.5" fill="#fff" opacity="0.85" />
    </g>
  );
}

/** Avatar paramétrico original (SVG) — rosto/cabelo/olhos + paleta */
export function AvatarSvg({ face, hair, eyes, palette, className, uid = "av" }: Props) {
  const c = PALETTE_COLORS[palette];
  const gId = `${uid}-body`;

  return (
    <svg
      className={className}
      viewBox="0 0 140 180"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.accent} />
          <stop offset="0.55" stopColor={c.hair} />
          <stop offset="1" stopColor="#1f1730" />
        </linearGradient>
      </defs>
      {/* ombros / busto */}
      <path
        d="M48 118 L92 118 L96 128 C112 134 122 148 124 168 L128 180 L12 180 L16 168 C18 148 28 134 44 128 Z"
        fill={`url(#${gId})`}
      />
      {/* pescoço */}
      <rect x="62" y="110" width="16" height="16" rx="4" fill={c.skin} />
      {/* rosto */}
      <path d={facePath(face)} fill={c.skin} />
      {/* cabelo */}
      <path d={hairPath(hair)} fill={c.hair} />
      {/* olhos */}
      {eyesGroup(eyes, c.eyes, eyes === "glow")}
      {/* boca sutil */}
      <path
        d="M62 98 Q70 104 78 98"
        fill="none"
        stroke="#b07a6a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
