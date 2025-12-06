import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

type Occurrence = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  status?: string;
  tipo?: string;
  cidade?: string;
};

type Props = {
  occurrences: Occurrence[];
  style?: ViewStyle;
};

export default function CustomMap({ occurrences, style }: Props) {
  const statusColors: Record<string, string> = {
    PENDENTE: "red",
    CONCLUIDO: "green",
    EM_ANDAMENTO: "orange",
    CANCELADO: "gray",
    ABERTA: "blue",
  };

  // ✅ Garante que não quebra se status vier undefined
  const markersJS = occurrences
    .filter((occ) => occ.latitude && occ.longitude) // ✅ evita markers inválidos
    .map((occ) => {
      const color = statusColors[(occ.status || "").toUpperCase()] || "blue";

      const popup = `
        <b>${occ.title || "Ocorrência"}</b><br/>
        Tipo: ${occ.tipo || "N/A"}<br/>
        Status: ${occ.status || "N/A"}<br/>
        Cidade: ${occ.cidade || "N/A"}
      `;

      return `
        var marker = L.circleMarker([${occ.latitude}, ${occ.longitude}], {
          radius: 8,
          color: "${color}",
          fillColor: "${color}",
          fillOpacity: 0.8
        }).bindPopup(${JSON.stringify(popup)});
        markers.addLayer(marker);
      `;
    })
    .join("\n");

  // ✅ Ajuste seguro para bounds
  const boundsJS =
    occurrences.length > 0
      ? `
      var bounds = L.latLngBounds([
        ${occurrences.map((o) => `[${o.latitude}, ${o.longitude}]`).join(",")}
      ]);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    `
      : "";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var map = L.map('map').setView([-8.0476, -34.877], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      var markers = L.markerClusterGroup();

      ${markersJS}

      map.addLayer(markers);

      ${boundsJS}
    });
  </script>
</body>
</html>
`;

  return (
    <View style={[styles.container, style]}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        source={{ html }}
        style={styles.map}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  map: {
    flex: 1,
  },
});
