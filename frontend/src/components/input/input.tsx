import { ChangeEvent, ReactNode, Ref, forwardRef } from "react";
import { FaUnlockAlt as LockIcon } from "react-icons/fa";
import { Input, InputProps } from "@nextui-org/input";
import React from "react";

interface InputProperties extends InputProps {
  variant?: "bordered" | "faded" | "flat" | "underlined";
  size?: "sm" | "md" | "lg";
  name?: string;
  error?: string;
  maxLength?: number;
  ref?: Ref<HTMLInputElement>;
  required?: boolean;
  autoFocus?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  endContent?: ReactNode;
  startContent?: ReactNode;
  value?: string;
  initialValue?: string;
  onChange?: (arg0: ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (arg: any) => any;
}

const input = forwardRef<HTMLInputElement, InputProperties>(
  (
    {
      label,
      name,
      variant,
      placeholder,
      description,
      size,
      type,
      required,
      readonly,
      disabled,
      className,
      style,
      error,
      onChange,
      value,
      initialValue,
      maxLength = 100,
      endContent,
      autoFocus,
      startContent,
      ...restOfProps
    },
    ref
  ) => {
    let props: { type: string; endContent: ReactNode } = {
      type: "",
      endContent: null,
    };
    const classIcon = "fill-gray-500 ";

    return (
      <Input
        ref={ref}
        isInvalid={error ? true : false}
        name={name}
        aria-label={placeholder || name || ""}
        className={`${className}`}
        style={style}
        size={size}
        isDisabled={disabled}
        isRequired={required}
        readOnly={readonly}
        type={props.type}
        variant={variant || "bordered"}
        label={label}
        description={description}
        placeholder={placeholder}
        errorMessage={error}
        endContent={endContent || props.endContent}
        startContent={
          startContent ||
          (type === "url" && <p className="text-sm text-gray-500">https://</p>)
        }
        onChange={onChange}
        value={value}
        min={0}
        maxLength={maxLength}
        defaultValue={initialValue}
        autoFocus={autoFocus}
        {...restOfProps}
      />
    );
  }
);
export default input;
