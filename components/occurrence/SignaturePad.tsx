import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Signature from "react-native-signature-canvas";

export default function SignaturePad({
  onOK,
  onClose,
}: {
  onOK: (sig: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<any>(null);

  return (
    <View style={{ flex: 1 }}>
      <Signature
        ref={ref}
        onOK={onOK}
        descriptionText="Assine abaixo"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={`
      .m-signature-pad--footer {display: none;}
      body,html {margin:0;padding:0;}
    `}
      />
      <TouchableOpacity
        onPress={onClose}
        style={{ padding: 12, backgroundColor: "#eee", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
