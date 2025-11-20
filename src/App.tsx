import { useEffect } from "react";
import ApiTest from "./pages/ApiTest";

export default function App() {
  useEffect(() => {
    document.title = import.meta.env.VITE_PROJECT_NAME;
  }, []);

  return <ApiTest />;
}
