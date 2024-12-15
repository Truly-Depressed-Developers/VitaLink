export function Screen({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={className}>
      {title && <h1 className="my-4 text-center text-xl">{title}</h1>}
      {children}
    </div>
  );
}
