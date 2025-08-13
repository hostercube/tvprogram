import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()

    // Test database connection
    const { data, error } = await supabase.from("categories").select("count").limit(1)

    if (error) {
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 })
    }

    return NextResponse.json({
      status: "success",
      message: "All systems operational",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Database connection failed" }, { status: 500 })
  }
}
