import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Mic,
  Volume2,
  CheckCircle2,
  ChevronRight,
  Layers,
  ThermometerSnowflake
} from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface HeroInteractiveProps {
  onExploreMarketplace: () => void;
  onExploreLogistics: () => void;
  onExploreStory: () => void;
  selectedLanguage: string;
}

export const HeroInteractive: React.FC<HeroInteractiveProps> = ({
  onExploreMarketplace,
  onExploreLogistics,
  onExploreStory,
  selectedLanguage
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResult, setVoiceResult] = useState<string | null>(null);

  const t = getTranslation(selectedLanguage);

  // Particle bio-mesh canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: 'farmer' | 'silo' | 'buyer' | 'transit';
    }> = [];

    const nodeCount = Math.min(45, Math.floor(width / 25));
    for (let i = 0; i < nodeCount; i++) {
      const types: ('farmer' | 'silo' | 'buyer' | 'transit')[] = ['farmer', 'silo', 'buyer', 'transit'];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with glowing green/cyan lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.type === 'farmer') ctx.fillStyle = '#00ff87';
        else if (node.type === 'silo') ctx.fillStyle = '#00f0ff';
        else if (node.type === 'buyer') ctx.fillStyle = '#fbbf24';
        else ctx.fillStyle = '#10b981';

        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Voice assistant simulated queries with multi-lingual responses
  const handleSimulateVoice = (queryText: string) => {
    setVoiceActive(true);
    setVoiceQuery(queryText);
    setVoiceResult(null);

    setTimeout(() => {
      setVoiceActive(false);
      if (selectedLanguage === 'te') {
        if (queryText.includes('టమాటా') || queryText.includes('ధర') || queryText.includes('Tomato')) {
          setVoiceResult('AI సిగ్నల్: నాసిక్ టమాటా ఫార్మ్-గేట్ ధర ₹22/కేజీ. కోలార్ APMC ధర ₹18.5/కేజీ. అదానీ రీఫర్ ద్వారా రవాణాకు 1,200 కేజీలు సిద్ధంగా ఉన్నాయి.');
        } else {
          setVoiceResult('కిసాన్ సభ పూల్ లభించింది: డిండోరి PACS బొలెరో మ్యాక్సీ ట్రక్ 3:30 PMకి బయలుదేరుతుంది. రేటు: ₹1.65/కేజీ (51.5% ఆదా).');
        }
      } else if (selectedLanguage === 'hi') {
        if (queryText.includes('टमाटर') || queryText.includes('Tomato')) {
          setVoiceResult('AI सिग्नल: नासिक टमाटर फार्म-गेट भाव ₹22/किग्रा है। कोलार APMC भाव ₹18.5 है। 1,200 किग्रा ग्रेड A+ अडानी रीफर में प्रस्थान के लिए तैयार है।');
        } else {
          setVoiceResult('किसान सभा पूल मिला: दिंडोरी PACS बोलेरो मैक्सी ट्रक में 350 किग्रा जगह उपलब्ध है। भाड़ा: ₹1.65/किग्रा (51% बचत)।');
        }
      } else {
        if (queryText.includes('Tomato') || queryText.includes('Price') || queryText.includes('rate')) {
          setVoiceResult('AI Signal: Nashik Tomato farm-gate price benchmark is ₹22/kg. Kolar APMC is ₹18.5/kg. 1,200kg Grade A+ ready for dispatch in Adani Reefer.');
        } else {
          setVoiceResult('Kisan Sabha Pool Found: Dindori PACS Bolero Maxi Truck has 350kg capacity available at 3:30 PM. Cost: ₹1.65/kg (51% freight savings).');
        }
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#020503] via-[#040c07] to-[#020503] pt-12 pb-20">
      {/* Background Interactive Bio-Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
      />

      {/* Cybernetic Grid & Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,135,0.15)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.tag}</span>
        </div>

        {/* Main Hero Typography */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
            {t.title1}{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,255,135,0.3)]">
              {t.title2}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {t.sub}
          </p>
        </div>

        {/* Vernacular Voice Assistant Bar Simulation */}
        <div className="mt-8 max-w-2xl">
          <div className="astra-glass p-3 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              <button
                onClick={() => handleSimulateVoice(selectedLanguage === 'te' ? 'టమాటా ధర ఎంత?' : 'टमाटर का मंडी भाव दिखाओ')}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  voiceActive
                    ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 cursor-pointer'
                }`}
                title="Tap to trigger Vernacular Voice Assistant"
              >
                <Mic className="w-5 h-5" />
              </button>
              <div className="flex-1 text-xs">
                <div className="text-slate-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>AI Vernacular Voice Core</span>
                  {voiceActive && <span className="text-emerald-400 font-bold animate-pulse">• {t.voiceListening}</span>}
                </div>
                <div className="text-slate-200 truncate mt-0.5">
                  {voiceQuery || t.voicePrompt}
                </div>
              </div>
            </div>

            {/* Quick Sample Voice Prompts */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => handleSimulateVoice(selectedLanguage === 'te' ? 'టమాటా రేటు ఎంత?' : selectedLanguage === 'hi' ? 'टमाटर का रेट क्या है?' : 'Tomato price today')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-[11px] font-mono text-emerald-300 border border-white/10 shrink-0 transition-all cursor-pointer"
              >
                {selectedLanguage === 'te' ? '🍅 టమాటా రేటు' : selectedLanguage === 'hi' ? '🍅 टमाटर रेट' : '🍅 Tomato Price'}
              </button>
              <button
                onClick={() => handleSimulateVoice(selectedLanguage === 'te' ? 'కిసాన్ సభ ట్రక్ బుక్ చేయండి' : selectedLanguage === 'hi' ? 'किसान सभा ट्रक बुक करो' : 'Book Kisan Sabha Pool')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-[11px] font-mono text-cyan-300 border border-white/10 shrink-0 transition-all cursor-pointer"
              >
                {selectedLanguage === 'te' ? '🚚 కిసాన్ సభ పూల్' : selectedLanguage === 'hi' ? '🚚 किसान सभा पूल' : '🚚 Kisan Sabha Pool'}
              </button>
            </div>
          </div>

          {/* Voice Engine Response Pop-up */}
          {voiceResult && (
            <div className="mt-2.5 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{voiceResult}</div>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreMarketplace}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_30px_rgba(0,255,135,0.4)] transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>{t.btnOpenMarket}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreLogistics}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-[#0a1b12]/80 hover:bg-[#0e271a] border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-lg cursor-pointer"
          >
            <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
            <span>{t.btnLogistics}</span>
          </button>

          <button
            onClick={onExploreStory}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>{t.btnWhyFarmlink}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry HUD Metrics Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="astra-glass-card p-5 rounded-2xl hover:border-emerald-400/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span>METRIC {idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400/80 group-hover:animate-ping" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-display">
                {metric.val}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-200">
                {metric.label}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {metric.desc}
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>{metric.subtext}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
