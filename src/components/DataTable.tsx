import {
  DataChildModalInterface,
  DataModalInterface,
  UpdateActionEnum,
  UpdateDataInterface,
} from "@/datatype";
import {
  Box,
  Center,
  Divider,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { floor, isNil, sum } from "lodash";
import { Fragment, useEffect, useReducer } from "react";
import TableRow from "./TableRow";

const VALUE: DataModalInterface = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      varience: 0,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          varience: 0,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          varience: 0,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      varience: 0,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          varience: 0,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          varience: 0,
        },
      ],
    },
  ],
};
const getPercentValue = (givenValue: number, total: number) => {
  return floor((givenValue / 100) * total, 2);
};

const customReducer = (
  state: DataChildModalInterface[],
  action: {
    type: string;
    id?: string;
    parentId?: string;
    allocateValue?: number;
  }
): DataChildModalInterface[] => {
  if (action.type === "total") {
    return state.map((rowChild) => {
      const total = sum(
        rowChild.children.map((nestedChild) => nestedChild.value)
      );
      return {
        ...rowChild,
        value: total,
        varience: floor(((total - rowChild.value) / rowChild.value) * 100, 2),
      };
    });
  }
  const allocateValue = action.allocateValue;
  const id = action.id;
  if (isNil(allocateValue) || isNil(id)) {
    return state;
  }
  const updatedRows = state.map((rowChild) => {
    if (!isNil(action.parentId) && rowChild.id === action.parentId) {
      // NOTE: Performing child operations
      return {
        ...rowChild,
        children: rowChild.children.map((nestedChild) => {
          if (nestedChild.id === action.id) {
            // NOTE: Percentage update
            if (action.type === UpdateActionEnum.percentage) {
              const percentValue = getPercentValue(
                allocateValue,
                nestedChild.value
              );

              return {
                ...nestedChild,
                value: nestedChild.value + percentValue,
                varience: allocateValue,
              };
            }
            // NOTE: Value update
            const diffFromPrevious = allocateValue - nestedChild.value;
            const currentValueVariance = floor(
              (diffFromPrevious / nestedChild.value) * 100,
              2
            );
            return {
              ...nestedChild,
              value: allocateValue,
              varience: currentValueVariance,
            };
          }
          return nestedChild;
        }),
      };
    }
    // NOTE: Performing parent operations
    if (rowChild.id === action.id) {
      if (action.type === UpdateActionEnum.percentage) {
        const percentValue = getPercentValue(allocateValue, rowChild.value);
        const totalValue = rowChild.value + percentValue;
        return {
          ...rowChild,
          value: totalValue,
          varience: allocateValue,
          children: rowChild.children.map((nestedChild) => {
            const childPercent = (nestedChild.value / rowChild.value) * 100;
            return {
              ...nestedChild,
              value: floor((childPercent / 100) * totalValue, 2),
            };
          }),
        };
      }
      // NOTE: Value update
      const diffFromPrevious = allocateValue - rowChild.value;
      const currentValueVariance = floor(
        (diffFromPrevious / rowChild.value) * 100,
        2
      );
      return {
        ...rowChild,
        value: allocateValue,
        varience: currentValueVariance,
        children: rowChild.children.map((nestedChild) => {
          const childPercent = (nestedChild.value / rowChild.value) * 100;
          const diffFromPrevious = allocateValue - nestedChild.value;
          const currentValueVariance = floor(
            (diffFromPrevious / nestedChild.value) * 100,
            2
          );
          return {
            ...nestedChild,
            value: floor((childPercent / 100) * allocateValue, 2),
            varience: currentValueVariance,
          };
        }),
      };
    }
    return rowChild;
  });

  return updatedRows;
};

const DataTable = () => {
  //   const [rowsData, setRowsData] = useState<DataChildModalInterface[]>(
  //     VALUE.rows
  //   );

  const [state, dispatch] = useReducer(customReducer, VALUE.rows);

  useEffect(() => {
    dispatch({
      type: "total",
      id: "",
      allocateValue: 0,
    });
  }, []);

  useEffect(() => {
    console.log("Row Data: ", state);
  }, [state]);

  const onRowUpdate = ({
    action,
    id,
    parentId,
    allocateValue,
  }: UpdateDataInterface) => {
    dispatch({
      type: action,
      id: id,
      parentId: parentId,
      allocateValue: allocateValue,
    });
  };

  return (
    <Box>
      <Center h="100vh">
        <VStack
          alignItems="stretch"
          p={4}
          borderRadius={4}
          boxShadow="0px 0px 5px #000000"
          spacing={6}
        >
          <SimpleGrid
            key="header"
            columns={6}
            spacingX={6}
            spacingY={4}
            justifyItems="center"
          >
            <TableHeader text="Label" />
            <TableHeader text="Value" />
            <TableHeader text="Input" />
            <TableHeader text="Allocation %" />
            <TableHeader text="Allocation value" />
            <TableHeader text="Varience %" />
          </SimpleGrid>
          <Divider orientation="horizontal" borderColor="black" />
          {state.map((row) => {
            return (
              <Fragment key={row.id}>
                <TableRow rowData={row} onRowUpdate={onRowUpdate} />
              </Fragment>
            );
          })}
        </VStack>
      </Center>
    </Box>
  );
};

const TableHeader = ({ text }: { text: string }) => {
  return (
    <Text fontSize="16px" fontWeight={500} lineHeight="1.25">
      {text}
    </Text>
  );
};

export default DataTable;
