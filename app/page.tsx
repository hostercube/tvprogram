import { createClient } from "@/lib/supabase/server"
import ChannelGrid from "@/components/channel-grid"
import CategoryFilter from "@/components/category-filter"
import Header from "@/components/header"
import RemoteNavigationGuide from "@/components/remote-navigation-guide"
import AdminLink from "@/components/admin-link"

export default async function HomePage() {
  const supabase = createClient()

  // Fetch channels and categories
  const { data: channels } = await supabase
    .from("channels")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">স্মার্ট টিভি</h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">আপনার প্রিয় চ্যানেল দেখুন যেকোনো ডিভাইসে</p>
          <p className="text-sm text-gray-400 text-center mt-2">রিমোট কন্ট্রোল গাইডের জন্য 'H' চাপুন</p>
        </div>

        <CategoryFilter categories={categories || []} />

        <ChannelGrid channels={channels || []} />
      </main>

      <RemoteNavigationGuide />
      <AdminLink />
    </div>
  )
}
