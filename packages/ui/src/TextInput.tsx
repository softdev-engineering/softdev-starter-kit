import { VariantProps, cva } from "class-variance-authority";

const textareaStyles = cva(["input text-base input-bordered"], {
  variants: {},
});

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof textareaStyles> {}

export function TextInput({ ...props }: TextInputProps) {
  return <input type="text" className={textareaStyles({})} {...props} />;
}
