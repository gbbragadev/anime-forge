import { AnimeQuizApp } from "../components/AnimeQuizApp";
import { appConfig } from "../../app.config";
import quizJson from "../../../../content/quizzes/anime-archetype-v1.json";
import type { QuizBank } from "../lib/quiz";

const quiz = quizJson as unknown as QuizBank;

export default function HomePage() {
  return (
    <main className="af-shell">
      <header className="af-hero">
        <h1>{appConfig.name}</h1>
        <p>
          Descubra seu arquétipo anime em poucos cliques. Resultado shareable —
          personagens e arquétipos originais.
        </p>
      </header>
      <AnimeQuizApp
        quiz={quiz}
        archetypes={appConfig.personas}
        appName={appConfig.name}
        disclaimer={appConfig.legal.disclaimer}
        shareHooks={appConfig.share.tiktokHookTemplates}
      />
    </main>
  );
}
