import NextLink from 'next/link';
import { Button, ButtonProps } from 'ui';

interface LinkProps extends ButtonProps {
  href: string;
}

export function Link({ appearance, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button appearance={appearance || 'link'} {...props} />
    </NextLink>
  );
}
