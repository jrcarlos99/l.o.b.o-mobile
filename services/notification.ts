import { Occurrence } from "@/types/OccurrenceType";
import * as Notifications from "expo-notifications";

/**
 * Agenda uma notificação local imediatamente após a criação de uma ocorrência.
 * @param newOccurrence O objeto da ocorrência recém-criada.
 */
export async function sendLocalOccurrenceCreationNotification(
  newOccurrence: Occurrence
) {
  // 1. Configurar o conteúdo da notificação
  const content = {
    title: "🚨 Nova Ocorrência Criada!",
    body: `ID: ${newOccurrence.id} - ${
      newOccurrence.titulo || newOccurrence.descricao.substring(0, 30)
    }...`,
    data: {
      occurrenceId: newOccurrence.id,
      // Você pode adicionar mais dados aqui para quando o usuário clicar na notificação
    },
    sound: true, // Toca o som padrão de notificação
  };

  // 2. Agendar a notificação para disparar imediatamente
  // Se o trigger for 'null', dispara imediatamente.
  await Notifications.scheduleNotificationAsync({
    content: content,
    trigger: null,
  });
}
