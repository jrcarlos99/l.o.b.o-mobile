import { Occurrence } from "@/types/OccurrenceType";
import React from "react";
import { Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { occurrenceDetailsStyles as styles } from "./styles";

import { ActionsSection } from "./ActionsSection";
import { AttachmentsSection } from "./AttachmentsSection";
import { DescriptionSection } from "./DescriptionSection";
import { Header } from "./Header";
import { LocationSection } from "./LocationSection";
import { SignatureSection } from "./SignatureSection";
import { StatusSection } from "./StatusSection";
import { TimelineSection } from "./TimelineSection";

type Props = {
  visible: boolean;
  onClose: () => void;
  occurrence: Occurrence | null;

  anexos?: {
    id: number;
    url_anexo: string;
    tipo: "IMAGEM" | "ASSINATURA";
    created_at?: string;
  }[];

  onEdit?: (occ: Occurrence) => void;
  onChangeStatus?: (occ: Occurrence, status: string) => void;
  onOpenMap?: (lat: number, lon: number) => void;
};

export default function OccurrenceDetailsModal({
  visible,
  onClose,
  occurrence,
  onEdit,
  onChangeStatus,
  onOpenMap,
  anexos = [],
}: Props) {
  if (!occurrence) return null;

  const imagens = anexos.filter((a) => a.tipo === "IMAGEM");
  const assinatura = anexos.find((a) => a.tipo === "ASSINATURA");

  // ✅ Agora usando camelCase (compatível com seu tipo)
  const timeline = [
    {
      time: occurrence.dataHoraAbertura ?? "",
      label: "Registro Criado",
    },
    {
      time: imagens[0]?.created_at ?? "",
      label: "Imagem anexada",
    },
    {
      time: occurrence.dataHoraAbertura ?? "",
      label: "GPS registrado",
    },
    {
      time: occurrence.dataHoraAtualizacao ?? "",
      label: "Sincronizado com servidor",
    },
  ];

  const handleEdit = () => {
    if (onEdit) onEdit(occurrence);
  };

  const handleChangeStatus = (status: string) => {
    if (onChangeStatus) onChangeStatus(occurrence, status);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.wrapper}>
        <Header onClose={onClose} onEdit={handleEdit} canEdit={!!onEdit} />

        <ScrollView contentContainerStyle={styles.content}>
          <StatusSection status={occurrence.status} />

          <DescriptionSection
            title={occurrence.titulo ?? occurrence.tipo}
            description={occurrence.descricao}
          />

          <LocationSection occurrence={occurrence} onOpenMap={onOpenMap} />

          <AttachmentsSection images={occurrence.anexos ?? []} />

          <SignatureSection signatureUrl={assinatura?.url_anexo} />

          <TimelineSection timeline={timeline} />

          <ActionsSection
            occurrence={occurrence}
            onEdit={onEdit ? handleEdit : undefined}
            onChangeStatus={onChangeStatus ? handleChangeStatus : undefined}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
