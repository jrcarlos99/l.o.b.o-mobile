import { formSectionStyles as styles } from "@/styles/FormSectionStyles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  FlatList,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ViaturaItem {
  id: string;
  nome: string;
}

interface EquipeItem {
  id: string;
  nome: string;
}

interface FormSectionProps {
  formik: any;
  viaturaItems: ViaturaItem[];
  equipeItems: EquipeItem[];
}

const OCCURRENCE_TYPES = [
  { id: "INCENDIO", label: "Incêndio" },
  { id: "ACIDENTE_DE_TRANSITO", label: "Acidente de Trânsito" },
  { id: "SALVAMENTO", label: "Salvamento" },
  { id: "RESGATE", label: "Resgate" },
  { id: "PRE_HOSPITALAR", label: "Pré-Hospitalar" },
  { id: "EPI", label: "EPI" },
  { id: "COMUNICACAO", label: "Comunicação" },
  { id: "VAZAMENTO", label: "Vazamento" },
];

const REGIONS = [
  { id: "AGRE", label: "Agreste" },
  { id: "SERT", label: "Sertão" },
  { id: "RMR", label: "RMR" },
  { id: "ZDMT", label: "Zona da Mata" },
];

export const FormSection: React.FC<FormSectionProps> = ({
  formik,
  viaturaItems,
  equipeItems,
}) => {
  const [showTypeModal, setShowTypeModal] = React.useState(false);
  const [showRegionModal, setShowRegionModal] = React.useState(false);
  const [showVehicleModal, setShowVehicleModal] = React.useState(false);
  const [showTeamModal, setShowTeamModal] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const getTypeLabel = () => {
    return (
      OCCURRENCE_TYPES.find((t) => t.id === formik.values.type)?.label ||
      "Selecionar tipo"
    );
  };

  const getRegionLabel = () => {
    return (
      REGIONS.find((r) => r.id === formik.values.region)?.label ||
      "Selecionar região"
    );
  };

  const getVehicleLabel = () => {
    return (
      viaturaItems.find((v) => v.id === formik.values.vehicle)?.nome ||
      "Selecionar viatura"
    );
  };

  const getTeamLabel = () => {
    return (
      equipeItems.find((e) => e.id === formik.values.team)?.nome ||
      "Selecionar equipe"
    );
  };

  const handleDateChange = (event: any, date: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      formik.setFieldValue(
        "date",
        date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* TIPO */}
      <View style={styles.section}>
        <Text style={styles.label}>Tipo de Ocorrência *</Text>
        <TouchableOpacity
          style={[
            styles.picker,
            formik.touched.type && formik.errors.type && styles.pickerError,
          ]}
          onPress={() => setShowTypeModal(true)}
        >
          <Text
            style={[
              styles.pickerText,
              !formik.values.type && styles.placeholderText,
            ]}
          >
            {getTypeLabel()}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {formik.touched.type && formik.errors.type && (
          <Text style={styles.errorText}>{formik.errors.type}</Text>
        )}

        <Modal visible={showTypeModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowTypeModal(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={OCCURRENCE_TYPES}
                keyExtractor={(item) => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      formik.setFieldValue("type", item.id);
                      setShowTypeModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        formik.values.type === item.id &&
                          styles.modalItemTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* REGIÃO */}
      <View style={styles.section}>
        <Text style={styles.label}>Região *</Text>
        <TouchableOpacity
          style={[
            styles.picker,
            formik.touched.region && formik.errors.region && styles.pickerError,
          ]}
          onPress={() => setShowRegionModal(true)}
        >
          <Text
            style={[
              styles.pickerText,
              !formik.values.region && styles.placeholderText,
            ]}
          >
            {getRegionLabel()}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {formik.touched.region && formik.errors.region && (
          <Text style={styles.errorText}>{formik.errors.region}</Text>
        )}

        <Modal visible={showRegionModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowRegionModal(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={REGIONS}
                keyExtractor={(item) => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      formik.setFieldValue("region", item.id);
                      setShowRegionModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        formik.values.region === item.id &&
                          styles.modalItemTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* DATA */}
      <View style={styles.section}>
        <Text style={styles.label}>Data *</Text>
        <TouchableOpacity
          style={[
            styles.picker,
            formik.touched.date && formik.errors.date && styles.pickerError,
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerText}>
            {formik.values.date || "Selecionar data"}
          </Text>
          <Ionicons name="calendar" size={20} color="#999" />
        </TouchableOpacity>

        {formik.touched.date && formik.errors.date && (
          <Text style={styles.errorText}>{formik.errors.date}</Text>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* VIATURA */}
      <View style={styles.section}>
        <Text style={styles.label}>Viatura *</Text>
        <TouchableOpacity
          style={[
            styles.picker,
            formik.touched.vehicle &&
              formik.errors.vehicle &&
              styles.pickerError,
          ]}
          onPress={() => setShowVehicleModal(true)}
        >
          <Text
            style={[
              styles.pickerText,
              !formik.values.vehicle && styles.placeholderText,
            ]}
          >
            {getVehicleLabel()}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {formik.touched.vehicle && formik.errors.vehicle && (
          <Text style={styles.errorText}>{formik.errors.vehicle}</Text>
        )}

        <Modal visible={showVehicleModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowVehicleModal(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={viaturaItems}
                keyExtractor={(item) => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      formik.setFieldValue("vehicle", item.id);
                      setShowVehicleModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        formik.values.vehicle === item.id &&
                          styles.modalItemTextActive,
                      ]}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* EQUIPE */}
      <View style={styles.section}>
        <Text style={styles.label}>Equipe *</Text>
        <TouchableOpacity
          style={[
            styles.picker,
            formik.touched.team && formik.errors.team && styles.pickerError,
          ]}
          onPress={() => setShowTeamModal(true)}
        >
          <Text
            style={[
              styles.pickerText,
              !formik.values.team && styles.placeholderText,
            ]}
          >
            {getTeamLabel()}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {formik.touched.team && formik.errors.team && (
          <Text style={styles.errorText}>{formik.errors.team}</Text>
        )}

        <Modal visible={showTeamModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowTeamModal(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={equipeItems}
                keyExtractor={(item) => item.id}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      formik.setFieldValue("team", item.id);
                      setShowTeamModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        formik.values.team === item.id &&
                          styles.modalItemTextActive,
                      ]}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* DESCRIÇÃO */}
      <View style={styles.section}>
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[
            styles.textInput,
            styles.textArea,
            formik.touched.description &&
              formik.errors.description &&
              styles.inputError,
          ]}
          placeholder="Descrição da ocorrência"
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {formik.touched.description && formik.errors.description && (
          <Text style={styles.errorText}>{formik.errors.description}</Text>
        )}
      </View>

      {/* ENDEREÇO */}
      <View style={styles.section}>
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.address &&
              formik.errors.address &&
              styles.inputError,
          ]}
          placeholder="Endereço completo (opcional)"
          value={formik.values.address}
          onChangeText={formik.handleChange("address")}
          onBlur={formik.handleBlur("address")}
        />
        {formik.touched.address && formik.errors.address && (
          <Text style={styles.errorText}>{formik.errors.address}</Text>
        )}
      </View>
    </View>
  );
};
