import { updateProfileAction } from "@/actions/account-profile.actions";
import { AccountProfile } from "@/components/account/account-profile";
import { AccountSecurity } from "@/components/account/account-security";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAccountProfile } from "@/lib/account-profile.api";

export default async function AccountPage() {
  const user = await fetchAccountProfile();

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Account Settings
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your profile, security and billing preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="space-x-10">
          <TabsTrigger value="profile">Profile</TabsTrigger>

          <TabsTrigger value="security">Security</TabsTrigger>

          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form action={updateProfileAction}>
            <AccountProfile user={user} />
          </form>
        </TabsContent>

        <TabsContent value="security">
          <AccountSecurity />
        </TabsContent>

        <TabsContent value="billing">
          <div className="border rounded-lg p-4 font-semibold text-2xl">
            This system is free to use and does not have billing features :D
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
