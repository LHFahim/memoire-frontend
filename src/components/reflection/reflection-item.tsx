import { deleteReflectionAction } from "@/actions/reflection-actions";
import { IReflection } from "@/interfaces/reflection.interface";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuDialog } from "../dropdown/dropdown-menu-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ReflectionItem({
  reflection,
  dashboardId,
}: {
  reflection: IReflection;
  dashboardId: string;
}) {
  const deleteRAction = deleteReflectionAction.bind(null, {
    reflectionId: reflection.id as string,
    dashboardId: dashboardId as string,
  });

  return (
    <div className="hover:scale-[1.01] transition-transform">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="mb-2">{reflection.title}</CardTitle>
          <CardDescription>
            <Image
              src={reflection.image_url! || ""}
              alt={reflection.title}
              width={500}
              height={300}
              className="object-cover rounded-2xl"
            />
          </CardDescription>
          <CardAction>
            <DropdownMenuDialog deleteAction={deleteRAction} />
          </CardAction>
        </CardHeader>
        <CardContent>
          {reflection.content.length > 100
            ? `${reflection.content.slice(0, 100)}...`
            : reflection.content}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link href={`${dashboardId}/reflections/${reflection.id}`}>
            <Button variant="link">View Reflection</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
