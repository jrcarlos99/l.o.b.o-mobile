import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderBase from "./HeaderBase";
import { styles } from "./style";

type Props = {
  avatarUrl: string;
  title: string;
  onFilterPress: () => void;
  onFiltersChange: (filters: OccurrenceFilters) => void;
};

export default function HeaderWithFilters({
  avatarUrl,
  title,
  onFilterPress,
  onFiltersChange,
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

  const insets = useSafeAreaInsets();

  // Normaliza valores para evitar envio de "todos", "tipo", etc.
  const normalize = (value: string) =>
    ["todos", "tipo", "status", "regiao"].includes(value) ? undefined : value;

  // Atualiza os filtros no pai sempre que algo muda
  useEffect(() => {
    onFiltersChange({
      status: normalize(statusFilter),
      regiao: normalize(regionFilter) as OccurrenceFilters["regiao"],
      tipo: normalize(typeFilter) as OccurrenceFilters["tipo"],
    });
  }, [statusFilter, regionFilter, typeFilter, periodFilter, onFiltersChange]);

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <HeaderBase
        avatarUrl={avatarUrl}
        formattedDate={formattedDate}
        onDatePress={() => setShowDatePicker(true)}
        onNotificationsPress={() =>
          Alert.alert("Notificações", "Sem novas notificações!")
        }
        onAvatarPress={() => Alert.alert("Avatar", "Menu do usuário")}
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
              <Picker.Item label="Incêndio" value="INCENDIO" />
              <Picker.Item
                label="Acidente de Trânsito"
                value="ACIDENTE_DE_TRANSITO"
              />
              <Picker.Item label="Salvamento" value="SALVAMENTO" />
              <Picker.Item label="Resgate" value="RESGATE" />
              <Picker.Item label="Pré-Hospitalar" value="PRE_HOSPITALAR" />
              <Picker.Item label="EPI" value="EPI" />
              <Picker.Item label="Comunicação" value="COMUNICACAO" />
              <Picker.Item label="Vazamento" value="VAZAMENTO" />
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
              <Picker.Item label="Todas" value="todos" />
              <Picker.Item label="RMR" value="RMR" />
              <Picker.Item label="Agreste" value="AGRE" />
              <Picker.Item label="Zona da Mata" value="ZDMT" />
              <Picker.Item label="Sertão" value="SERT" />
            </Picker>
          </View>

          <View style={styles.filterBox}>
            <Picker
              selectedValue={statusFilter}
              onValueChange={setStatusFilter}
            >
              <Picker.Item label="Status" value="status" />
              <Picker.Item label="Todos" value="todos" />
              <Picker.Item label="Pendente" value="PENDENTE" />
              <Picker.Item label="Em Andamento" value="EM_ANDAMENTO" />
              <Picker.Item label="Aberta" value="ABERTA" />
              <Picker.Item label="Cancelado" value="CANCELADO" />
              <Picker.Item label="Concluído" value="CONCLUIDO" />
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
