import { supabaseClient } from "@/services/client";

type TrackAttemptResponse = {
  data?: any;
  error?: any;
};

export const useTrackAttempts = () => {
  const MAX_ATTEMPTS_ALLOWED = Number(
    process.env.NEXT_PUBLIC_MAX_ATTEMPTS_ALLOWED
  );

  const trackAttempt = async (): Promise<TrackAttemptResponse> => {
    try {
      const { data: track } = await supabaseClient.from("track").select("*");

      if (!track || !track.length) {
        const { data } = await supabaseClient
          .from("track")
          .insert([{ attempts: 1 }]);

        return { data };
      }

      if (track[0].attempts >= MAX_ATTEMPTS_ALLOWED) {
        throw new Error(`Maximum attempts of ${MAX_ATTEMPTS_ALLOWED} reached`);
      }

      const { data } = await supabaseClient
        .from("track")
        .update({ attempts: track[0].attempts + 1 })
        .eq("id", track[0].id);

      return data || {};
    } catch (error) {
      return { error };
    }
  };

  return { trackAttempt };
};
