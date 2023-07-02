import { supabaseClient } from "@/services/supabase";

export const useTrackAttempts = () => {
  const trackAttempt = async () => {
    try {
      const { data: track } = await supabaseClient.from("track").select("*");

      if (!track || !track.length) {
        return await supabaseClient.from("track").insert([{ attempts: 1 }]);
      }

      return await supabaseClient
        .from("track")
        .update({ attempts: track[0].attempts + 1 })
        .eq("id", track[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  return { trackAttempt };
};
