import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function useGPS() {
  const [gps, setGps] = useState<
    | { lat: number; lon: number; accuracy?: number; timestamp: string }
    | undefined
  >(undefined);
  const [status, setStatus] = useState<"idle" | "granted" | "denied" | "error">(
    "idle"
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (!mounted) return;
        if (status !== "granted") {
          setStatus("denied");
          return;
        }
        setStatus("granted");
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        if (!mounted) return;
        setGps({
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
          accuracy: loc.coords.accuracy ?? undefined,
          timestamp: new Date(loc.timestamp).toISOString(),
        });
      } catch (err) {
        console.warn("useGPS error", err);
        setStatus("error");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { gps, status };
}
