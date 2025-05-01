// Why? GET is used to retrieve data, and /notes describes the collection. Auth user info comes from headers.

import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_ANON_KEY'),
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id);

  return new Response(JSON.stringify({ data, error }), { headers: { "Content-Type": "application/json" } });
});
