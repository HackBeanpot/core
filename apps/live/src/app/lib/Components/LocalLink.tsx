import { Url } from "next/dist/shared/lib/router/router";
import Link, { LinkProps } from "next/link";
import React from "react";

const isExternalLink = (href: Url) => {
  const externalUrlregex =
    /^(https?:\/\/)([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,5}(:[0-9]{2,5})?(\/[^\s]*)?$/;

  if (typeof href === "string") {
    return externalUrlregex.test(href);
  }
  return href.href ? externalUrlregex.test(href.href) : true;
};

type LocalLinkProps = LinkProps & React.HTMLAttributes<HTMLAnchorElement>;

const LocalLink = ({ children, href, ...props }: LocalLinkProps) => {
  if (isExternalLink(href)) {
    /* eslint-disable no-console */
    console.warn("Link leads to external site from local link component");
  }

  return (
    <Link {...props} href={href} scroll={true}>
      {children}
    </Link>
  );
};

export default LocalLink;
