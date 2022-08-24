import { Title, Center, Button, useMantineColorScheme } from "@mantine/core";

export function HomePage() {
  const { toggleColorScheme } = useMantineColorScheme();
  return (
    <Center sx={{ height: "100vh" }}>
      <Title>
        <Button onClick={() => toggleColorScheme()}>Toggle</Button>
      </Title>
    </Center>
  );
}

export default HomePage;
