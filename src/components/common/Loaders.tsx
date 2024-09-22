import { Loader2 } from "lucide-react";

export const Loading = () => {
  return <Loader2 className="h-4 w-4 animate-spin" />;
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg">
      <Loader2 className="h-12 w-12 animate-spin text-main" />
    </div>
  );
};
