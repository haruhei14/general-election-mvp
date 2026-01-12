import { cn } from '@/lib/utils';

type AdSenseProps = {
    className?: string;
    type?: 'banner' | 'responsive' | 'mid';
};

export function AdSense({ className, type = 'responsive' }: AdSenseProps) {
    const heightClass = {
        banner: 'h-24',
        responsive: 'h-64',
        mid: 'h-32',
    }[type];

    return (
        <div
            className={cn(
                "w-full bg-slate-200/50 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 overflow-hidden",
                heightClass,
                className
            )}
        >
            <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Advertisement</span>
            <span className="text-sm font-medium">スポンサーリンク</span>

            {/* Simulation of a real ad unit */}
            <div className="mt-2 w-4/5 h-1/2 bg-slate-300/30 rounded-md border border-slate-300/50 flex items-center justify-center italic text-xs">
                Google AdSense Placeholder ({type})
            </div>
        </div>
    );
}
