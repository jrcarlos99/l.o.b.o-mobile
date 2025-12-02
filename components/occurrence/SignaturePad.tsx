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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#555",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Assine abaixo e toque em Salvar Assinatura para confirmar.
        </Text>
      </View>

      <Signature
        ref={ref}
        onOK={(sig) => {
          onOK(sig);
          onClose();
        }}
        descriptionText="Assine abaixo"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={`
          .m-signature-pad--footer {display: none;}
          body,html {margin:0;padding:0;}
        `}
      />

      <TouchableOpacity
        onPress={() => ref.current?.readSignature()}
        style={{
          backgroundColor: "#6C2020",
          padding: 12,
          margin: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Salvar Assinatura
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClose}
        style={{ padding: 12, alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#DC3545" }}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
