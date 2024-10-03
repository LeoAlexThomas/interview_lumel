import { Button, ButtonProps } from "@chakra-ui/react";

const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      fontSize="14px"
      lineHeight="1.25"
      bg="blue.400"
      _hover={{
        bg: "blue.500",
      }}
      color="white"
      {...props}
    />
  );
};

export default CustomButton;
