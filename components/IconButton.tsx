import { Text, View } from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";

type IconButtonProps = {
  icon?: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number | undefined;
  isBookmark?: boolean;
};
const IconButton = ({ icon, text, isBookmark = false }: IconButtonProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* ICON */}
      {isBookmark ? (
        <Feather name="bookmark" size={18} color="#484848" />
      ) : (
        <EvilIcons name={icon} size={26} color="#484848" />
      )}

      {/* NUMBER */}
      {!!text && <Text style={{ color: "grey", fontSize: 12 }}>{text}</Text>}
    </View>
  );
};

export default IconButton;
