import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsSection = () => {

  const [profile, setProfile] = useState({ name: "Chris Munoz", email: "munozchris484@gmail.com" });
  const [notifications, setNotifications] = useState({ scans: true, weekly: false });
  const [plan, setPlan] = useState("pro");
  const [branding, setBranding] = useState({ domain: "", color: "#131313" });
  const [integrations, setIntegrations] = useState({ webhook: "", apiKey: "sk_live_6X••••••••••••" });
  const [security, setSecurity] = useState({ twoFA: false });

  const payments = [
    { id: "inv_1009", date: "2025‑05‑01", amount: "$9.00", status: "Paid" },
    { id: "inv_1008", date: "2025‑04‑01", amount: "$9.00", status: "Paid" },
    { id: "inv_1007", date: "2025‑03‑01", amount: "$9.00", status: "Paid" },
  ];

  return (
    <div className="flex-1 px-6 py-10 overflow-x-hidden
    scrollbar-none
    ">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">Settings</h2>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* PROFILE */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>

        {/* PASSWORD */}
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Update Password</Button>
          </CardFooter>
        </Card>

        {/* NOTIFICATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notify me on every scan</span>
              <Switch
                checked={notifications.scans}
                onCheckedChange={(v) => setNotifications({ ...notifications, scans: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly summary email</span>
              <Switch
                checked={notifications.weekly}
                onCheckedChange={(v) => setNotifications({ ...notifications, weekly: v })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Preferences</Button>
          </CardFooter>
        </Card>

        {/* SUBSCRIPTION */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Current Plan</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger>
                {plan === "free" ? "Starter (Free)" : plan === "pro" ? "Pro – $9/mo" : "Business – $29/mo"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Starter (Free)</SelectItem>
                <SelectItem value="pro">Pro – $9/mo</SelectItem>
                <SelectItem value="business">Business – $29/mo</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Update Plan</Button>
          </CardFooter>
        </Card>

        {/* BRANDING */}
        <Card>
          <CardHeader>
            <CardTitle>Branding & Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Custom Domain</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={branding.domain}
                onChange={(e) => setBranding({ ...branding, domain: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="color">Default QR Color</Label>
              <Input
                id="color"
                type="color"
                value={branding.color}
                onChange={(e) => setBranding({ ...branding, color: e.target.value })}
                className="h-10 p-1"
              />
            </div>
            <div>
              <Label htmlFor="logo">Default Logo</Label>
              <Input id="logo" type="file" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Branding</Button>
          </CardFooter>
        </Card>

        {/* INTEGRATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input
                id="webhook"
                placeholder="https://yourapp.com/webhook"
                value={integrations.webhook}
                onChange={(e) => setIntegrations({ ...integrations, webhook: e.target.value })}
              />
            </div>
            <div>
              <Label>API Key</Label>
              <Input value={integrations.apiKey} readOnly className="text-muted-foreground" />
              <Button size="sm" className="mt-2">Regenerate Key</Button>
            </div>
          </CardContent>
        </Card>

        {/* SECURITY */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Two‑Factor Authentication</span>
              <Switch
                checked={security.twoFA}
                onCheckedChange={(v) => setSecurity({ twoFA: v })}
              />
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive-foreground mt-2"
            >
              Logout of all sessions
            </Button>
          </CardContent>
        </Card>

        {/* BILLING HISTORY */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                    <TableHead className="px-6 py-3">Invoice</TableHead>
                    <TableHead className="px-6 py-3">Date</TableHead>
                    <TableHead className="px-6 py-3 text-center">Amount</TableHead>
                    <TableHead className="px-6 py-3 text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/30">
                      <TableCell className="px-6 py-4 font-medium">{p.id}</TableCell>
                      <TableCell className="px-6 py-4">{p.date}</TableCell>
                      <TableCell className="px-6 py-4 text-center">{p.amount}</TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-600 text-xs font-medium">
                          {p.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="ml-auto">Download Invoices</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SettingsSection;
