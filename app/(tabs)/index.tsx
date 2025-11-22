import { TotalLineChart } from "@/components/charts";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const avatarUrl = "https://github.com/jrcarlos99.png";

export default function Index() {
  const [periodFilter, setPeriodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("tipo");
  const [regionFilter, setRegionFilter] = useState("regiao");
  const [statusFilter, setStatusFilter] = useState("status");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Image
              source={require("@/assets/images/lobo-icon.png")}
              style={styles.reactLogo}
            />
            <View style={styles.rightGroup}>
              <Pressable
                onPress={() =>
                  Alert.alert("Notificações", "Sem novas notificações!")
                }
                style={styles.bellIcon}
              >
                <MaterialIcons
                  name="notifications-none"
                  size={26}
                  color="#6C2020"
                />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </Pressable>
              <Image source={{ uri: avatarUrl }} style={styles.avatarUser} />
            </View>
          </View>

          <View style={styles.dateRow}>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateText}>{formattedDate}</Text>
              <MaterialIcons name="calendar-today" size={18} color="#6C2020" />
            </Pressable>
          </View>

          <View style={styles.headerExtras}>
            <Text style={styles.headerText}>Estatísticas</Text>

            <View style={styles.filtersRow}>
              <View style={styles.filterBox}>
                <Picker
                  style={styles.picker}
                  selectedValue={periodFilter}
                  onValueChange={setPeriodFilter}
                >
                  <Picker.Item
                    label="Selecione o período"
                    value=""
                    enabled={false}
                    color="#888"
                  />
                  <Picker.Item label="Todos" value="todos" />
                  <Picker.Item label="Hoje" value="hoje" />
                  <Picker.Item label="Ontem" value="ontem" />
                  <Picker.Item label="últimos 7 dias" value="ultimos_7_dias" />
                  <Picker.Item label="Mês passado" value="mes_passado" />
                </Picker>
              </View>

              <View style={styles.filterBox}>
                <Picker
                  selectedValue={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <Picker.Item label="Tipo" value="tipo" />
                  <Picker.Item label="Todos" value="todos" />
                  <Picker.Item label="Incêndio" value="incendio" />
                  <Picker.Item
                    label="Acidente de Trânsito"
                    value="acidente_transito"
                  />
                  <Picker.Item label="Salvamento" value="salvamento" />
                  <Picker.Item label="Resgate" value="resgate" />
                  <Picker.Item label="Vazamento" value="vazamento" />
                </Picker>
              </View>
            </View>

            <View style={styles.filtersRow}>
              <View style={styles.filterBox}>
                <Picker
                  selectedValue={regionFilter}
                  onValueChange={setRegionFilter}
                >
                  <Picker.Item label="Região" value="regiao" />
                  <Picker.Item label="Todas" value="todas" />
                  <Picker.Item label="RMR" value="rmr" />
                  <Picker.Item label="Agreste" value="agreste" />
                  <Picker.Item label="Zona da Mata" value="zona_da_mata" />
                  <Picker.Item label="Sertão" value="sertao" />
                </Picker>
              </View>

              <View style={styles.filterBox}>
                <Picker
                  selectedValue={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <Picker.Item label="Status" value="status" />
                  <Picker.Item label="Todos" value="todos" />
                  <Picker.Item label="Pendente" value="pendente" />
                  <Picker.Item label="Em Andamento" value="media" />
                  <Picker.Item label="Aberta" value="aberta" />
                  <Picker.Item label="Cancelado" value="cancelado" />
                  <Picker.Item label="Concluído" value="concluido" />
                </Picker>
              </View>
            </View>

            <View style={styles.headerButton}>
              <Button onPress={handleFilters} title="Filtrar" color="#6C2020" />
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
        </View>
      }
    >
      <View style={styles.chartsContainer}>
        <View style={{ width: "100%", marginTop: 16 }}>
          <Text style={styles.cardTitle}>Total de Ocorrências</Text>
          <TotalLineChart />
        </View>
        <Button
          title="Ver mais estatísticas"
          onPress={() => router.push("/dashboard")}
          color="#6C2020"
        />
        <View style={{ width: "100%", marginTop: 16 }}>
          <Text style={styles.cardTitle}>MAPA</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 90,
    color: "#dbdbdb",
    alignItems: "center",
  },

  chartsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    minHeight: 250,
  },

  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 16,
  },

  dateContainer: {
    width: "90%",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E5E4E4",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E4E4",
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    color: "#6C2020",
    fontWeight: "500",
  },

  dateRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  bellIcon: {
    position: "relative",
    backgroundColor: "#E5E4E4",
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E4E4",
    elevation: 2,
    marginRight: 10,
  },

  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#E53935",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  headerExtras: {
    alignItems: "center",
    width: "90%",
  },

  headerText: {
    color: "#6C2020",
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
  },

  headerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 50,
    alignItems: "center",
  },

  reactLogo: {
    width: 80,
    height: 80,
  },
  avatarUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  headerButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    width: "100%",
  },

  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },

  filterBox: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    height: 38,
    justifyContent: "center",
  },
  picker: { height: 38, fontSize: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardId: {
    color: "#687076",
    fontSize: 13,
    marginBottom: 4,
  },
  cardTitle: {
    color: "#651717",
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 2,
  },
  cardLocal: {
    color: "#555",
    fontSize: 14,
    marginBottom: 2,
  },
  cardDate: {
    color: "#555",
    fontSize: 13,
  },
  cardDetails: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "#687076",
    fontSize: 14,
  },
  cardButton: {
    position: "absolute",
    right: 16,
    bottom: 12,
  },
});
