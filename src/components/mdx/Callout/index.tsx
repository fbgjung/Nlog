import { ReactNode } from "react";
import { CalloutIcons } from "./Icon";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "default";
  children: ReactNode;
}

const styles = {
  info: "bg-blue-100 border-none font-semibold",
  warning: "bg-yellow-50 border-yellow-200 font-semibold",
  success: "bg-green-50 border-green-200 font-semibold",
  error: "bg-red-50 border-red-200 font-semibold",
  default: "border-gray-600",
};

export function Callout({ type = "default", children }: CalloutProps) {
  const Icon = CalloutIcons[type];

  return (
    <div className={`px-8 my-2 rounded-lg border ${styles[type]}`}>
      <div className="flex items-center gap-4">
        <Icon className={`h-5 w-5 flex-shrink-0 ${
          type === 'info' ? 'text-blue-600' :
          type === 'warning' ? 'text-yellow-600' :
          type === 'success' ? 'text-green-600' :
          type === 'error' ? 'text-red-600' :
          'text-blue-400'
        }`} />
        <div>{children}</div>
      </div>
    </div>
  );
}
