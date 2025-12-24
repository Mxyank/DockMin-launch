import CountUp from "react-countup";
import { useWaitlistCount } from "@/hooks/use-waitlist";

export function LiveCounter() {
  const { data } = useWaitlistCount();
  const count = data?.count ?? 0;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-sm font-mono text-primary/80 mb-2 uppercase tracking-[0.2em] flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        Live Waitlist Count
      </div>
      <div className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
        <CountUp end={count} duration={2.5} separator="," />
      </div>
      <p className="text-muted-foreground mt-4 text-lg md:text-xl text-center max-w-md">
        developers already queued to automate their deployment workflow.
      </p>
    </div>
  );
}
