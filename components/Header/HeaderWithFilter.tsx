import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import HeaderBase from "./HeaderBase";
import { styles } from "./style";

type Props = {
  avatarUrl: string;
  title: string;
  onFilterPress: () => void;
};

export default function HeaderWithFilters({
  avatarUrl,
  title,
  onFilterPress,
}: Props) {
  const [periodFilter, setPeriodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("tipo");
  const [regionFilter, setRegionFilter] = useState("regiao");
  const [statusFilter, setStatusFilter] = useState("status");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.headerContainer}>
      <HeaderBase
        avatarUrl={avatarUrl}
        formattedDate={formattedDate}
        onDatePress={() => setShowDatePicker(true)}
        onNotificationsPress={() =>
          Alert.alert("Notificações", "Sem novas notificações!")
        }
      />

      <View style={styles.headerExtras}>
        <Text style={styles.headerText}>{title}</Text>

        {/* Filtros */}
        <View style={styles.filtersRow}>
          <View style={styles.filterBox}>
            <Picker
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
            <Picker selectedValue={typeFilter} onValueChange={setTypeFilter}>
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
