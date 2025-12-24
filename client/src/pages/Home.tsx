import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { api, type InsertWaitlistEntry } from "@shared/routes";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { useToast } from "@/hooks/use-toast";
import { NeonButton } from "@/components/NeonButton";
import { GlassCard } from "@/components/GlassCard";
import { LiveCounter } from "@/components/LiveCounter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  GitBranch, 
  Server,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";
import logoImg from "@assets/ChatGPT_Image_Dec_24,_2025,_11_42_32_PM_1766600809407.png";

export default function Home() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: { email: "" }
  });

  const joinMutation = useJoinWaitlist();

  const onSubmit = (data: InsertWaitlistEntry) => {
    joinMutation.mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
        });
        toast({
          title: "Welcome aboard! 🚀",
          description: "You've been added to the priority waitlist.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <img src={logoImg} alt="DockMind Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">DockMind</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#about" className="hover:text-primary transition-colors">Manifesto</a>
        </div>
        <NeonButton 
          variant="secondary" 
          className="px-4 py-2 text-sm hidden sm:inline-flex h-10"
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Early Access
        </NeonButton>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 text-center overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono tracking-wider backdrop-blur-sm"
            >
              v1.0 BETA COMING SOON
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8"
            >
              Automate Everything.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-secondary text-glow">
                Sleep More.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              The AI-powered DevOps engineer that never sleeps. Deploy, scale, and monitor your infrastructure with simple conversation.
            </motion.p>

            {/* Waitlist Form Area */}
            <div id="waitlist" className="max-w-md mx-auto relative mb-24">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 animate-pulse" />
              <div className="relative glass-panel rounded-xl p-2">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                      <p className="text-muted-foreground">Keep an eye on your inbox. We'll notify you when your spot opens up.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        {...form.register("email")}
                        placeholder="enter@your.email"
                        className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                        disabled={joinMutation.isPending}
                      />
                      <NeonButton 
                        type="submit" 
                        isLoading={joinMutation.isPending}
                        className="px-6 py-3 whitespace-nowrap text-base"
                      >
                        Join Waitlist
                      </NeonButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              {form.formState.errors.email && (
                <p className="absolute -bottom-6 left-0 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LiveCounter />
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section id="features" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard delay={0.1}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Natural Language CI/CD</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Just tell DockMind what you need. "Deploy staging to production and rollback if latency spikes." It handles the rest.
                </p>
              </GlassCard>

              <GlassCard delay={0.2}>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent border border-accent/20">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Zero-Config Pipelines</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Forget YAML hell. DockMind analyzes your repo and auto-generates optimized Dockerfiles and Kubernetes manifests.
                </p>
              </GlassCard>

              <GlassCard delay={0.3}>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 text-secondary border border-secondary/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Self-Healing Infra</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proactive monitoring that doesn't just alert you—it fixes issues before your users even notice downtime.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Code Snippet / Terminal Section */}
        <section className="py-24 px-4 bg-black/20 relative border-y border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Your entire stack, <br/>
                <span className="text-primary">controlled by voice.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Stop wrestling with AWS consoles and Terraform state files. DockMind abstracts the complexity so you can focus on shipping code.
              </p>
              <ul className="space-y-4">
                {[
                  "Automatic containerization strategies",
                  "Cost optimization suggestions",
                  "Security vulnerability patching",
                  "Multi-cloud deployment orchestration"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      <Rocket className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl font-mono text-sm relative group">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="ml-4 text-xs text-white/30">dockmind-cli — bash</div>
                </div>
                
                {/* Terminal Body */}
                <div className="p-6 space-y-4 text-gray-300">
                  <div className="flex gap-2">
                    <span className="text-primary">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white typing-effect">dockmind deploy --prod</span>
                  </div>
                  <div className="space-y-1 text-white/70 animate-pulse">
                    <div>Analyzing repository structure... <span className="text-green-400">Done</span></div>
                    <div>Detecting Node.js v18 + PostgreSQL... <span className="text-green-400">Done</span></div>
                    <div>Building Docker image... <span className="text-green-400">Done (2.1s)</span></div>
                    <div>Pushing to registry... <span className="text-green-400">Done</span></div>
                    <div className="text-white mt-2">
                      <span className="text-green-400">✔</span> Deployment successful!
                    </div>
                    <div className="text-white/50 text-xs mt-1">
                      Live at: <span className="underline decoration-primary/50 text-primary cursor-pointer hover:text-primary/80">https://api.dockmind.dev</span>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect behind terminal */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Ready to automate the boring stuff?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NeonButton onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                Join the Waitlist
              </NeonButton>
              <a 
                href="mailto:founders@dockmind.dev" 
                className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 px-6 py-3"
              >
                Contact Founders <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 DockMind Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
