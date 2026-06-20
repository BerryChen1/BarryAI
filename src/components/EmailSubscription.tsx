import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';

interface EmailSubscriptionProps {
  id?: string;
  placeholder?: string;
}

export function EmailSubscription({ id, placeholder = "Enter your email address..." }: EmailSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate real network request with 1.2s delay
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you! You have successfully subscribed to Mindloop.');
      setEmail('');
    }, 1200);
  };

  return (
    <div id={id} className="w-full max-w-lg mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="liquid-glass rounded-full p-2.5 flex items-center gap-2 relative z-10 transition-all duration-300 focus-within:ring-1 focus-within:ring-white/30"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          disabled={status === 'loading'}
          placeholder={placeholder}
          className="bg-transparent text-foreground flex-1 px-4 py-2.5 md:py-3 text-sm focus:outline-none placeholder:text-muted-foreground/60 w-full"
          required
        />
        
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={status === 'loading' ? {} : { scale: 1.03 }}
          whileTap={status === 'loading' ? {} : { scale: 0.98 }}
          className="bg-foreground text-background text-xs md:text-sm font-semibold tracking-wider rounded-full px-6 md:px-8 py-3 shrink-0 flex items-center justify-center gap-1 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin text-background" />
          ) : (
            <>
              SUBSCRIBE
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 border border-white/10 text-emerald-400 text-sm md:text-base font-light"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <span>{message}</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 px-6 py-3 rounded-xl bg-red-950/40 border border-red-500/25 text-red-300 text-xs md:text-sm font-light text-left"
          >
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
