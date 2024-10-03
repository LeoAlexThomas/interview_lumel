import {
  DataChildModalInterface,
  UpdateActionEnum,
  UpdateDataInterface,
} from "@/datatype";
import { Center, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState, Fragment } from "react";
import NestedRowChild from "./NestedRowChild";
import TableChildCell from "./TableChildCell";
import CustomButton from "./CustomButton";

const TableRow = ({
  rowData,
  onRowUpdate,
}: {
  rowData: DataChildModalInterface;
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
      id: rowData.id,
      allocateValue: allocation ?? 0,
    });
  };
  const onAllocateValue = () => {
    onRowUpdate({
      action: UpdateActionEnum.value,
      id: rowData.id,
      allocateValue: allocation ?? 0,
    });
  };

  return (
    <VStack alignItems="stretch">
      <SimpleGrid columns={6} spacingX={6} spacingY={4}>
        <TableChildCell text={rowData.label} />
        <Center>
          <TableChildCell text={rowData.value.toString()} />
        </Center>
        <Input
          fontSize="14px"
          lineHeight="1.25"
          value={allocation}
          onChange={(e) => setAllocation(Number(e.target.value))}
          type="number"
        />
        <CustomButton onClick={onAllocatePercentage}>Allocate %</CustomButton>
        <CustomButton onClick={onAllocateValue}>Allocate value</CustomButton>
        <Center>
          <TableChildCell text={`${rowData.varience} %`} />
        </Center>
      </SimpleGrid>
      {rowData.children.map((rowChild) => (
        <Fragment key={rowChild.id}>
          <NestedRowChild
            nestedRowData={rowChild}
            parentId={rowData.id}
            onRowUpdate={onRowUpdate}
          />
        </Fragment>
      ))}
    </VStack>
  );
};
export default TableRow;
