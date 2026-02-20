import { Check } from "lucide-react";

interface PropsPointsSidebar {
  header: string;
  points: string[];
}

/**
 * PointsSidebar
 *
 * Displays a list of points (features/benefits) with checkmark icons.
 * Used in the authentication sidebar to highlight value propositions.
 */
export default function PointsSidebar({ header, points }: PropsPointsSidebar) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-primary-500 dark:text-primary-300">{header}</h2>
      <ul className="space-y-4">
        {Array.isArray(points) &&
          points.map((point, index) => (
            <li
              key={index}
              className="flex items-center gap-3 font-medium text-neutral-600 dark:text-neutral-300"
            >
              {/* Checkmark Icon Circle */}
              <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-primary-400 text-background">
                <Check className="h-[14px] w-[14px]" strokeWidth={5} />
              </div>

              <span className="max-w-[600px] text-lg text-neutral-600 dark:text-neutral-300">
                {point}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
