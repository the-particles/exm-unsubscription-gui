import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./providers/theme-provider";
import router from "./routes";
import ServiceWorkerProvider from "./providers/service-worker-provider";
import NavigationProvider from "./providers/navigation-provider";
import HeaderProvider from "./providers/header-provider";
import { useEffect } from "react";

const RELOAD_FLAG_KEY = "should-reload-on-open";

const App = () => {
  useEffect(() => {
    const hasBeenOpened = sessionStorage.getItem(RELOAD_FLAG_KEY);

    if (hasBeenOpened === "true") {
      console.log("PWA đã được mở trong phiên này. Không cần tải lại.");
      return;
    }

    sessionStorage.setItem(RELOAD_FLAG_KEY, "true");

    console.log("Lần mở đầu tiên sau khi khởi động/tắt cứng. Đang tải lại...");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, []);

  return (
    <HeaderProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ServiceWorkerProvider>
          <NavigationProvider>
            <RouterProvider router={router} />
          </NavigationProvider>
        </ServiceWorkerProvider>
      </ThemeProvider>
    </HeaderProvider>
  );
};

export default App;
