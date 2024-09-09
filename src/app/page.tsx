import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    console.log(data);
    return (
        <main>
            Hello! {data?.user?.email}
        </main>
    );
}
