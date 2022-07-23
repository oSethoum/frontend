import { Title, Center } from "@mantine/core";
import { IconAB } from "@tabler/icons";

export function HomePage() {
  return (
    <Center sx={{ height: "100vh" }}>
      <Title>
        <IconAB size={128} />
      </Title>
    </Center>
  );
}

export default HomePage;
