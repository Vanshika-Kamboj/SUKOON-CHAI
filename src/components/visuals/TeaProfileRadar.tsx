import React from 'react';
import { TeaProfileMetrics } from '../../types';

interface TeaProfileRadarProps {
  metrics: TeaProfileMetrics;
  compact?: boolean;
}

export const TeaProfileRadar: React.FC<TeaProfileRadarProps> = ({ metrics, compact = false }) => {
  const axes = [
    { label: 'Strength', key: 'strength', value: metrics.strength, color: '#3E2A20' },
    { label: 'Aroma', key: 'aroma', value: metrics.aroma, color: '#B96F4A' },
    { label: 'Spice', key: 'spice', value: metrics.spice, color: '#B96F4A' },
    { label: 'Floral', key: 'floral', value: metrics.floral, color: '#C99791' },
    { label: 'Freshness', key: 'freshness', value: metrics.freshness, color: '#667052' },
    { label: 'Comfort', key: 'comfort', value: metrics.comfort, color: '#3E2A20' },
  ];

  const size = compact ? 190 : 260;
  const center = size / 2;
  const radius = size * 0.36;
  const total = axes.length;

  // Calculate polygon coordinates
  const getCoordinates = (value: number, index: number, max: number = 10) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / max) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Background radar webs (levels 2, 4, 6, 8, 10)
  const levels = [2.5, 5, 7.5, 10];
  const gridPolygons = levels.map((lvl) => {
    return axes
      .map((_, i) => {
        const { x, y } = getCoordinates(lvl, i, 10);
        return `${x},${y}`;
      })
      .join(' ');
  });

  // Value polygon
  const valuePolygon = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.value, i, 10);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full">
      <div className={`flex flex-col ${compact ? 'items-center' : 'md:flex-row items-center gap-8'}`}>
        {/* Radar SVG */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background circular web */}
            {gridPolygons.map((points, idx) => (
              <polygon
                key={idx}
                points={points}
                fill={idx === levels.length - 1 ? 'rgba(231, 213, 186, 0.18)' : 'transparent'}
                stroke="#E7D5BA"
                strokeWidth={idx === levels.length - 1 ? '1.5' : '0.8'}
                strokeDasharray={idx < levels.length - 1 ? '2 2' : undefined}
              />
            ))}

            {/* Axes spokes */}
            {axes.map((_, i) => {
              const { x, y } = getCoordinates(10, i, 10);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#E7D5BA"
                  strokeWidth="1"
                />
              );
            })}

            {/* Radar area */}
            <polygon
              points={valuePolygon}
              fill="rgba(185, 111, 74, 0.28)"
              stroke="#B96F4A"
              strokeWidth="2"
              className="transition-all duration-500 ease-out"
            />

            {/* Radar points */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(axis.value, i, 10);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#3E2A20"
                  stroke="#FFFDF9"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Axis labels */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(12.5, i, 10);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[11px] font-medium fill-[#3E2A20]/80 tracking-wide select-none"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {axis.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Linear profile meters */}
        <div className="w-full mt-4 md:mt-0 space-y-2.5">
          <div className="text-xs uppercase tracking-wider text-[#3E2A20]/60 font-semibold mb-2">
            Sensory Balance Profile
          </div>
          {axes.map((item) => (
            <div key={item.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#3E2A20]">{item.label}</span>
                <span className="text-[#3E2A20]/60 font-mono tabular-nums">{item.value.toFixed(1)} / 10</span>
              </div>
              <div className="h-2 w-full bg-[#E7D5BA]/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${(item.value / 10) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
