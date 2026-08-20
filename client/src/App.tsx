/**
 * Signal Blueprint: the shell stays intentionally quiet so the guide itself
 * reads like a focused, technical field manual rather than an app dashboard.
 */
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}
