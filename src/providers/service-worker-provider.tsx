import { useEffect, useState } from "react";
import { ServiceWorkerContext } from "./use-service-worker";
import { toast } from "sonner";
import { Toaster } from "@pars/shared/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@pars/shared/components/ui/alert-dialog";

type ServiceWorkerProviderProps = {
  children: React.ReactNode;
};

const HAS_NEW_WORKER_KEY = "HAS_NEW_WORKER_KEY";

const handleRefresh = () => {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};

const ServiceWorkerProvider = ({
  children,
  ...props
}: ServiceWorkerProviderProps) => {
  const [isReadyOffline, setIsReadyOffline] = useState(false);
  const [hasNewWorker, setHasNewWorker] = useState(() =>
    Boolean(localStorage.getItem(HAS_NEW_WORKER_KEY))
  );
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;

          if (installingWorker) {
            installingWorker.addEventListener("statechange", () => {
              if (
                installingWorker.state === "installed" &&
                registration.waiting
              ) {
                localStorage.setItem(HAS_NEW_WORKER_KEY, "true");
                setHasNewWorker(true);
                setNewWorker(installingWorker);
              }
            });
          }
        });

        if (registration.active) {
          setIsReadyOffline(true);
        }
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "SKIP_WAITING_ACK") {
          localStorage.removeItem(HAS_NEW_WORKER_KEY);
          handleRefresh();
          return;
        }

        toast.info(event.data);
      });
    }
  }, []);

  const skipWaiting = () => {
    if (newWorker) {
      newWorker.postMessage({ type: "SKIP_WAITING", data: { key: "value" } });
    }
  };

  return (
    <ServiceWorkerContext.Provider
      {...props}
      value={{ isReadyOffline, hasNewWorker }}
    >
      {children}

      <Toaster position={"bottom-center"} />
      <AlertDialog open={hasNewWorker} onOpenChange={setHasNewWorker}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              There is a new version available
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please update to ensure a seamless experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={skipWaiting}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ServiceWorkerContext.Provider>
  );
};

export default ServiceWorkerProvider;
