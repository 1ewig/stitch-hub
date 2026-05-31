import React from "react";
import Card from "../ui/Card";
import LinearProgress from "../ui/LinearProgress";
import { Sparkles, Trophy, Award } from "lucide-react";

export const LineLeaderboard = () => {
  const teams = [
    {
      name: "Rereded",
      score: 85,
      colorClass: "bg-primary-500",
      rank: 1
    },
    {
      name: "Manngesing",
      score: 76,
      colorClass: "bg-amber-500",
      rank: 3
    },
    {
      name: "Response rate",
      score: 84,
      colorClass: "bg-sky-500",
      rank: 2
    }
  ];

  return (
    <section id="stitchhub-leaderboard" aria-labelledby="leaderboard-heading" className="space-y-4">
      <div>
        <h3 id="leaderboard-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-display">
          Team Leaderboard
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">
          Cell production output rate standings
        </p>
      </div>

      <Card className="p-5 space-y-5">
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.name} className="space-y-1.5 group">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-500 leading-none">
                    #{team.rank}
                  </span>
                  <span className="font-bold text-neutral-800 tracking-tight leading-none group-hover:text-primary-600 transition-colors">
                    {team.name}
                  </span>
                </div>
                <span className="font-extrabold text-neutral-900 leading-none">
                  {team.score}%
                </span>
              </div>

              <LinearProgress
                value={team.score}
                colorClass={team.colorClass}
                height={8}
              />
            </div>
          ))}
        </div>

        {/* Footer goal quota callout widget */}
        <div className="bg-primary-50/50 border border-primary-100 rounded-lg p-3.5 flex gap-3 relative overflow-hidden group">
          {/* Subtle light ambient glow */}
          <span className="absolute top-0 right-0 w-24 h-24 bg-primary-100/30 rounded-full blur-xl transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-480" />

          <div className="p-2 h-9 w-9 bg-primary-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 leading-none">
              Goal Tracker
            </p>
            <p className="text-xs font-bold text-neutral-900 mt-1 leading-none">
              Monthly Quota
            </p>
            <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-medium">
              Double down on Sas5 leads this week. Make active outreach a priority.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default LineLeaderboard;
