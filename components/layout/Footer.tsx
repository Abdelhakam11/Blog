import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          Built with Next.js, TanStack Query & Tailwind CSS
        </p>
        <p className="text-xs text-slate-400">
          Data from{" "}
          <span className="font-medium text-slate-500">JSONPlaceholder</span>
        </p>
      </Container>
    </footer>
  );
}
