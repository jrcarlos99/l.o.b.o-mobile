import ProtectedRoute from "@/middleware/ProtectedRoute";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../../styles/settingsStyle";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;
  const [notifications, setNotifications] = useState({
    alertas: true,
    faltaEquipamento: true,
    atualizacoes: false,
    mensagens: true,
  });
  const [formatoNotificacao, setFormatoNotificacao] = useState("sistema");
  const [tema, setTema] = useState("claro");

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const NavigationButton = ({
    title,
    screenName,
  }: {
    title: string;
    screenName: string;
  }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(screenName as never)}
    >
      <Text style={styles.menuText}>{title}</Text>
      <Text style={styles.menuText}>&gt;</Text>
    </TouchableOpacity>
  );

  return (
    <ProtectedRoute>
      <View style={{ flex: 1, paddingBottom: customBottomPadding }}>
        <ScrollView style={styles.container}>
          {/* Seção do usuário */}
          <View style={styles.section}>
            <Text style={styles.userInfo}>Juliana Silveira</Text>
            <Text style={styles.location}>Metropolitana - RMR</Text>
          </View>

          {/* Menu principal */}
          <View style={styles.section}>
            <NavigationButton title="Conta" screenName="settings/account" />
            <NavigationButton
              title="Privacidade"
              screenName="settings/privacy"
            />
            <NavigationButton
              title="Redefinir Senha"
              screenName="settings/reset-password"
            />

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Tema</Text>
              <View style={styles.themeContainer}>
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => setTema("claro")}
                >
                  <View
                    style={[
                      styles.radio,
                      tema === "claro" && styles.radioSelected,
                    ]}
                  />
                  <Text>Claro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => setTema("escuro")}
                >
                  <View
                    style={[
                      styles.radio,
                      tema === "escuro" && styles.radioSelected,
                    ]}
                  />
                  <Text>Escuro</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Notificações */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificações</Text>
            {Object.entries(notifications).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={styles.checkboxContainer}
                onPress={() =>
                  toggleNotification(key as keyof typeof notifications)
                }
              >
                <View style={[styles.checkbox, value && styles.checked]} />
                <Text>
                  {key === "alertas" && "Alerta de novas ocorrências"}
                  {key === "faltaEquipamento" &&
                    "Falta de equipamento registrada"}
                  {key === "atualizacoes" && "Atualizações de relatórios"}
                  {key === "mensagens" && "Mensagens administrativas"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Formato de notificações */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formato de notificações</Text>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setFormatoNotificacao("sistema")}
            >
              <View
                style={[
                  styles.radio,
                  formatoNotificacao === "sistema" && styles.radioSelected,
                ]}
              />
              <Text>No sistema (Painel do LOBO)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setFormatoNotificacao("email")}
            >
              <View
                style={[
                  styles.radio,
                  formatoNotificacao === "email" && styles.radioSelected,
                ]}
              />
              <Text>E-mail Institucional</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ProtectedRoute>
  );
};
export default SettingsScreen;
