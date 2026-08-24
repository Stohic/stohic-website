import { useId, useState } from 'react'

import { comparison } from '@/content'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

type View = 'shared' | 'enclave'

interface Layout {
  viewBox: string
  door: { x: number; y: number; w: number; h: number; r: number }
  doorLabelSize: number
  nodeSize: number
  nodeR: number
  /** Centers in the shared state. */
  nodes: [number, number][]
  /** How far each node moves apart when it gets its own boundary. */
  drift: [number, number][]
  /** Recenters the whole arrangement once the front door is gone. */
  enclaveShift: [number, number]
  boundary: number
  /** Node -> shared front door. Drawn under the nodes and the door, which are opaque. */
  connectors: string[]
  /** Faint links between organizations that are working together. */
  assoc: string[]
}

// Six organizations on an ellipse around the door they all use. Radial spokes
// cross nothing, and when the door goes the hole it leaves is in the middle of
// the frame rather than a band of dead space above it.
const WIDE: Layout = {
  viewBox: '0 0 800 520',
  door: { x: 300, y: 232, w: 200, h: 56, r: 10 },
  doorLabelSize: 13,
  nodeSize: 72,
  nodeR: 10,
  nodes: [
    [149, 178],
    [400, 95],
    [651, 178],
    [651, 342],
    [400, 425],
    [149, 342],
  ],
  drift: [
    [-9, -6],
    [0, -10],
    [9, -6],
    [9, 6],
    [0, 10],
    [-9, 6],
  ],
  enclaveShift: [0, 0],
  boundary: 148,
  connectors: [
    // Each spoke stops on the door's edge rather than its center, so nothing
    // shows through the door while it is fading.
    'M 149,178 L 314,232',
    'M 400,95 L 400,232',
    'M 651,178 L 486,232',
    'M 651,342 L 486,288',
    'M 400,425 L 400,288',
    'M 149,342 L 314,288',
  ],
  assoc: ['M 149,178 L 400,95', 'M 651,178 L 651,342', 'M 400,425 L 149,342'],
}

const NARROW: Layout = {
  viewBox: '0 0 360 620',
  door: { x: 80, y: 20, w: 200, h: 48, r: 10 },
  doorLabelSize: 12,
  nodeSize: 64,
  nodeR: 10,
  nodes: [
    [96, 180],
    [264, 180],
    [96, 340],
    [264, 340],
    [96, 500],
    [264, 500],
  ],
  drift: [
    [-6, -6],
    [6, -6],
    [-6, 0],
    [6, 0],
    [-6, 6],
    [6, 6],
  ],
  enclaveShift: [0, -42],
  boundary: 120,
  // A single trunk plus six stubs. Curved routing does not fit at 360px, and
  // the trunk says "everyone uses the same door" just as plainly.
  connectors: [
    'M 180,68 L 180,500',
    'M 128,180 L 180,180',
    'M 232,180 L 180,180',
    'M 128,340 L 180,340',
    'M 232,340 L 180,340',
    'M 128,500 L 180,500',
    'M 232,500 L 180,500',
  ],
  assoc: ['M 128,196 L 232,324', 'M 128,356 L 232,484', 'M 232,212 L 128,468'],
}

/** Rounded rect with a gap in the top edge: the organization's own entrance. */
function boundaryPath(cx: number, cy: number, size: number, r: number, gap: number) {
  const x = cx - size / 2
  const y = cy - size / 2
  const w = size
  const h = size
  return [
    `M ${x + r},${y}`,
    `H ${cx - gap / 2}`,
    `M ${cx + gap / 2},${y}`,
    `H ${x + w - r}`,
    `A ${r},${r} 0 0 1 ${x + w},${y + r}`,
    `V ${y + h - r}`,
    `A ${r},${r} 0 0 1 ${x + w - r},${y + h}`,
    `H ${x + r}`,
    `A ${r},${r} 0 0 1 ${x},${y + h - r}`,
    `V ${y + r}`,
    `A ${r},${r} 0 0 1 ${x + r},${y}`,
  ].join(' ')
}

export function EnclaveComparison() {
  const [view, setView] = useState<View>('shared')
  const isWide = useMediaQuery('(min-width: 640px)', true)
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')

  const L = isWide ? WIDE : NARROW
  const enclave = view === 'enclave'
  const titleId = `${uid}-title`
  const descId = `${uid}-desc`

  // Elements arriving wait for the elements leaving to clear out.
  const delay = (entersInEnclave: boolean) => {
    if (reduced) return 0
    return entersInEnclave === enclave ? 80 : 0
  }

  const [sx, sy] = L.enclaveShift
  const node = (i: number) => {
    const [cx, cy] = L.nodes[i]
    const [dx, dy] = L.drift[i]
    return { cx, cy, tx: enclave ? dx + sx : 0, ty: enclave ? dy + sy : 0 }
  }

  return (
    <figure className="m-0">
      <div
        role="radiogroup"
        aria-label="Comparison view"
        className="mx-auto flex w-fit rounded-sm border border-border bg-bg p-1"
      >
        {(['shared', 'enclave'] as const).map((value) => {
          const active = view === value
          return (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name={`${uid}-view`}
                value={value}
                checked={active}
                onChange={() => setView(value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'block rounded-sm px-4 py-2 text-[0.875rem] font-bold transition-colors duration-200 motion-reduce:transition-none',
                  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--focus-ring)]',
                  active ? 'bg-brand-600 text-white' : 'text-muted-fg hover:text-fg',
                )}
              >
                {comparison.options[value]}
              </span>
            </label>
          )
        })}
      </div>

      <div className="mt-8 md:mt-10">
        <svg
          viewBox={L.viewBox}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="mx-auto block h-auto w-full max-w-[860px]"
        >
          <title id={titleId}>{comparison.heading}</title>
          <desc id={descId}>{comparison.descriptions[view]}</desc>

          {/* Boundaries. Only real in the Enclave state. */}
          <g fill="#FFFFFF" stroke="#1E3A6E" strokeWidth={1.5} strokeLinecap="round">
            {L.nodes.map((_, i) => {
              const { cx, cy, tx, ty } = node(i)
              const bx = cx + tx
              const by = cy + ty
              return (
                <g
                  key={`b-${i}`}
                  className="enclave-anim"
                  style={{
                    opacity: enclave ? 0.8 : 0,
                    transitionDelay: `${delay(true)}ms`,
                  }}
                >
                  <path d={boundaryPath(bx, by, L.boundary, 12, 26)} />
                  <circle
                    cx={bx}
                    cy={by - L.boundary / 2}
                    r={4}
                    fill="#34D399"
                    stroke="#1E3A6E"
                    strokeWidth={1.5}
                  />
                </g>
              )
            })}
          </g>

          {/* Everyone arriving at the same address. */}
          <g
            className="enclave-anim"
            fill="none"
            stroke="#2B4F96"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={{ opacity: enclave ? 0 : 0.45, transitionDelay: `${delay(false)}ms` }}
          >
            {L.connectors.map((d, i) => (
              <path key={`c-${i}`} d={d} />
            ))}
          </g>

          {/* Who is working with whom, visible from the pattern alone. */}
          <g
            className="enclave-anim"
            fill="none"
            stroke="#2B4F96"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            strokeLinecap="round"
            style={{ opacity: enclave ? 0 : 0.5, transitionDelay: `${delay(false)}ms` }}
          >
            {L.assoc.map((d, i) => (
              <path key={`a-${i}`} d={d} />
            ))}
          </g>

          {/* The shared front door. The one accent-colored thing on the page. */}
          <g
            className="enclave-anim"
            style={{
              opacity: enclave ? 0 : 1,
              transform: enclave ? 'scale(0.9)' : 'scale(1)',
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transitionDelay: `${delay(false)}ms`,
            }}
          >
            <rect
              x={L.door.x - 6}
              y={L.door.y - 6}
              width={L.door.w + 12}
              height={L.door.h + 12}
              rx={L.door.r + 5}
              fill="none"
              stroke="#38BDF8"
              strokeWidth={2.5}
            />
            <rect
              x={L.door.x}
              y={L.door.y}
              width={L.door.w}
              height={L.door.h}
              rx={L.door.r}
              fill="#1E3A6E"
            />
            <text
              x={L.door.x + L.door.w / 2}
              y={L.door.y + L.door.h / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontFamily="'JetBrains Mono', ui-monospace, monospace"
              fontSize={L.doorLabelSize}
            >
              Shared front door
            </text>
          </g>

          {/* Six anonymous organizations. Never labelled: that is the point. */}
          <g>
            {L.nodes.map((_, i) => {
              const { cx, cy, tx, ty } = node(i)
              return (
                <g
                  key={`n-${i}`}
                  className="enclave-anim"
                  style={{
                    transform: `translate(${tx}px, ${ty}px)`,
                    transitionDelay: `${reduced ? 0 : 40}ms`,
                  }}
                >
                  <rect
                    x={cx - L.nodeSize / 2}
                    y={cy - L.nodeSize / 2}
                    width={L.nodeSize}
                    height={L.nodeSize}
                    rx={L.nodeR}
                    fill="#F1F5F9"
                    stroke="#1E3A6E"
                    strokeWidth={1.5}
                  />
                  {/* A name, withheld. brand-500 rather than brand-300 so the
                      mark clears 3:1 against the node fill. */}
                  <rect x={cx - 15} y={cy - 8} width={30} height={5} rx={2.5} fill="#2B4F96" />
                  <rect x={cx - 15} y={cy + 3} width={18} height={5} rx={2.5} fill="#2B4F96" />
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <figcaption
        aria-live="polite"
        className="mx-auto mt-8 max-w-[58ch] text-center text-[0.9375rem] leading-[1.6] text-muted-fg md:mt-10"
      >
        {comparison.captions[view]}
      </figcaption>
    </figure>
  )
}
