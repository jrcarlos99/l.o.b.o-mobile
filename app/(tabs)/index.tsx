import HeaderWithFilters from "@/components/Header/HeaderWithFilter";
import { TotalLineChart } from "@/components/charts";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";
import { styles } from "../../styles/IndexStyles";

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const avatarUrl = "https://i.pravatar.cc/150?img=3";

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleFilters = () => {
    Alert.alert("Filtros exibidos");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E5E4E4", dark: "#E5E4E4" }}
      headerImage={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Estatísticas"
          onFilterPress={handleFilters}
        />
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.chartsContainer}>
          <Text style={styles.cardTitle}>Total de Ocorrências</Text>
          <TotalLineChart />
        </View>

        <Button
          title="Ver mais estatísticas"
          onPress={() => router.push("/dashboard")}
          color="#6C2020"
        />

        <View style={styles.chartsContainer}>
          <Text style={styles.cardTitle}>MAPA</Text>
          {/* Aqui você pode adicionar o mapa ou outro conteúdo */}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </ParallaxScrollView>
  );
}

//   contentContainer: {
//     flex: 1,
//     paddingBottom: 90,
//     color: "#dbdbdb",
//     alignItems: "center",
//   },

//   chartsContainer: {
//     flexWrap: "wrap",
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     minHeight: 250,
//   },

//   headerContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 40,
//     paddingBottom: 20,
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "90%",
//     marginBottom: 16,
//   },

//   dateContainer: {
//     width: "90%",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   dateButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#E5E4E4",
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#E5E4E4",
//     elevation: 2,
//   },
//   dateText: {
//     fontSize: 14,
//     color: "#6C2020",
//     fontWeight: "500",
//   },

//   dateRow: {
//     width: "90%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   rightGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   bellIcon: {
//     position: "relative",
//     backgroundColor: "#E5E4E4",
//     padding: 6,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#E5E4E4",
//     elevation: 2,
//     marginRight: 10,
//   },

//   notificationBadge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#E53935",
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   badgeText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "bold",
//   },

//   headerExtras: {
//     alignItems: "center",
//     width: "90%",
//   },

//   headerText: {
//     color: "#6C2020",
//     fontSize: 24,
//     marginBottom: 8,
//     fontWeight: "bold",
//   },

//   headerImages: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 24,
//     paddingTop: 50,
//     alignItems: "center",
//   },

//   reactLogo: {
//     width: 80,
//     height: 80,
//   },
//   avatarUser: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//   },

//   headerButton: {
//     borderRadius: 8,
//     overflow: "hidden",
//     marginTop: 8,
//     width: "100%",
//   },

//   filtersRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 8,
//   },

//   filterBox: {
//     flex: 1,
//     marginHorizontal: 5,
//     borderWidth: 1,
//     borderColor: "#bbb",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//     height: 38,
//     justifyContent: "center",
//   },
//   picker: { height: 38, fontSize: 12 },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 16,
//     marginVertical: 8,
//     width: "90%",
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   cardId: {
//     color: "#687076",
//     fontSize: 13,
//     marginBottom: 4,
//   },
//   cardTitle: {
//     color: "#651717",
//     fontWeight: "600",
//     fontSize: 17,
//     marginBottom: 2,
//   },
//   cardLocal: {
//     color: "#555",
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   cardDate: {
//     color: "#555",
//     fontSize: 13,
//   },
//   cardDetails: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     color: "#687076",
//     fontSize: 14,
//   },
//   cardButton: {
//     position: "absolute",
//     right: 16,
//     bottom: 12,
//   },
// });
