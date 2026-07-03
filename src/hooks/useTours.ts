"use client";

import { useCallback, useEffect, useState } from "react";
import { getTours } from "@/lib/firebase/firestore";
import type { Tour } from "@/types";

export function useTours(onlyActive = true) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    setLoading(true);
    return getTours(onlyActive)
      .then((data) => setTours(data))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, [onlyActive]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getTours(onlyActive)
      .then((data) => {
        if (!cancelled) setTours(data);
      })
      .catch(() => {
        if (!cancelled) setTours([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [onlyActive]);

  return { tours, loading, refetch };
}
