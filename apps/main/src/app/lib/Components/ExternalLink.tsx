import React from "react";

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

// packages/ui (SocialsButtonsRow) imports this file directly, so it stays here.
const ExternalLink = ({ children, href, ...props }: ExternalLinkProps) => {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
