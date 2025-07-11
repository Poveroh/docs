interface LastUpdatedProps {
  date: string | Date;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-sm text-muted-foreground">
      Last Updated: {formattedDate}
    </div>
  );
}
