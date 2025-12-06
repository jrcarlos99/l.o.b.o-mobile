import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type PieItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
};

export function CustomPieChart({ data }: { data: PieItem[] }) {
  if (!data || data.length === 0) {
    return (
      <View
        style={{
          width: screenWidth - 32,
          height: 200,
          borderRadius: 12,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Text style={{ color: "#666" }}>Sem dados para exibir</Text>
      </View>
    );
  }

  return (
    <PieChart
      data={data}
      width={screenWidth - 32}
      height={260}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="8"
      center={[0, 0]}
      hasLegend={true}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
        labelColor: () => "#333",
      }}
      style={{ borderRadius: 12 }}
    />
  );
}
