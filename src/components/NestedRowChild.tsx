import { Center, Input, SimpleGrid } from "@chakra-ui/react";
import TableChildCell from "./TableChildCell";
import {
  DataColumnDataInterface,
  UpdateActionEnum,
  UpdateDataInterface,
} from "@/datatype";
import { useState } from "react";
import CustomButton from "./CustomButton";

const NestedRowChild = ({
  nestedRowData,
  parentId,
  onRowUpdate,
}: {
  nestedRowData: DataColumnDataInterface;
  parentId: string;
  onRowUpdate: ({
    action,
    id,
    parentId,
    allocateValue,
  }: UpdateDataInterface) => void;
}) => {
  const [allocation, setAllocation] = useState<number>();

  const onAllocatePercentage = () => {
    onRowUpdate({
      action: UpdateActionEnum.percentage,
      id: nestedRowData.id,
      parentId: parentId,
      allocateValue: allocation ?? 0,
    });
  };
  const onAllocateValue = () => {
    onRowUpdate({
      action: UpdateActionEnum.value,
      id: nestedRowData.id,
      parentId: parentId,
      allocateValue: allocation ?? 0,
    });
  };
  return (
    <SimpleGrid columns={6} spacingX={6} spacingY={4}>
      <TableChildCell text={nestedRowData.label} pl={6} />
      <Center>
        <TableChildCell text={nestedRowData.value.toString()} />
      </Center>
      <Input
        fontSize="14px"
        lineHeight="1.25"
        value={allocation}
        onChange={(e) => setAllocation(Number(e.target.value))}
        type="number"
      />
      <CustomButton
        bg="blue.300"
        _hover={{
          bg: "blue.400",
        }}
        onClick={onAllocatePercentage}
      >
        Allocate %
      </CustomButton>
      <CustomButton
        bg="blue.300"
        _hover={{
          bg: "blue.400",
        }}
        onClick={onAllocateValue}
      >
        Allocate value
      </CustomButton>
      <Center>
        <TableChildCell text={`${nestedRowData.varience} %`} />
      </Center>
    </SimpleGrid>
  );
};
export default NestedRowChild;
