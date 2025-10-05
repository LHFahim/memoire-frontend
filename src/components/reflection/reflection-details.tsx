// import { IReflection } from "@/interfaces/reflection.interface";
// import Image from "next/image";

// export default function ReflectionDetails({
//   reflection,
// }: {
//   reflection: IReflection;
// }) {
//   console.log("object", reflection);
//   return (
//     <>
//       <section className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow p-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b pb-2">
//           {reflection.title}
//         </h1>

//         {reflection.image_url && (
//           <div className="relative w-full h-64 mb-4">
//             <Image
//               src={reflection.image_url}
//               alt={reflection.title}
//               fill
//               className="object-cover rounded-lg"
//             />
//           </div>
//         )}

//         <p className="text-sm text-gray-500 mb-6">
//           {new Date(reflection.createdAt).toLocaleString()}
//         </p>

//         <article className="space-y-4 text-gray-700 leading-relaxed">
//           {reflection.content.split("\n").map((line, i) => (
//             <p key={i}>{line}</p>
//           ))}
//         </article>
//       </section>
//     </>
//   );
// }

import { IReflection } from "@/interfaces/reflection.interface";
import { formatDate } from "@/lib/utils.lib";
import Image from "next/image";

// map mood -> styles + emoji
const MOOD_STYLES: Record<
  string,
  {
    emoji: string;
    accent: string; // border top
    badgeBg: string;
    badgeText: string;
    dot: string;
    placeholder: string; // bg for image placeholder
  }
> = {
  HAPPY: {
    emoji: "😊",
    accent: "border-yellow-400",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
    dot: "bg-yellow-400",
    placeholder: "from-yellow-100 to-yellow-50",
  },
  SAD: {
    emoji: "😢",
    accent: "border-blue-400",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    dot: "bg-blue-400",
    placeholder: "from-blue-100 to-blue-50",
  },
  ANGRY: {
    emoji: "😠",
    accent: "border-red-500",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    dot: "bg-red-500",
    placeholder: "from-red-100 to-red-50",
  },
  EXCITED: {
    emoji: "🤩",
    accent: "border-pink-500",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-800",
    dot: "bg-pink-500",
    placeholder: "from-pink-100 to-pink-50",
  },
  RELAXED: {
    emoji: "😌",
    accent: "border-green-400",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    dot: "bg-green-400",
    placeholder: "from-green-100 to-green-50",
  },
  NEUTRAL: {
    emoji: "😐",
    accent: "border-gray-400",
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-800",
    dot: "bg-gray-400",
    placeholder: "from-gray-100 to-gray-50",
  },
};

const moodMeta = (mood?: string) => {
  return MOOD_STYLES[mood ?? "NEUTRAL"] ?? MOOD_STYLES.NEUTRAL;
};

export default function ReflectionDetails({
  reflection,
}: {
  reflection: IReflection;
}) {
  const meta = moodMeta(reflection.mood);

  return (
    <section
      className={`max-w-3xl mx-auto mt-10 rounded-2xl shadow bg-white dark:bg-gray-900 p-8 border-t-8 ${meta.accent}`}
    >
      {/* header: title + mood */}
      <header className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {reflection.title} {meta.emoji}
          </h1>

          {/* mood badge */}
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${meta.badgeBg} ${meta.badgeText}`}
            title={`Mood: ${reflection.mood}`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
            {reflection.mood ?? "NEUTRAL"}
          </span>
        </div>

        {/* meta line */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {formatDate(reflection.createdAt as string)}
        </p>
      </header>

      {/* hero image */}
      <div className="relative w-full h-64 md:h-72 mb-6">
        {reflection.image_url ? (
          <Image
            src={reflection.image_url}
            alt={reflection.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        ) : (
          <div
            className={`h-full w-full rounded-xl bg-gradient-to-br ${meta.placeholder}`}
          />
        )}
      </div>

      {/* content */}
      <article className="prose dark:prose-invert max-w-none prose-p:my-3 prose-h2:mt-8">
        {String(reflection.content || "")
          .split("\n")
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </article>
    </section>
  );
}
