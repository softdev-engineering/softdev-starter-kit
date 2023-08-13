import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

const buttonStyles = cva(["btn normal-case"], {
  variants: {
    square: { true: "btn-square" },
    fullWidth: { true: "w-full" },
    active: { true: "btn-active" },
    underline: { true: "underline", false: "no-underline" },
    outline: { true: "btn-outline" },
    appearance: {
      default: "",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      neutral: "btn-neutral",
      ghost: "btn-ghost",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
      link: "btn-link btn-sm text-current px-1",
    },
    size: {
      lg: "btn-lg",
      md: "",
      sm: "btn-sm",
      xs: "btn-xs",
    },
    fontSize: {
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },
    fontWeight: {
      thin: "font-thin",
      "extra-light": "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    fontSize: "md",
    fontWeight: "semibold",
    underline: false,
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonStyles> {
  href?: string;
}

function ButtonComponent(
  {
    href,
    fullWidth,
    square,
    active,
    underline,
    outline,
    appearance,
    size,
    fontSize,
    fontWeight,
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const mappedProps = {
    className: buttonStyles({
      fullWidth,
      square,
      active,
      underline,
      outline,
      appearance,
      size,
      fontSize,
      fontWeight,
    }),
    ...props,
  };
  if (href) return <a href={href} {...mappedProps} />;
  return <button ref={ref} {...mappedProps} />;
}

export const Button = React.forwardRef(ButtonComponent);
