import { useServiceWorker } from "@pars/providers/use-service-worker";
import { CloudAlert, CloudCheck, CloudDownload } from "lucide-react";

const OfflineStatus = () => {
  const { isReadyOffline, hasNewWorker } = useServiceWorker();

  return (
    <div>
      {hasNewWorker ? (
        <CloudDownload />
      ) : isReadyOffline ? (
        <CloudCheck />
      ) : (
        <CloudAlert />
      )}
    </div>
  );
};

export default OfflineStatus;
