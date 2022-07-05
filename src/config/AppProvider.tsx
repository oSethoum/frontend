import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useMemo } from "react";
import { createClient } from "urql";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  const client = useMemo(
    () =>
      createClient({
        url: "https://graphql.datenbank.de/graphql",
        fetchOptions: {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.TOKEN,
          },
        },
      }),
    []
  );

  return (
    <MantineProvider>
      <NotificationsProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default AppProvider;
