import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { EVENT } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(registrations);

    const registered = Number(result.count);

    return NextResponse.json({
      registered,
      max: EVENT.maxCapacity,
      available: Math.max(0, EVENT.maxCapacity - registered),
      closed: registered >= EVENT.maxCapacity,
    });
  } catch {
    return NextResponse.json(
      { registered: 0, max: EVENT.maxCapacity, available: EVENT.maxCapacity, closed: false },
      { status: 200 }
    );
  }
}
