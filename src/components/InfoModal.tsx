import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'how-it-works' | 'philosophy' | 'use-cases';
}

export function InfoModal({ isOpen, onClose, title, type }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-crosshair"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5 border-b border-white/5 bg-neutral-900/40">
              <h3 className="font-serif italic text-xl sm:text-2xl text-foreground font-normal select-none">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-white/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-5 sm:px-8 py-5 sm:py-7 text-sm leading-relaxed max-h-[70vh] overflow-y-auto font-sans">
              {type === 'how-it-works' && (
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    Mindloop is engineered to replace distracting content feeds with targeted curated updates sent directly to your screen and inbox.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center text-xs font-mono shrink-0 select-none">
                        01
                      </div>
                      <div>
                        <h4 className="text-foreground font-medium mb-1">Create Your Loop</h4>
                        <p className="text-xs">Specify your research topics, technological domains, and publications of interest to form a personal sub-loop.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center text-xs font-mono shrink-0 select-none">
                        02
                      </div>
                      <div>
                        <h4 className="text-foreground font-medium mb-1">Semantic Ingestion</h4>
                        <p className="text-xs">Our platform ingests deep-form text, filtering out clickbait formats, and formats them for minimalist reading.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center text-xs font-mono shrink-0 select-none">
                        03
                      </div>
                      <div>
                        <h4 className="text-foreground font-medium mb-1">Intelligent Delivery</h4>
                        <p className="text-xs">Subscribers receive weekly high-signal digest summaries and rich interactive views without modern notification patterns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'philosophy' && (
                <div className="space-y-5 text-muted-foreground font-light">
                  <p className="text-foreground italic font-serif text-lg leading-snug">
                    "Information wants to be deep, not infinite. It wants to reside in quiet spaces, not volatile feeds."
                  </p>
                  <p>
                    Modern research metrics show that typical content models capitalize on hyper-short attention spans and variable reward cycles. Search has migrated from logical directories to frantic algorithms.
                  </p>
                  <p>
                    Mindloop is our counter-initiative. We believe in visual quietness, typographical honesty, and the elimination of decorative features. By utilizing a pure dark monochrome design, your eyes rest while your mind focus.
                  </p>
                  <p>
                    No tracking scores, no gamification badges, no blue-tinted visual triggers. Just essential insights delivered within a clean framework.
                  </p>
                </div>
              )}

              {type === 'use-cases' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/30">
                      <span className="text-xs font-mono text-muted-foreground block mb-2">01 / DISCOVERY</span>
                      <h4 className="text-foreground text-sm font-semibold mb-1">Independent Researchers</h4>
                      <p className="text-muted-foreground text-xs leading-normal">
                        Monitor advances in AI tooling and engineering standards without diving into forum commentary.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/30">
                      <span className="text-xs font-mono text-muted-foreground block mb-2">02 / INTERFACE</span>
                      <h4 className="text-foreground text-sm font-semibold mb-1">Tech Founders</h4>
                      <p className="text-muted-foreground text-xs leading-normal">
                        Maintain high context awareness of structural market changes before initiating strategic developments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/30 font-sans">
                      <span className="text-xs font-mono text-muted-foreground block mb-2">03 / CREATION</span>
                      <h4 className="text-foreground text-sm font-semibold mb-1">Digital Publishers</h4>
                      <p className="text-muted-foreground text-xs leading-normal">
                        Build customized, high-density reading platforms for your subscription loop.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/30">
                      <span className="text-xs font-mono text-muted-foreground block mb-2">04 / ARCHIVE</span>
                      <h4 className="text-foreground text-sm font-semibold mb-1">Curators & Scholars</h4>
                      <p className="text-muted-foreground text-xs leading-normal">
                        Archive structural essays and build community around high-intent discussions.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-white/5 bg-neutral-900/40 flex justify-end">
              <button
                onClick={onClose}
                className="bg-foreground text-background font-semibold text-xs py-2 px-6 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
