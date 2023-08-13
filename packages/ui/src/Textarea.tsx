import { VariantProps, cva } from "class-variance-authority";

const textareaStyles = cva(["textarea textarea-bordered text-base"], {
  variants: {},
});

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaStyles> {}

export function Textarea({ ...props }: TextareaProps) {
  return <textarea className={textareaStyles({})} {...props} />;
}
