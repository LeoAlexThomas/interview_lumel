import DataTable from "@/components/DataTable";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

const HomePage = () => {
  return (
    <Box bg="white" h="100vh">
      <Head>
        <title>Home Page</title>
      </Head>
      <DataTable />
    </Box>
  );
};

export default HomePage;
