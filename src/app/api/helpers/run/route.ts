import { NextResponse } from "next/server";
import { runHelperAgent } from "@/lib/agent";
import type { TaskCategory } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      category?: TaskCategory;
      title?: string;
      brief?: string;
      helperName?: string;
      helperKind?: "ai" | "human";
    };

    if (!body.brief?.trim() || !body.category || !body.helperName) {
      return NextResponse.json(
        { error: "Missing brief, category, or helper." },
        { status: 400 }
      );
    }

    // Human helpers take a touch longer in the demo.
    const delayMs = body.helperKind === "human" ? 2200 : 900;
    await new Promise((resolve) => setTimeout(resolve, delayMs));

    const deliverable = runHelperAgent({
      category: body.category,
      title: body.title?.trim() || "Untitled task",
      brief: body.brief,
      helperName: body.helperName,
    });

    return NextResponse.json({ deliverable });
  } catch {
    return NextResponse.json(
      { error: "Helper failed. Try again in a moment." },
      { status: 500 }
    );
  }
}
