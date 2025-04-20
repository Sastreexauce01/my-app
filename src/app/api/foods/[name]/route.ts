import { foods } from "@/data";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = params.name;

  const index = foods.findIndex(
    (food) => food.name.toLowerCase().replace(/ /g, "-") === name
  );

  if (index !== -1) {
    return new Response(JSON.stringify(foods[index]), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    return new Response("Food not found.", {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }
}
