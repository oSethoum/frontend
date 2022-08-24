import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/ui";
import { createClient, Provider } from "urql";
import { createContext, useMemo, useState } from "react";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { Button, useMantineColorScheme } from "@mantine/core";

interface IAppContext {
  url: string;
  token: string;
  setToken: (val: string | ((prevState: string) => string)) => void;
}

export const AppContext = createContext<IAppContext>({
  url: "",
  token: "",
  setToken: () => {},
});

function App() {
  const [url, setUrl] = useState("127.0.0.1:3001");
  const { toggleColorScheme } = useMantineColorScheme();
  const [token, setToken] = useLocalStorage({
    key: "jwtToken",
    defaultValue: "",
  });
  const client = useMemo(
    () =>
      createClient({
        url: url + "/query",
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
    <AppContext.Provider value={{ url, token, setToken }}>
      <Provider value={client}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
