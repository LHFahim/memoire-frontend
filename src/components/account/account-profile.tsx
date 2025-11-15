"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IAccountProfile } from "@/interfaces/account-profile.interface";
import { Badge } from "../ui/badge";

export function AccountProfile({ user }: { user: IAccountProfile }) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          {user.avatarUrl ? (
            <AvatarImage
              src={user.avatarUrl}
              alt={user.firstName + " " + user.lastName}
            />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>

        <div className="space-y-1">
          <CardTitle className="text-lg leading-none">
            {user.firstName + " " + user.lastName}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <Badge variant="outline" className="mt-1">
            {user.isEmailVerified
              ? "Email is verified"
              : "Email is not verified"}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-4 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={user.firstName}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" defaultValue={user.lastName} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            disabled
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user.phone || ""}
            disabled
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Save changes</Button>
      </CardFooter>
    </Card>
  );
}
