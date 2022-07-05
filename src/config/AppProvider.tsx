import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useMemo } from "react";
import { createClient, Provider } from "urql";
import { useTokenStore } from "./auth";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  const { token } = useTokenStore();
  const client = useMemo(
    () =>
      createClient({
        url: "https://graphql.datenbank.de/graphql",
        fetchOptions: {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      }),
    [token]
  );

  return (
    <Provider value={client}>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default AppProvider;
