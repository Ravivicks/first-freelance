import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loader;
