"use server";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error, data: authResponse } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message, status: error.status || 401 };
  }

  return {
    status: 200,
    data: {
      token: authResponse.session?.access_token,
    },
    error: null,
  };
}
