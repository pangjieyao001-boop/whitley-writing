import React from 'react';

interface ChartExampleProps {
  type: 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';
}

const ChartExample: React.FC<ChartExampleProps> = ({ type }) => {
  if (type === 'line') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-center text-sm text-slate-500 mb-4">The graph shows the proportion of population aged 65+ (1940-2040)</div>
        <svg viewBox="0 0 500 250" className="w-full h-auto">
          {/* Axes */}
          <line x1="60" y1="30" x2="60" y2="210" stroke="#94a3b8" strokeWidth="1" />
          <line x1="60" y1="210" x2="480" y2="210" stroke="#94a3b8" strokeWidth="1" />
          {/* Y-axis labels */}
          {[0, 5, 10, 15, 20, 25].map((v, i) => (
            <text key={i} x="45" y={210 - i * 30} textAnchor="end" fontSize="10" fill="#64748b">{v}%</text>
          ))}
          {/* X-axis labels */}
          {[1940, 1960, 1980, 2000, 2020, 2040].map((v, i) => (
            <text key={i} x={60 + i * 84} y="230" textAnchor="middle" fontSize="10" fill="#64748b">{v}</text>
          ))}
          {/* Japan line */}
          <polyline points="60,195 144,195 228,195 312,165 396,75 480,30" fill="none" stroke="#e11d48" strokeWidth="2.5" />
          {/* USA line */}
          <polyline points="60,165 144,150 228,135 312,120 396,105 480,90" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
          {/* Sweden line */}
          <polyline points="60,172 144,157 228,142 312,120 396,97 480,82" fill="none" stroke="#10b981" strokeWidth="2.5" />
          {/* Legend */}
          <rect x="320" y="40" width="10" height="3" fill="#e11d48" /><text x="335" y="45" fontSize="11" fill="#475569">Japan</text>
          <rect x="320" y="55" width="10" height="3" fill="#0ea5e9" /><text x="335" y="60" fontSize="11" fill="#475569">USA</text>
          <rect x="320" y="70" width="10" height="3" fill="#10b981" /><text x="335" y="75" fontSize="11" fill="#475569">Sweden</text>
        </svg>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-center text-sm text-slate-500 mb-4">Amount spent on fast foods per week (pence per person)</div>
        <svg viewBox="0 0 500 220" className="w-full h-auto">
          <line x1="60" y1="30" x2="60" y2="180" stroke="#94a3b8" strokeWidth="1" />
          <line x1="60" y1="180" x2="480" y2="180" stroke="#94a3b8" strokeWidth="1" />
          {[0, 10, 20, 30, 40, 50].map((v, i) => (
            <text key={i} x="50" y={183 - i * 25} textAnchor="end" fontSize="10" fill="#64748b">{v}</text>
          ))}
          {/* Hamburgers */}
          <rect x="85" y="105" width="22" height="75" fill="#0ea5e9" rx="2" />
          <rect x="115" y="125" width="22" height="55" fill="#38bdf8" rx="2" />
          <rect x="145" y="160" width="22" height="20" fill="#7dd3fc" rx="2" />
          {/* Fish & Chips */}
          <rect x="215" y="140" width="22" height="40" fill="#10b981" rx="2" />
          <rect x="245" y="148" width="22" height="32" fill="#34d399" rx="2" />
          <rect x="275" y="135" width="22" height="45" fill="#6ee7b7" rx="2" />
          {/* Pizza */}
          <rect x="345" y="165" width="22" height="15" fill="#f59e0b" rx="2" />
          <rect x="375" y="158" width="22" height="22" fill="#fbbf24" rx="2" />
          <rect x="405" y="165" width="22" height="15" fill="#fcd34d" rx="2" />
          {/* Labels */}
          <text x="118" y="200" textAnchor="middle" fontSize="9" fill="#64748b">Hamburger</text>
          <text x="248" y="200" textAnchor="middle" fontSize="9" fill="#64748b">Fish & Chips</text>
          <text x="378" y="200" textAnchor="middle" fontSize="9" fill="#64748b">Pizza</text>
          <text x="30" y="100" textAnchor="middle" fontSize="9" fill="#64748b" transform="rotate(-90 30 100)">Pence</text>
        </svg>
      </div>
    );
  }

  if (type === 'pie') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-center text-sm text-slate-500 mb-4">Types of books sold in 1970 vs 1990</div>
        <div className="flex justify-around items-center">
          <div className="text-center">
            <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
              <circle cx="60" cy="60" r="50" fill="#0ea5e9" />
              <path d="M60,60 L60,10 A50,50 0 0,1 103,35 Z" fill="#10b981" />
              <path d="M60,60 L103,35 A50,50 0 0,1 103,85 Z" fill="#f59e0b" />
              <path d="M60,60 L103,85 A50,50 0 0,1 60,110 Z" fill="#e11d48" />
              <path d="M60,60 L60,110 A50,50 0 0,1 17,85 Z" fill="#8b5cf6" />
            </svg>
            <p className="text-xs text-slate-500 mt-2 font-semibold">1970</p>
          </div>
          <div className="text-center">
            <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
              <circle cx="60" cy="60" r="50" fill="#0ea5e9" />
              <path d="M60,60 L60,10 A50,50 0 0,1 103,35 Z" fill="#e11d48" />
              <path d="M60,60 L103,35 A50,50 0 0,1 103,85 Z" fill="#f59e0b" />
              <path d="M60,60 L103,85 A50,50 0 0,1 60,110 Z" fill="#10b981" />
              <path d="M60,60 L60,110 A50,50 0 0,1 17,85 Z" fill="#8b5cf6" />
            </svg>
            <p className="text-xs text-slate-500 mt-2 font-semibold">1990</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" />Adult Fiction</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Biography</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Other Fiction</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Children</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500" />Travel</span>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 overflow-x-auto">
        <div className="text-center text-sm text-slate-500 mb-4">Consumer spending in five countries (2002)</div>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-slate-600">Country</th>
              <th className="border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-600">Food, Drinks & Tobacco</th>
              <th className="border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-600">Clothing & Footwear</th>
              <th className="border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-600">Leisure & Education</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Ireland', '28.91%', '6.43%', '2.21%'],
              ['Italy', '16.36%', '9.00%', '3.20%'],
              ['Spain', '18.80%', '6.51%', '1.98%'],
              ['Sweden', '15.77%', '5.40%', '3.22%'],
              ['Turkey', '32.14%', '6.63%', '4.35%'],
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                {row.map((cell, j) => (
                  <td key={j} className={`border border-slate-200 px-3 py-2 ${j === 0 ? 'font-medium text-slate-700' : 'text-center text-slate-600'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'process') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-center text-sm text-slate-500 mb-4">Cement and concrete production process</div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {[
            { label: 'Limestone & Clay', icon: '🪨' },
            { label: 'Crusher', icon: '⚙️' },
            { label: 'Powder', icon: '📦' },
            { label: 'Mixer', icon: '🔄' },
            { label: 'Rotating Heater', icon: '🔥' },
            { label: 'Grinder', icon: '⚡' },
            { label: 'Cement', icon: '🏗️' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="bg-brand-50 border border-brand-200 rounded-lg px-3 py-2 text-center">
                <div className="text-lg">{step.icon}</div>
                <div className="text-xs text-slate-600 mt-1">{step.label}</div>
              </div>
              {i < 6 && <span className="text-slate-400">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-center items-center gap-2">
          {[
            { label: 'Cement', icon: '🏗️' },
            { label: 'Water', icon: '💧' },
            { label: 'Sand', icon: '🏖️' },
            { label: 'Gravel', icon: '🪨' },
            { label: 'Concrete Mixer', icon: '🔄' },
            { label: 'Concrete', icon: '🧱' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-center">
                <div className="text-lg">{step.icon}</div>
                <div className="text-xs text-slate-600 mt-1">{step.label}</div>
              </div>
              {i < 5 && <span className="text-slate-400">→</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'map') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-center text-sm text-slate-500 mb-4">Seaville coastal town: 1980 vs 2010</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-center mb-2">1980</p>
            <div className="bg-blue-50 rounded-lg p-3 relative h-48 border border-blue-100">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-200 rounded px-2 py-1 text-xs">🏖️ Harbour</div>
              <div className="absolute top-16 left-4 bg-amber-100 rounded px-2 py-1 text-xs border border-amber-200">🏠 Residential</div>
              <div className="absolute top-16 right-4 bg-cyan-100 rounded px-2 py-1 text-xs border border-cyan-200">🐟 Fish Market</div>
              <div className="absolute bottom-8 right-4 bg-slate-100 rounded px-2 py-1 text-xs border border-slate-200">⛵ Boat Storage</div>
              <div className="absolute bottom-8 left-4 bg-orange-100 rounded px-2 py-1 text-xs border border-orange-200">☕ Cafe</div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-center mb-2">2010</p>
            <div className="bg-blue-50 rounded-lg p-3 relative h-48 border border-blue-100">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-200 rounded px-2 py-1 text-xs">🏖️ Harbour</div>
              <div className="absolute top-16 left-4 bg-amber-100 rounded px-2 py-1 text-xs border border-amber-200">🏠 Residential ↑</div>
              <div className="absolute top-16 right-4 bg-purple-100 rounded px-2 py-1 text-xs border border-purple-200">🏨 Hotel</div>
              <div className="absolute bottom-16 right-4 bg-emerald-100 rounded px-2 py-1 text-xs border border-emerald-200">🏊 Pool</div>
              <div className="absolute bottom-4 right-4 bg-slate-100 rounded px-2 py-1 text-xs border border-slate-200">🅿️ Car Park</div>
              <div className="absolute bottom-8 left-4 bg-pink-100 rounded px-2 py-1 text-xs border border-pink-200">🛒 Shopping</div>
              <div className="absolute top-24 left-1/2 bg-green-100 rounded px-2 py-1 text-xs border border-green-200">⛳ Golf</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChartExample;
