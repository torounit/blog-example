import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return <main>Hello! {data?.user?.email}</main>;
}
