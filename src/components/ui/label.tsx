import * as React from "react";

type LabelProps = React.ComponentPropsWithoutRef<"label"> & {
  disabled?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", disabled = false, ...props }, ref) => (
    <label
      ref={ref}
      className={
        "text-sm font-medium leading-none " +
        (disabled ? "opacity-70 cursor-not-allowed " : "") +
        className
      }
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
