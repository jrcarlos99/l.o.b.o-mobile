import { Occurrence } from "@/types/OccurrenceType";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  occurrence: Occurrence;
  onOpenMap?: (lat: number, lon: number) => void;
};

export function LocationSection({ occurrence, onOpenMap }: Props) {
  const { cidade, regiao, dataHoraAbertura, latitude, longitude } = occurrence;

  const hasCoords =
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);

  const dateText =
    dataHoraAbertura && !Number.isNaN(new Date(dataHoraAbertura).getTime())
      ? new Date(dataHoraAbertura).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Data não informada";

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Localização</Text>

      <Text style={styles.location}>
        {cidade || regiao
          ? `${cidade ?? ""}${cidade && regiao ? ", " : ""}${regiao ?? ""}`
          : "Local não informado"}
      </Text>

      <Text style={styles.date}>{dateText}</Text>

      {hasCoords && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.gps}>
            Lat: {latitude}, Lon: {longitude}
          </Text>

          {onOpenMap && (
            <TouchableOpacity onPress={() => onOpenMap(latitude, longitude)}>
              <Text style={styles.mapButton}>Ver no mapa</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
