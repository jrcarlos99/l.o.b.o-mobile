import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  avatarUrl: string;
  onFilterPress: () => void;
};

export default function OccurrencesHeader({ avatarUrl, onFilterPress }: Props) {
  const [periodFilter, setPeriodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("tipo");
  const [regionFilter, setRegionFilter] = useState("regiao");
  const [statusFilter, setStatusFilter] = useState("status");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={styles.headerContainer}>
      {/* Top row: logo + notificações + avatar */}
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

      {/* Seletor de Data */}
      <View style={styles.dateRow}>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>{formattedDate}</Text>
          <MaterialIcons name="calendar-today" size={18} color="#6C2020" />
        </Pressable>
      </View>

      {/* Filtros */}
      <View style={styles.headerExtras}>
        <Text style={styles.headerText}>Minhas Ocorrências</Text>

        <View style={styles.filtersRow}>
          <View style={styles.filterBox}>
            <Picker
              style={styles.picker}
              selectedValue={periodFilter}
              onValueChange={(itemValue) => setPeriodFilter(itemValue)}
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
              onValueChange={(itemValue) => setTypeFilter(itemValue)}
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
              onValueChange={(itemValue) => setRegionFilter(itemValue)}
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
              onValueChange={(itemValue) => setStatusFilter(itemValue)}
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

        <Pressable style={styles.filterButton} onPress={onFilterPress}>
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </Pressable>
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
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#E5E4E4",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 15,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 16,
  },

  reactLogo: { width: 80, height: 80 },
  rightGroup: { flexDirection: "row", alignItems: "center" },
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

  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  avatarUser: { width: 60, height: 60, borderRadius: 50 },
  dateRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  headerExtras: { alignItems: "center", width: "90%" },

  headerText: {
    color: "#6C2020",
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "bold",
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
  headerButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    width: "100%",
  },
  filterButton: {
    backgroundColor: "#6C2020",
    borderRadius: 38,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 8,
  },

  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
