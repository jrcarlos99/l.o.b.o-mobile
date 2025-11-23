import HeaderWithFilters from "@/components/Header/HeaderWithFilter";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import { useState } from "react";
import { Alert } from "react-native";

const mockOccurrences = [
  {
    id: "#08421",
    tipo: "Incêndio Residencial",
    local: "Boa Viagem - Recife, PE",
    dataHora: "03/09/2025 - 14:33",
  },
  {
    id: "#08422",
    tipo: "Acidente Veicular",
    local: "BR-101 - Jaboatão dos Guararapes, PE",
    dataHora: "05/09/2025 - 09:12",
  },
  {
    id: "#08423",
    tipo: "Resgate em Altura",
    local: "Centro - Caruaru, PE",
    dataHora: "06/09/2025 - 18:47",
  },
  {
    id: "#08424",
    tipo: "Vazamento de Gás",
    local: "Casa Amarela - Recife, PE",
    dataHora: "07/09/2025 - 11:25",
  },
];

export default function OccurrencesPage() {
  const [avatarUrl] = useState("https://github.com/jrcarlos99.png");

  const handleFilters = () => {
    Alert.alert("Filtros", "Filtros aplicados!");
  };

  return (
    <LayoutWrapper
      header={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Minhas Ocorrências"
          onFilterPress={handleFilters}
        />
      }
    >
      <OccurrencesList data={mockOccurrences} />
    </LayoutWrapper>
  );
}

// const styles = StyleSheet.create({
//   headerWrapper: {
//     backgroundColor: "#E5E4E4",
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     paddingBottom: 25,
//     overflow: "visible",
//   },
//   headerShadow: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 20,
//     backgroundColor: "#000",
//     opacity: 0.1,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     zIndex: -1,
//   },
// });
