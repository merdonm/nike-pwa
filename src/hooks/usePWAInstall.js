import { useEffect, useState } from "react";

export default function usePWAInstall() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // stop auto prompt
      setPromptEvent(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const installedHandler = () => {
      console.log("App installed 🎉");
      setIsInstallable(false);
    };

    window.addEventListener("appinstalled", installedHandler);

    return () => window.removeEventListener("appinstalled", installedHandler);
  }, []);

  const install = async () => {
    if (!promptEvent) return;

    promptEvent.prompt();
    const choice = await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      console.log("User installed ✅");
    } else {
      console.log("User dismissed ❌");
    }

    setPromptEvent(null);
    setIsInstallable(false);
  };

  return { isInstallable, install };
}
