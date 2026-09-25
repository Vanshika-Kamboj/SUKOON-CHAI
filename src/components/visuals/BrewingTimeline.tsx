import React, { useState } from 'react';
import { Sparkles, Flame, Clock, Heart, Play, Pause, RotateCcw } from 'lucide-react';

interface Step {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  defaultSeconds: number;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Choose Your Tea',
    subtitle: 'Listen to what your soul needs right now',
    description: 'Whether it is the grounding strength of Assam Masala Chai for a chilly afternoon or the floral calm of Pushkar Rose to unwind.',
    tip: 'Tip: 1 generous teaspoon (2.5g) per cup is the golden ratio.',
    defaultSeconds: 30,
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Brew Slowly',
    subtitle: 'Give the water and spices permission to mingle',
    description: 'Bring water to a rolling boil. Let whole crushed spices bloom before adding milk. Allow the brew to rise twice gently on low flame.',
    tip: 'Tip: Low simmer unlocks the deepest sweetness without bitterness.',
    defaultSeconds: 240, // 4 mins
    icon: Flame,
  },
  {
    step: '03',
    title: 'Take a Pause',
    subtitle: 'Close your eyes as steam ascends',
    description: 'Strain the warm amber chai into your favorite cup. Before your first sip, place both hands around the cup and inhale the cardamom mist.',
    tip: 'Tip: Feel the warmth seep into your palms; let your breath slow.',
    defaultSeconds: 60,
    icon: Clock,
  },
  {
    step: '04',
    title: 'Sip Your Sukoon',
    subtitle: 'More than a tea. It’s a feeling.',
    description: 'Taste the layered notes—sweet malt, warm ginger, fragrant cardamom. Everything else can wait. You are here, now.',
    tip: 'Tip: Sip slowly. Repeat whenever the world feels too fast.',
    defaultSeconds: 300,
    icon: Heart,
  },
];

export const BrewingTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(STEPS[1].defaultSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Simple step timer
  React.useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setTimerSeconds(STEPS[index].defaultSeconds);
    setIsTimerRunning(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Step Indicators with connecting line */}
      <div className="relative mb-12">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-[#E7D5BA] -translate-y-1/2 z-0" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {STEPS.map((s, index) => {
            const isCurrent = activeStep === index;
            const isCompleted = activeStep > index;

            return (
              <button
                key={s.step}
                onClick={() => handleStepClick(index)}
                className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-[#3E2A20] text-[#FFF9F0] border-[#3E2A20] shadow-md scale-102'
                    : isCompleted
                    ? 'bg-[#F3E8D5] text-[#3E2A20] border-[#E7D5BA]'
                    : 'bg-[#FFFDF9] text-[#3E2A20] border-[#E7D5BA] hover:bg-[#F3E8D5]/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-serif font-bold text-sm transition-colors ${
                    isCurrent
                      ? 'bg-[#B96F4A] text-white'
                      : isCompleted
                      ? 'bg-[#7B8665] text-white'
                      : 'bg-[#E7D5BA] text-[#3E2A20]'
                  }`}
                >
                  {s.step}
                </div>
                <h4 className="font-serif text-base font-semibold mb-1">
                  {s.title}
                </h4>
                <p className={`text-xs ${isCurrent ? 'text-[#E7D5BA]' : 'text-[#3E2A20]/60'}`}>
                  {s.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Showcase Card with Interactive Brew Timer */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#B96F4A]">
              {STEPS[activeStep].step}
            </span>
            <div className="h-6 w-px bg-[#E7D5BA]" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
              {STEPS[activeStep].title}
            </h3>
          </div>

          <p className="text-base text-[#3E2A20]/90 leading-relaxed font-light">
            {STEPS[activeStep].description}
          </p>

          <div className="p-3.5 bg-[#F3E8D5]/60 rounded-xl border border-[#E7D5BA] text-xs sm:text-sm text-[#3E2A20]/80 italic">
            {STEPS[activeStep].tip}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-[#E7D5BA] text-[#3E2A20] hover:bg-[#E7D5BA]/40 disabled:opacity-40 transition-colors"
            >
              Previous Step
            </button>
            <button
              onClick={() => handleStepClick(Math.min(STEPS.length - 1, activeStep + 1))}
              disabled={activeStep === STEPS.length - 1}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#3E2A20] text-white hover:bg-[#52382c] disabled:opacity-40 transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Step Companion: Interactive Meditative Brew Timer */}
        <div className="w-full md:w-72 bg-[#F3E8D5]/40 border border-[#E7D5BA] rounded-xl p-6 flex flex-col items-center text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#B96F4A] font-semibold mb-1">
            Chai Meditation Timer
          </span>
          <div className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2A20] tracking-tight my-2 font-mono tabular-nums">
            {formatTimer(timerSeconds)}
          </div>
          <p className="text-xs text-[#3E2A20]/70 mb-4">
            {timerSeconds === 0 ? 'Your cup is ready for sukoon!' : 'Breathe with the rising steam.'}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-4 py-2 bg-[#B96F4A] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-[#a05c3b] transition-colors shadow-sm"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Start
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(STEPS[activeStep].defaultSeconds);
              }}
              className="p-2 border border-[#E7D5BA] bg-white rounded-lg text-[#3E2A20] hover:bg-[#F3E8D5] transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
