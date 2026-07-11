import type { FaceId, HairId, EyesId, PaletteId, ElementId } from "../lib/forge";
import { PALETTE_COLORS, ELEMENTS } from "../lib/forge";

type Props = {
  face: FaceId;
  hair: HairId;
  eyes: EyesId;
  palette: PaletteId;
  /** elemento exibe uma aura temática atrás do personagem (card/intro) */
  element?: ElementId;
  className?: string;
  /** id prefix so multiple SVGs on page don't clash gradients */
  uid?: string;
};

function facePath(face: FaceId): string {
  // silhuetas mais "anime": testa larga, bochecha suave, queixo afinando.
  switch (face) {
    case "sharp":
      return "M68 36 C50 36 44 52 44 72 C44 98 50 118 62 130 C66 134 70 136 70 136 C70 136 74 134 78 130 C90 118 96 98 96 72 C96 52 90 36 68 36 Z";
    case "soft":
      return "M68 34 C48 34 42 54 42 76 C42 104 52 124 66 134 C68 135 70 136 70 136 C70 136 72 135 74 134 C88 124 98 104 98 76 C98 54 92 34 68 34 Z";
    default:
      // oval — queixo suavemente pontudo
      return "M68 36 C52 36 45 52 45 73 C45 99 52 119 64 130 C66 133 70 135 70 135 C70 135 74 133 76 130 C88 119 95 99 95 73 C95 52 88 36 68 36 Z";
  }
}

function hairPath(hair: HairId): string {
  switch (hair) {
    case "long":
      return "M38 60 C36 36 50 22 70 20 C90 22 104 36 102 60 C102 74 94 82 70 82 C46 82 38 74 38 60 Z M44 82 C40 104 38 130 40 156 L32 156 C30 128 32 100 38 80 Z M96 82 C100 104 102 130 100 156 L108 156 C110 128 108 100 102 80 Z M54 84 C50 108 48 134 50 158 L42 158 C40 132 42 106 48 82 Z M86 84 C90 108 92 134 90 158 L98 158 C100 132 98 106 92 82 Z";
    case "short":
      return "M46 60 C44 38 54 24 70 22 C86 24 96 38 94 60 C94 72 86 78 70 78 C54 78 46 72 46 60 Z M46 60 C40 66 38 76 42 86 L48 86 C46 78 46 70 48 64 Z M94 60 C100 66 102 76 98 86 L92 86 C94 78 94 70 92 64 Z";
    case "wavy":
      return "M40 62 C38 40 50 26 70 24 C90 26 102 40 100 62 C98 54 90 50 82 54 C78 42 64 40 58 52 C50 48 42 52 40 62 Z M44 64 C40 86 40 110 44 134 C42 138 38 138 36 134 C34 108 34 84 40 64 Z M96 64 C100 86 100 110 96 134 C98 138 102 138 104 134 C106 108 106 84 100 64 Z";
    default:
      // spiky — picos afiados, assinatura shonen
      return "M36 62 L42 28 L50 50 L56 16 L62 46 L70 10 L78 46 L84 16 L90 50 L98 28 L104 62 C104 74 92 80 70 80 C48 80 36 74 36 62 Z";
  }
}

/** mechas de brilho sobre o topo do cabelo (acento anime) — alinhadas ao corte */
function hairStreaks(hair: HairId, color: string) {
  const stroke = { stroke: color, strokeWidth: 2.4, strokeLinecap: "round" as const, fill: "none", opacity: 0.85 };
  switch (hair) {
    case "long":
      return (
        <g>
          <path d="M50 40 Q54 30 58 36" {...stroke} />
          <path d="M82 40 Q86 30 90 36" {...stroke} />
        </g>
      );
    case "short":
      return (
        <g>
          <path d="M52 38 Q56 30 60 35" {...stroke} />
          <path d="M80 38 Q84 30 88 35" {...stroke} />
        </g>
      );
    case "wavy":
      return <path d="M52 38 Q60 30 68 34 Q76 30 84 38" {...stroke} />;
    default:
      return (
        <g>
          <path d="M50 40 L54 28" {...stroke} />
          <path d="M70 30 L70 18" {...stroke} />
          <path d="M90 40 L86 28" {...stroke} />
        </g>
      );
  }
}

/** olhos grandes estilo anime com iris, pupila, dois highlights e sobrancelha */
function eyesGroup(eyes: EyesId, color: string, hair: string, glow: boolean) {
  const cy = 82;
  const cxL = 55;
  const cxR = 85;
  const narrow = eyes === "narrow";
  // amêndoa do olho (branco) — achatada p/ "narrow"
  const ry = narrow ? 5.5 : 9.5;
  const lid = narrow
    ? (cx: number) => `M${cx - 12} ${cy} Q${cx} ${cy - ry + 2} ${cx + 12} ${cy} Q${cx} ${cy + ry - 5} ${cx - 12} ${cy} Z`
    : (cx: number) => `M${cx - 12} ${cy} Q${cx} ${cy - ry - 1} ${cx + 12} ${cy} Q${cx} ${cy + ry} ${cx - 12} ${cy} Z`;
  const irisR = narrow ? 5 : 7.5;

  return (
    <g>
      {glow && (
        <>
          <ellipse cx={cxL} cy={cy} rx={irisR + 5} ry={irisR + 4} fill={color} opacity="0.3" />
          <ellipse cx={cxR} cy={cy} rx={irisR + 5} ry={irisR + 4} fill={color} opacity="0.3" />
        </>
      )}
      {/* branco do olho */}
      <path d={lid(cxL)} fill="#fbf7ff" />
      <path d={lid(cxR)} fill="#fbf7ff" />
      {/* iris colorida + anel escuro */}
      <circle cx={cxL} cy={cy + 0.5} r={irisR} fill={color} />
      <circle cx={cxR} cy={cy + 0.5} r={irisR} fill={color} />
      <circle cx={cxL} cy={cy + 0.5} r={irisR} fill="none" stroke="#1a0f24" strokeWidth="1.4" />
      <circle cx={cxR} cy={cy + 0.5} r={irisR} fill="none" stroke="#1a0f24" strokeWidth="1.4" />
      {/* pupila */}
      <circle cx={cxL} cy={cy + 1.5} r={narrow ? 2.2 : 3.4} fill="#140a22" />
      <circle cx={cxR} cy={cy + 1.5} r={narrow ? 2.2 : 3.4} fill="#140a22" />
      {/* highlights — o que dá "vida" anime */}
      {!narrow && (
        <>
          <circle cx={cxL + 2.5} cy={cy - 2.5} r={2.6} fill="#fff" />
          <circle cx={cxR + 2.5} cy={cy - 2.5} r={2.6} fill="#fff" />
          <circle cx={cxL - 2} cy={cy + 3} r={1.2} fill="#fff" opacity="0.85" />
          <circle cx={cxR - 2} cy={cy + 3} r={1.2} fill="#fff" opacity="0.85" />
        </>
      )}
      {/* sobrancelhas — expressão muda com o tipo de olho */}
      <path
        d={narrow ? `M${cxL - 10} ${cy - 13} Q${cxL} ${cy - 17} ${cxL + 11} ${cy - 12}` : `M${cxL - 10} ${cy - 14} Q${cxL} ${cy - 17} ${cxL + 11} ${cy - 14}`}
        stroke={hair}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={narrow ? `M${cxR - 11} ${cy - 12} Q${cxR} ${cy - 17} ${cxR + 10} ${cy - 13}` : `M${cxR - 11} ${cy - 14} Q${cxR} ${cy - 17} ${cxR + 10} ${cy - 14}`}
        stroke={hair}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/** aura elemental atrás do personagem — halo temático na cor do elemento */
function elementAura(element: ElementId | undefined, color: string, uid: string) {
  if (!element) return null;
  const id = `${uid}-aura`;
  const common = { fill: color, opacity: 0.16 };
  const stroke = { stroke: color, fill: "none", opacity: 0.35, strokeWidth: 2.5, strokeLinecap: "round" as const };
  switch (element) {
    case "fire":
      return (
        <g aria-hidden>
          <path d="M22 150 C18 124 32 112 26 92 C40 104 48 100 42 82 C58 100 52 128 46 150 Z" {...common} />
          <path d="M118 150 C122 124 108 112 114 92 C100 104 92 100 98 82 C82 100 88 128 94 150 Z" {...common} />
          <path d="M30 140 Q26 120 34 104" {...stroke} />
          <path d="M110 140 Q114 120 106 104" {...stroke} />
        </g>
      );
    case "water":
      return (
        <g aria-hidden>
          <path d="M20 150 C24 128 24 108 20 90 C28 108 30 128 26 150 Z" {...common} />
          <path d="M120 150 C116 128 116 108 120 90 C112 108 110 128 114 150 Z" {...common} />
          <path d="M16 132 Q24 124 32 132 Q40 140 48 132" {...stroke} />
          <path d="M92 132 Q100 124 108 132 Q116 140 124 132" {...stroke} />
        </g>
      );
    case "wind":
      return (
        <g aria-hidden>
          <path d="M14 120 C34 116 50 124 60 116 C46 128 30 126 14 130" {...stroke} />
          <path d="M80 104 C100 100 116 108 126 100 C112 112 96 110 80 114" {...stroke} />
          <path d="M18 150 C40 146 58 154 70 146" {...stroke} />
          <circle cx="118" cy="150" r="3" fill={color} opacity="0.5" />
          <circle cx="22" cy="96" r="2.4" fill={color} opacity="0.5" />
        </g>
      );
    case "shadow":
      return (
        <g aria-hidden>
          <defs>
            <mask id={id}>
              <rect width="140" height="180" fill="#000" />
              <circle cx="112" cy="40" r="20" fill="#fff" />
              <circle cx="120" cy="36" r="17" fill="#000" />
            </mask>
          </defs>
          <circle cx="112" cy="40" r="20" fill={color} opacity="0.28" mask={`url(#${id})`} />
          <circle cx="26" cy="30" r="1.6" fill={color} opacity="0.7" />
          <circle cx="36" cy="52" r="1.2" fill={color} opacity="0.6" />
          <circle cx="18" cy="62" r="1" fill={color} opacity="0.5" />
          <circle cx="124" cy="70" r="1.4" fill={color} opacity="0.6" />
        </g>
      );
    case "light":
      return (
        <g aria-hidden>
          <circle cx="70" cy="74" r="46" fill={color} opacity="0.1" />
          <g stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.4">
            <path d="M70 28 L70 14" />
            <path d="M112 74 L126 74" />
            <path d="M28 74 L14 74" />
            <path d="M100 44 L110 34" />
            <path d="M40 44 L30 34" />
            <path d="M100 104 L110 114" />
            <path d="M40 104 L30 114" />
          </g>
        </g>
      );
    default:
      return null;
  }
}

/** Avatar paramétrico original (SVG) — rosto/cabelo/olhos anime + paleta + aura elemental */
export function AvatarSvg({ face, hair, eyes, palette, element, className, uid = "av" }: Props) {
  const c = PALETTE_COLORS[palette];
  const gBody = `${uid}-body`;
  const gHair = `${uid}-hair`;
  const auraColor = element ? (ELEMENTS.find((e) => e.id === element)?.color ?? c.accent) : c.accent;

  return (
    <svg
      className={className}
      viewBox="0 0 140 180"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gBody} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.accent} />
          <stop offset="0.5" stopColor={c.hair} />
          <stop offset="1" stopColor="#1f1730" />
        </linearGradient>
        <linearGradient id={gHair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.accent} />
          <stop offset="0.5" stopColor={c.hair} />
          <stop offset="1" stopColor={c.hair} />
        </linearGradient>
        <radialGradient id={`${uid}-cheek`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff7eb3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff7eb3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* aura elemental atrás de tudo */}
      {elementAura(element, auraColor, uid)}

      {/* ombros / busto com gola */}
      <path
        d="M44 120 L96 120 L100 130 C116 136 126 150 128 170 L132 180 L8 180 L12 170 C14 150 24 136 40 130 Z"
        fill={`url(#${gBody})`}
      />
      {/* gola/veste — detalhe de roupa */}
      <path d="M56 120 L70 138 L84 120 L80 128 L70 144 L60 128 Z" fill="#0f0918" opacity="0.55" />

      {/* pescoço */}
      <path d="M62 108 L78 108 L78 124 Q70 130 62 124 Z" fill={c.skin} />
      <path d="M62 120 Q70 126 78 120 L78 124 Q70 130 62 124 Z" fill="#000" opacity="0.08" />

      {/* rosto */}
      <path d={facePath(face)} fill={c.skin} />
      {/* sombra de pele no maxilar (volume) */}
      <path d="M46 96 Q70 120 94 96 Q92 112 78 124 Q70 128 62 124 Q48 112 46 96 Z" fill="#000" opacity="0.06" />

      {/* blush sakura nas bochechas */}
      <ellipse cx="48" cy="94" rx="8" ry="5" fill={`url(#${uid}-cheek)`} />
      <ellipse cx="92" cy="94" rx="8" ry="5" fill={`url(#${uid}-cheek)`} />

      {/* nariz sutil */}
      <path d="M69 88 Q67 93 69 95" stroke="#b07a6a" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* olhos + sobrancelhas */}
      {eyesGroup(eyes, c.eyes, c.hair, eyes === "glow")}

      {/* boca */}
      <path
        d={eyes === "narrow" ? "M64 102 Q70 100 76 102" : "M64 102 Q70 107 76 102"}
        stroke="#9a4a52"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* cabelo + mechas */}
      <path d={hairPath(hair)} fill={`url(#${gHair})`} />
      {hairStreaks(hair, c.accent)}
    </svg>
  );
}
