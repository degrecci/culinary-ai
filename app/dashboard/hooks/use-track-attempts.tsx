import { supabaseClient } from "@/services/supabase";

export const useTrackAttempts = () => {
  const MAX_ATTEMPTS_ALLOWED = Number(
    process.env.NEXT_PUBLIC_MAX_ATTEMPTS_ALLOWED
  );

  const trackAttempt = async () => {
    try {
      const { data: track } = await supabaseClient.from("track").select("*");

      if (!track || !track.length) {
        return await supabaseClient.from("track").insert([{ attempts: 1 }]);
      }

      if (track[0].attempts >= MAX_ATTEMPTS_ALLOWED) {
        throw new Error(`Maximum attempts of ${MAX_ATTEMPTS_ALLOWED} reached`);
      }

      return await supabaseClient
        .from("track")
        .update({ attempts: track[0].attempts + 1 })
        .eq("id", track[0].id);
    } catch (error) {
      return { error };
    }
  };

  return { trackAttempt };
};
