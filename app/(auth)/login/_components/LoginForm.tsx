"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const [githubPending, startGitHubTransition] = useTransition();

  async function signInWithGithub() {
    startGitHubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, redirecting...");
          },
          onError: () => {
            toast.error("Internal Server error!");
          }
        }
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login with your github/gmail Account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button disabled={githubPending} onClick={signInWithGithub} className="w-full" variant={"outline"}>
          {githubPending ? (
            <div className="flex items-center gap-2">
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <SiGithub size={20} />
              Login with github Account
            </div>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">Or Continue with</span>
        </div>

        <div className="grid gap-3 py-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="b@example.com" />
          </div>
        </div>
        <Button className="w-full">Continue with Email</Button>
      </CardContent>
    </Card>
  );
}