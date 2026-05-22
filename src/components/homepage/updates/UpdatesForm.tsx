'use client';

import { useActionState, useEffect } from "react";
import { subscribeToNewsletter } from "./actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UpdatesFormProps {
  placeholder: string;
  buttonText: string;
}

export default function UpdatesForm({ placeholder, buttonText }: UpdatesFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Subscribed successfully!");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="bg-white rounded-full p-1 flex items-center w-full max-w-[420px] shadow-sm border border-gray-100 font-satoshi">
      <Input
        type="email"
        name="email"
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent text-gray-700 placeholder:text-gray-400 h-10 text-sm px-6 min-w-0 flex-1"
        required
        disabled={isPending}
      />
      <Button 
        type="submit" 
        className="rounded-full bg-[#313C87] hover:bg-[#253070] text-white px-6 h-10 text-sm font-normal whitespace-nowrap shadow-md transition-all"
        disabled={isPending}
      >
        {isPending ? "..." : buttonText}
      </Button>
    </form>
  );
}
