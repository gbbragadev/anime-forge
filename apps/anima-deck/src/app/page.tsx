import { AnimaDeckApp } from "../components/AnimaDeckApp";
import { appConfig } from "../../app.config";

export default function HomePage() {
  return (
    <main className="af-shell">
      <AnimaDeckApp
        archetypes={appConfig.personas}
        appName={appConfig.name}
        disclaimer={appConfig.legal.disclaimer}
        shareHooks={appConfig.share.tiktokHookTemplates}
      />
    </main>
  );
}
