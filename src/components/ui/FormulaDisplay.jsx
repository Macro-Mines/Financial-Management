export default function FormulaDisplay({ title, formula, variables }) {
  return (
    <div className="mb-6">
      {title && <h4 className="text-sand-200 font-[var(--font-heading)] text-lg mb-3 tracking-wide">{title}</h4>}
      <div className="formula-box">
        <div className="text-lg mb-3">{formula}</div>
        {variables && variables.length > 0 && (
          <div className="mt-3 pt-3 border-t border-sand-800/20 space-y-1">
            <p className="text-xs text-dune-400 uppercase tracking-wider mb-2">Where:</p>
            {variables.map((v, i) => (
              <p key={i} className="text-sm text-dune-300">
                <span className="text-gold-light font-mono">{v.symbol}</span> = {v.description}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
