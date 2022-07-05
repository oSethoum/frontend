import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { createClient, Provider } from "urql";
import { useTokenStore } from "./auth";
import rtlPlugin from "stylis-plugin-rtl";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  // load config and theme always before rendering the app
  const [rtl, setRtl] = useState(false);
  const rtlCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
  });

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
        theme={{ colorScheme: "dark", dir: rtl ? "rtl" : "ltr" }}
        withGlobalStyles
        withNormalizeCSS
        emotionCache={rtl ? rtlCache : undefined}
      >
        <NotificationsProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default AppProvider;
