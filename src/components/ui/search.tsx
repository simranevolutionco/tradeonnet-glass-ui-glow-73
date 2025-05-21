
import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  iconClassName?: string;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, iconClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <SearchIcon className={cn("absolute left-3 top-2.5 h-4 w-4 text-muted-foreground", iconClassName)} />
        <Input 
          ref={ref} 
          className="pl-10" 
          {...props} 
        />
      </div>
    );
  }
);
Search.displayName = "Search";

export { Search };
