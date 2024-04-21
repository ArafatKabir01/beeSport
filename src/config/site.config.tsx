import { LAYOUT_OPTIONS } from "@/config/enums";
import logo from "@public/images/asia-sport-logo.svg";
import { Metadata } from "next";
// import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = "dark",
  LIGHT = "light"
}

export const siteConfig = {
  title: "BeeSports",
  description: ``,
  logo: logo,
  icon: logo,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  // openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - BeeSports` : siteConfig.title,
    description
    // openGraph: openGraph ?? {
    //   title: title ? `${title} - MahaScore` : title,
    //   description,
    //   url: 'https://isomorphic-furyroad.vercel.app',
    //   siteName: 'MahaScore', // https://developers.google.com/search/docs/appearance/site-names
    //   images: {
    //     url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
    //     width: 1200,
    //     height: 630,
    //   },
    //   locale: 'en_US',
    //   type: 'website',
    // },
  };
};
