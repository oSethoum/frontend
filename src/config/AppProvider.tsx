import { useState } from "react";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import rtlPlugin from "stylis-plugin-rtl";
import i18n from "@/i18n";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  const [rtl, setRtl] = useState(false);
  const rtlCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        dir: rtl ? "rtl" : "ltr",
        cursorType: "pointer",
      }}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={rtl ? rtlCache : undefined}
    >
      <NotificationsProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default AppProvider;
