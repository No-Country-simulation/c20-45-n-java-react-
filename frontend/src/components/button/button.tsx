import { Button, ButtonProps } from "@nextui-org/button";
import { ReactNode, forwardRef } from "react";

interface ButtonProperties extends ButtonProps {
  children?: ReactNode;
  loading?: boolean;
  onClick?: (arg: any) => void;
}
const button = forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      children,
      loading,
      isLoading,
      disabled,
      isDisabled,
      startContent,
      ...restOfProps
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        isDisabled={disabled || isDisabled}
        isLoading={isLoading || loading}
        startContent={isLoading || loading ? undefined : startContent}
        {...restOfProps}
      >
        {children}
      </Button>
    );
  }
);
export default button;
