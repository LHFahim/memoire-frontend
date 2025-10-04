import { IReflectionResponse } from "@/interfaces/reflection.interface";
import ReflectionItem from "./reflection-item";

export default function ReflectionCard({
  reflection,
}: {
  reflection: IReflectionResponse;
}) {
  const reflections = reflection.items;
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reflections.length === 0 ? (
          <p>No Reflections as of now</p>
        ) : (
          reflections.map((item) => {
            return <ReflectionItem key={item.id} reflection={item} />;
          })
        )}
      </section>
    </>
  );
}
