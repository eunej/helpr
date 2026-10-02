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
