import type { Metadata } from "next";
import React from "react";

type Props = {
  params: { name: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const name = params.name;
  const title = `Discover ${name} - NutriSpark`;
  const description = `Learn all about the nutritional values of ${name} on NutriTech. Explore now!`;
  return {
    title,
    description,
  };
}

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
