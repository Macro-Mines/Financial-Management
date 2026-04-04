import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz({ questions, moduleTitle }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const current = questions[currentQ];

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === current.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 text-center max-w-lg mx-auto"
      >
        <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 50 ? '📈' : '📚'}</div>
        <h3 className="text-2xl font-[var(--font-heading)] text-sand-100 mb-2">Quiz Complete!</h3>
        <p className="text-dune-300 mb-6">{moduleTitle}</p>
        <div className="text-5xl font-bold text-gold mb-2">{percentage}%</div>
        <p className="text-sand-300 mb-8">
          You scored {score} out of {questions.length}
        </p>
        <button onClick={handleRestart} className="btn-primary">
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-dune-300">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-sm text-gold">Score: {score}/{currentQ + (answered ? 1 : 0)}</span>
      </div>
      <div className="w-full h-1.5 bg-dune-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full"
          animate={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question */}
          <h3 className="text-xl text-sand-100 mb-6 leading-relaxed">
            {current.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {current.options.map((option, idx) => {
              let classes = 'quiz-option';
              if (answered) {
                if (idx === current.correct) classes += ' correct';
                else if (idx === selected) classes += ' incorrect';
              } else if (idx === selected) {
                classes += ' selected';
              }
              return (
                <motion.button
                  key={idx}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(idx)}
                  className={`${classes} w-full text-left flex items-center gap-3`}
                  disabled={answered}
                >
                  <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className={`p-4 rounded-xl border ${
                  selected === current.correct
                    ? 'bg-green-900/10 border-green-500/20'
                    : 'bg-red-900/10 border-red-500/20'
                }`}>
                  <p className="text-sm font-medium mb-1 text-sand-200">
                    {selected === current.correct ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-sm text-dune-300">{current.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {answered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <button onClick={handleNext} className="btn-primary">
                {currentQ < questions.length - 1 ? 'Next Question →' : 'View Results'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
