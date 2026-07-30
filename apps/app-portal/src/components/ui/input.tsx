/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-heather bg-white px-3 py-2 text-sm placeholder:text-charcoalFogLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export { Input };
