import { Text, TextProps } from "@chakra-ui/react";

const TableChildCell = ({ text, ...props }: { text: string } & TextProps) => {
  return (
    <Text fontSize="14px" lineHeight="1.25" {...props}>
      {text}
    </Text>
  );
};

export default TableChildCell;
