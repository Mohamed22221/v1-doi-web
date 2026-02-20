export default function TitleForm({ title, className }: { title: string; className?: string }) {
  return (
    <h2
      className={`hidden text-center font-bold text-neutral-950 md:text-2xl tablet:block dark:text-neutral-50 ${className}`}
    >
      {title}
    </h2>
  );
}
