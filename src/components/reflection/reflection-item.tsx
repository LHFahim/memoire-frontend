"use client";

import { IReflection } from "@/interfaces/reflection.interface";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ReflectionItem({
  reflection,
}: {
  reflection: IReflection;
}) {
  const params = useParams();

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
          {/* <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          {reflection.content.length > 100
            ? `${reflection.content.slice(0, 100)}...`
            : reflection.content}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link href={`${params?.dashboardId}/reflections/${reflection.id}`}>
            <Button variant="link">View Reflection</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
