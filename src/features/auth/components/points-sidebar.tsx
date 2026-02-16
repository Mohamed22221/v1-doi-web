import { Check } from 'lucide-react'

interface PropsPointsSidebar {
    header: string
    points: string[]
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
            <h2 className="font-bold text-primary-500 dark:text-primary-300 text-lg">
                {header}
            </h2>
            <ul className="space-y-4">
                {Array.isArray(points) && points.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 font-medium">
                        {/* Checkmark Icon Circle */}
                        <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-primary-400 text-background shrink-0">
                            <Check className="w-[14px] h-[14px] " strokeWidth={5} />
                        </div>

                        <span className='text-neutral-600 dark:text-neutral-300 max-w-[600px] text-lg'>
                            {point}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}