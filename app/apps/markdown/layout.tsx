export default function MarkDownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-5">
      {children}
    </section>
  );
}
