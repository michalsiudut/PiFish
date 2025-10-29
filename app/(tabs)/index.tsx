import { Text, View } from "react-native";


export default function Index() {

  const user = "Michał";
  return (
    <>
      <View className="mt-4 ml-4">
        <Text className="text-4xl text-primary font-bold">Hello, {user}</Text>
      </View >
    </>
  );
}
