import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Loader } from "./components/Loader/Loader";

function App() {
  const { loading } = useData();

  return (
    <div className="App">
      <Header />
      {loading && <Loader />}
      <NavRoutes />
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#2a2a2a',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
          success: { 
            duration: 1500,
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#ffffff',
            },
          },
          error: { 
            duration: 1500,
            iconTheme: {
              primary: '#f44336',
              secondary: '#ffffff',
            },
          },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
    </div>
  );
}

export default App;