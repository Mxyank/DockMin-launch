import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertWaitlistEntry } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export function useWaitlistCount() {
  return useQuery({
    queryKey: [api.waitlist.count.path],
    queryFn: async () => {
      const res = await fetch(api.waitlist.count.path);
      if (!res.ok) throw new Error("Failed to fetch count");
      return api.waitlist.count.responses[200].parse(await res.json());
    },
    // Refetch every 30 seconds to keep it semi-live
    refetchInterval: 30000, 
  });
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      // Validate locally first just in case
      const validated = api.waitlist.create.input.parse(data);
      
      const res = await fetch(api.waitlist.create.path, {
        method: api.waitlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        // Handle specific error codes
        if (res.status === 409) {
          const error = api.waitlist.create.responses[409].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 400) {
          const error = api.waitlist.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Something went wrong. Please try again.");
      }

      return api.waitlist.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.waitlist.count.path] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error joining waitlist",
        description: error.message,
      });
    },
  });
}
