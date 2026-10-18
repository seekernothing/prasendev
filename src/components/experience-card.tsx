import { type Experience } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ExperienceCardProps {
  experience: Experience;
}

// Turns *text* into bold text inside descriptions.
function parseDescription(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <strong key={index} className="font-medium text-foreground">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function getPeriod(experience: Experience) {
  const { startDate, endDate, isCurrent } = experience;
  if (isCurrent) return startDate ? `${startDate} - Present` : "Present";
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  return startDate || endDate;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const period = getPeriod(experience);

  const companyName = (
    <h3
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight",
        experience.isBlur && "select-none blur-[5px]",
      )}
    >
      {experience.company}
    </h3>
  );

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {/* Left: company, badges, position */}
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          {experience.website && !experience.isBlur ? (
            <Link
              href={experience.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {companyName}
            </Link>
          ) : (
            companyName
          )}

          {experience.isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-green-500/15 px-2 py-0.5 text-xs font-medium text-foreground">
              <span className="size-2 animate-pulse rounded-full bg-green-500" />
              Working
            </span>
          )}

          {experience.contract && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Contract
            </span>
          )}
        </div>

        <p className="text-muted-foreground">{experience.position}</p>

        {experience.description.length > 0 && (
          <div className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
            {experience.description.map((line) => (
              <p key={line}>{parseDescription(line)}</p>
            ))}
          </div>
        )}
      </div>

      {/* Right: dates and location */}
      <div className="flex shrink-0 flex-col text-sm text-muted-foreground sm:text-right sm:text-base">
        {period && <p>{period}</p>}
        <p>{experience.location}</p>
      </div>
    </div>
  );
}