"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

export function LinkWithParams(props: ComponentProps<typeof Link>) {
  const searchParams = useSearchParams();
  const href = props.href + "?" + searchParams.toString();
  return <Link {...props} href={href} />;
}
