import React from "react";
import { useOrderStore } from "../../store/useOrderStore";
import Card from "../ui/Card";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

export const StitchAlerts = () => {
  const { activeAlerts, dismissAlert } = useOrderStore();

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50 hover:bg-red-100/70 border-red-100",
          text: "text-red-800",
          icon: AlertCircle,
          iconColor: "text-red-500 bg-red-100/50"
        };
      case "warning":
        return {
          bg: "bg-amber-50 hover:bg-amber-100/70 border-amber-100",
          text: "text-amber-800",
          icon: AlertTriangle,
          iconColor: "text-amber-500 bg-amber-100/50"
        };
      default:
        return {
          bg: "bg-primary-50 hover:bg-primary-100/70 border-primary-100",
          text: "text-primary-800",
          icon: Info,
          iconColor: "text-primary-500 bg-primary-100/50"
        };
    }
  };

  return (
    <section id="stitchhub-alerts" aria-labelledby="alerts-heading" className="space-y-4">
      <div>
        <h3 id="alerts-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-display">
          AI Smart Alerts
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">
          Real-time quality checks and follow-up warnings.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm p-4">
        {activeAlerts.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-400 font-medium">
            All systems normal. No active alerts.
          </div>
        ) : (
          <ul className="space-y-3">
            {activeAlerts.map((alert) => {
              const styles = getAlertStyles(alert.severity);
              const Icon = styles.icon;

              return (
                <li
                  key={alert.alertId}
                  className="transition-all duration-260 animate-fade-in-up"
                >
                  <div
                    className={cn(
                      "flex items-start justify-between p-3.5 border rounded-lg transition-colors",
                      styles.bg
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn("p-2 rounded-full flex-shrink-0 flex items-center justify-center h-9 w-9", styles.iconColor)}>
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <div>
                        <p className={cn("text-xs font-semibold uppercase tracking-wider", styles.text)}>
                          {alert.severity} priority alert
                        </p>
                        <p className="text-xs font-bold text-neutral-900 mt-1 capitalize">
                          {alert.message}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-1 font-medium leading-none">
                          {alert.timeElapsed}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => dismissAlert(alert.alertId)}
                      className="p-1 rounded-full hover:bg-black/5 text-neutral-400 hover:text-neutral-700 transition-colors"
                      aria-label={`Dismiss alert ${alert.alertId}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default StitchAlerts;
