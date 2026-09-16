import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client"; // Your Better Auth client instance
import { useNavigate } from "react-router"; // or your router of choice

export function useSignUpMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
    }: {
      email: string;
      password: string;
      rememberMe: boolean;
    }) => {
      // Execute the Better Auth signup call
      const response = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to sign up.");
      }

      return response.data;
    },
    onSuccess: () => {
      // 1. Invalidate session queries so the entire app reflects the logged-in user
      queryClient.invalidateQueries({ queryKey: ["session"] });

      // 2. Redirect the user
      navigate("/seller/dashboard");
    },
    onError: (error: Error) => {
      console.error("Sign up failed:", error.message);
    },
  });
}
