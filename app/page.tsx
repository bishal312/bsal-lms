"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Home() {
  const router = useRouter();
  const {
    data: session,
  } = authClient.useSession()


  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Logged out successfully")
        }
      }
    })
  }


  return (
    <div className="p-24">
      <h1 className="text-2xl font-bold text-stone-50">Bsal</h1>
      <ModeToggle />
      {
        session ? (<div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
        ) : <Button onClick={() => router.push("/login")}>Login</Button>
      }
    </div>
  );
}
