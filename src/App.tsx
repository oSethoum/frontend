import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/ui";
import { Box } from "@mantine/core";
import { createClient, Provider } from "urql";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "@mantine/hooks";

interface User {
  id: number;
  username: string;
}

interface IAppContext {
  url: string;
  token: string;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: (val: string | ((prevState: string) => string)) => void;
}

export const AppContext = createContext<IAppContext>({
  url: "",
  token: "",
  user: null,
  setUser: () => {},
  setToken: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage({
    key: "jwtToken",
    defaultValue: "",
  });
  const [url, setUrl] = useState("http://localhost:3001");
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
    <AppContext.Provider value={{ url, token, setToken, user, setUser }}>
      <Provider value={client}>
        <Box
          sx={(theme) => ({
            height: "100vh",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
          })}
        >
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </Box>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
