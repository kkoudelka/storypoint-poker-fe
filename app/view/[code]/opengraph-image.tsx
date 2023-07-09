/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";
import React from "react";
import getBoardData from "../../(authenticated)/board/[code]/getData";
import { appUrl } from "@/src/utils";

// Image metadata
export const alt = "Storypoint Poker Board (view-only)";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { code },
}: {
  params: { code: string };
}) {
  const board = await getBoardData(code);

  if (!board) {
    throw new Error("Board not found");
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "#121212",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 50px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", width: "33%" }}>
          <img src={`${appUrl}/logo.svg`} height={340} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {board.title}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            padding: "0 50px",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: 32,
            }}
          >
            View-only
          </p>
          <p
            style={{
              fontSize: 32,
            }}
          >
            Storypoint Poker
          </p>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
