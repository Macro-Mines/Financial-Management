import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CalculatorLayout({ title, description, inputs, onCalculate, results, children }) {
  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-xl font-[var(--font-heading)] text-gold mb-2 tracking-wide">{title}</h3>
      {description && <p className="text-dune-300 text-sm mb-6">{description}</p>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          {inputs.map((input, idx) => (
            <div key={idx}>
              <label className="block text-sm text-sand-300 mb-1.5 tracking-wide">
                {input.label}
                {input.unit && <span className="text-dune-400 ml-1">({input.unit})</span>}
              </label>
              {input.type === 'cashflows' ? (
                <div>
                  {children}
                </div>
              ) : (
                <input
                  type="number"
                  value={input.value}
                  onChange={(e) => input.onChange(e.target.value)}
                  placeholder={input.placeholder || ''}
                  className="calc-input"
                  step={input.step || 'any'}
                  min={input.min}
                />
              )}
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCalculate}
            className="btn-primary w-full mt-4 justify-center"
          >
            Calculate
          </motion.button>
        </div>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-display"
          >
            <h4 className="text-sm text-dune-400 uppercase tracking-wider mb-4 font-[var(--font-heading)]">Results</h4>
            <div className="space-y-4">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-sand-800/10 last:border-0">
                  <span className="text-sand-300 text-sm">{result.label}</span>
                  <span className={`text-lg font-bold font-mono ${
                    result.highlight === 'positive' ? 'text-green-400' :
                    result.highlight === 'negative' ? 'text-red-400' :
                    'text-gold'
                  }`}>
                    {result.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
