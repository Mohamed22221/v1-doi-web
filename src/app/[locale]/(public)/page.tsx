"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@components/ui/button";
import { SunIcon, MoonIcon, LanguagesIcon } from "@components/shared/icon/constant";
import Icon from "@components/shared/icon";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Checkbox } from "@components/ui/checkbox";
import { Switch } from "@components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Separator } from "@components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@components/ui/input-otp";
import { Calendar } from "@components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormLayoutProvider } from "@components/forms/form-layout";
import { RHFInput } from "@components/forms/rhf-input";
import { RHFTextarea } from "@components/forms/rhf-textarea";
import { RHFSelect } from "@components/forms/rhf-select";
import { RHFPhoneInput } from "@components/forms/rhf-phone-input";
import { RHFInputOTP } from "@components/forms/rhf-otp";
import { RHFPassword } from "@components/forms/rhf-password";
import { RHFToggleGroup } from "@components/forms/rhf-toggle-group";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@components/ui/responsive-modal";

const floatingFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  country: z.string().min(1, "Please select a country"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(9, "Invalid phone number"),
});

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      username: "",
      bio: "",
      terms: false,
      notifications: true,
      type: "all",
      category: "",
      otp: "",
      date: isMounted ? new Date() : undefined,
      radioSm: "opt1",
      radioMd: "opt1",
      radioLg: "opt1",
      radioXl: "opt1",
      phone: "",
      password: "",
      toggleGroupDemo: "used",
    },
  });

  const floatingForm = useForm({
    resolver: zodResolver(floatingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      country: "",
      password: "",
      phone: "",
    },
  });

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleDir = () => {
    const newDir = dir === "ltr" ? "rtl" : "ltr";
    setDir(newDir);
    document.documentElement.dir = newDir;
  };

  return (
    <div className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">
      <header className="mx-auto mb-12 flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Components Gallery</h1>
          <p className="text-muted-foreground italic">
            Refactored with custom CSS & logical properties
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={toggleDark} variant="outline" size="icon">
            {isDark ? (
              <Icon icon={SunIcon} className="size-5" />
            ) : (
              <Icon icon={MoonIcon} className="size-5" />
            )}
          </Button>
          <Button onClick={toggleDir} variant="outline" size="sm" className="gap-2">
            <Icon icon={LanguagesIcon} className="size-4" />
            {dir === "ltr" ? "English" : "العربية"}
          </Button>
        </div>
      </header>

      <main>
        {/* Forms Section */}
        <section>
          <h2 className="mb-8 border-b pb-2 text-2xl font-semibold">Form Components Showcase</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Standard Inputs */}
            <CardWrapper title="Standard Inputs">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-demo">Input Field</Label>
                  <Input id="input-demo" placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textarea-demo">Textarea</Label>
                  <Textarea id="textarea-demo" placeholder="Type your message..." />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="checkbox-demo" />
                  <Label htmlFor="checkbox-demo">Accept terms and conditions</Label>
                </div>
              </div>
            </CardWrapper>

            {/* Selection & Toggles */}
            <CardWrapper title="Selection & Toggles">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="switch-demo">Push Notifications</Label>
                  <Switch id="switch-demo" defaultChecked />
                </div>
                <div className="space-y-3">
                  <Label>Preferred Contact</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Fruit</Label>
                  <Select defaultValue="apple">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardWrapper>

            {/* Complex Components */}
            <CardWrapper title="Complex Controls">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>One-Time Password</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="space-y-2">
                  <Label>Date Selector</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-start font-normal"
                      >
                        Select a date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={isMounted ? new Date() : undefined} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardWrapper>

            {/* States & Validation */}
            <CardWrapper title="States & Validation">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-destructive">Invalid State</Label>
                  <Input
                    aria-invalid="true"
                    defaultValue="Incorrect value"
                    className="border-destructive"
                  />
                  <p className="text-xs text-destructive">This field has an error message.</p>
                </div>
                <div className="pointer-events-none space-y-2 opacity-50">
                  <Label>Disabled Field</Label>
                  <Input disabled placeholder="Cannot type here" />
                </div>
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>React Hook Form</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn/ui form integration" {...field} />
                          </FormControl>
                          <FormDescription>This is a managed form item.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </CardWrapper>

            {/* Floating Label Forms */}
            <CardWrapper title="Floating Label Forms">
              <Form {...floatingForm}>
                <form className="space-y-6">
                  <FormLayoutProvider layout="floating" size="lg">
                    <RHFInput
                      control={floatingForm.control}
                      name="fullName"
                      label="Full Name"
                      required
                      inputProps={{ placeholder: " " }}
                    />
                    <RHFInput
                      control={floatingForm.control}
                      name="email"
                      label="Email Address"
                      required
                      inputProps={{ type: "email", placeholder: " " }}
                    />
                    <RHFSelect
                      control={floatingForm.control}
                      name="country"
                      label="Country"
                      required
                      placeholder="Select your country"
                      options={[
                        { value: "eg", label: "Egypt" },
                        { value: "sa", label: "Saudi Arabia" },
                        { value: "ae", label: "UAE" },
                        { value: "us", label: "United States" },
                      ]}
                    />
                    <RHFTextarea
                      control={floatingForm.control}
                      name="message"
                      label="Message"
                      required
                      textareaProps={{ placeholder: " ", rows: 4 }}
                    />
                    <Button type="button" className="w-full">
                      Submit Form
                    </Button>
                  </FormLayoutProvider>
                </form>
              </Form>
            </CardWrapper>

            {/* Radio Group Sizes */}

            {/* Specialized Components Showcase */}
            <CardWrapper title="Specialized Custom Components">
              <div className="space-y-6">
                <Form {...form}>
                  <form className="space-y-4">
                    <RHFPhoneInput
                      control={form.control}
                      name="phone"
                      label="Phone Number"
                      inputProps={{ placeholder: "5xxxxxxx" }}
                      layout="floating"
                      extraLabel="05xxxxxxxx"
                    />
                  </form>
                </Form>
                <Separator />
                <Form {...floatingForm}>
                  <form className="space-y-4">
                    <FormLayoutProvider layout="floating" size="lg">
                      <RHFPhoneInput
                        control={floatingForm.control}
                        name="phone"
                        label="Floating Phone"
                        layout="floating"
                      />
                    </FormLayoutProvider>
                  </form>
                </Form>
              </div>
            </CardWrapper>

            {/* Password Input Showcase */}
            <CardWrapper title="Password Input (Input Group)">
              <div className="space-y-6">
                <Form {...form}>
                  <form className="space-y-4">
                    <RHFPassword
                      control={form.control}
                      name="password"
                      label="Standard Password"
                      inputProps={{ placeholder: "Enter your password" }}
                    />
                  </form>
                </Form>
                <Separator />
                <Form {...floatingForm}>
                  <form className="space-y-4">
                    <FormLayoutProvider layout="floating" size="lg">
                      <RHFPassword
                        control={floatingForm.control}
                        name="password"
                        label="Floating Password"
                        required
                      />
                    </FormLayoutProvider>
                  </form>
                </Form>
              </div>
            </CardWrapper>

            {/* OTP Input Showcase */}
            <CardWrapper title="OTP Input Sizes">
              <div className="space-y-8">
                <Form {...form}>
                  <form className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Small (sm)</Label>
                      <RHFInputOTP control={form.control} name="otp" maxLength={4} size="sm" />
                    </div>
                    <Separator />
                    <div>
                      <Label className="mb-2 block">Medium (md/default)</Label>
                      <RHFInputOTP control={form.control} name="otp" maxLength={4} size="md" />
                    </div>
                    <Separator />
                    <div>
                      <Label className="mb-2 block">Large (lg - 56px, 16px radius)</Label>
                      <RHFInputOTP control={form.control} name="otp" maxLength={4} size="lg" />
                    </div>
                  </form>
                </Form>
              </div>
            </CardWrapper>

            {/* Toggle Group Showcase (User Request) */}
            <CardWrapper title="Toggle Group (Pill Shape)">
              <div className="space-y-6">
                <Form {...form}>
                  <form className="space-y-4">
                    <RHFToggleGroup
                      rounded="sm"
                      size="md"
                      control={form.control}
                      name="toggleGroupDemo"
                      label="Item Condition (Toggle Group)"
                      options={[
                        { label: "مستعمل", value: "used" },
                        { label: "جديد", value: "new" },
                      ]}
                      defaultValue="used"
                    />
                  </form>
                </Form>
              </div>
            </CardWrapper>

            {/* Radio Choice Buttons */}

            {/* Button Gallery (Radius XS Focus) */}
            <CardWrapper title="Button Radius (Default: xs)">
              <div className="flex flex-wrap gap-3">
                <Button rounded="xs" variant="default">
                  Default (XS)
                </Button>
                <Button rounded="sm" variant="secondary">
                  Secondary
                </Button>
                <Button rounded="md" variant="outline">
                  Outline
                </Button>
                <Button rounded="lg" variant="destructive">
                  Destructive
                </Button>
                <Button rounded="xl" variant="success">
                  Success SM
                </Button>
                <Button rounded="full" variant="warning">
                  Warning XS
                </Button>
              </div>
            </CardWrapper>

            {/* Radius Scales */}
            <CardWrapper title="Border Radius Scales">
              <div className="grid grid-cols-2 gap-3">
                <Button rounded="none">none</Button>
                <Button rounded="xs">xs (8px)</Button>
                <Button rounded="sm">sm (12px)</Button>
                <Button rounded="md">md (16px)</Button>
                <Button rounded="lg">lg (24px)</Button>
                <Button rounded="xl">xl (32px)</Button>
                <Button rounded="full" className="col-span-2">
                  full (100px)
                </Button>
              </div>
            </CardWrapper>
          </div>
        </section>

        {/* Existing Sections for Shadows & Colors (Simplified) */}
        <section className="grid gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:grid-cols-2">
          <CardWrapper title="Custom Shadows">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border bg-card p-4 text-center text-xs shadow-sm">
                Small
              </div>
              <div className="rounded-md border bg-card p-4 text-center text-xs shadow-md">
                Medium
              </div>
              <div className="rounded-md border bg-card p-4 text-center text-xs shadow-lg">
                Large
              </div>
              <div className="rounded-md border bg-card p-4 text-center text-xs shadow-xl">XL</div>
            </div>
          </CardWrapper>
          <CardWrapper title="Color System">
            <div className="flex flex-wrap gap-2">
              <div className="size-8 rounded bg-primary" />
              <div className="size-8 rounded bg-secondary" />
              <div className="size-8 rounded bg-accent" />
              <div className="size-8 rounded bg-destructive" />
              <div className="size-8 rounded bg-success" />
              <div className="size-8 rounded bg-warning" />
            </div>
          </CardWrapper>

          {/* New Responsive Modal Showcase */}
          <CardWrapper title="Responsive Modal (Dialog / Drawer)">
            <div className="space-y-4">
              <ResponsiveModal>
                <ResponsiveModalTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Default (md)
                  </Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent>
                  <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Default Responsive Modal</ResponsiveModalTitle>
                    <ResponsiveModalDescription>
                      Centered on desktop (max-w-lg), bottom drawer on mobile.
                    </ResponsiveModalDescription>
                  </ResponsiveModalHeader>
                  <div className="m-4 rounded-md border border-dashed p-4 py-8 text-center text-muted-foreground">
                    Content Area
                  </div>
                </ResponsiveModalContent>
              </ResponsiveModal>

              <ResponsiveModal>
                <ResponsiveModalTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Custom Width (max-w-4xl)
                  </Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent className="sm:max-w-4xl">
                  <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Wide Desktop Modal</ResponsiveModalTitle>
                    <ResponsiveModalDescription>
                      This modal is wider on desktop thanks to <code>sm:max-w-4xl</code>.
                    </ResponsiveModalDescription>
                  </ResponsiveModalHeader>
                  <div className="rounded-md border border-dashed p-1 py-8 text-center text-muted-foreground">
                    Wide Content Area
                  </div>
                </ResponsiveModalContent>
              </ResponsiveModal>

              <ResponsiveModal fullScreenMobile>
                <ResponsiveModalTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    Full Screen Mobile
                  </Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent>
                  <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Full Screen Mobile</ResponsiveModalTitle>
                    <ResponsiveModalDescription>
                      Takes 100% height on mobile screens.
                    </ResponsiveModalDescription>
                  </ResponsiveModalHeader>
                  <div className="p-4 py-8 text-center text-muted-foreground">
                    Full screen mobile content...
                  </div>
                </ResponsiveModalContent>
              </ResponsiveModal>
            </div>
          </CardWrapper>
        </section>
      </main>
    </div>
  );
}

function CardWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-card/50 p-6 shadow-xs transition-shadow hover:shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-foreground/80">{title}</h3>
      {children}
    </div>
  );
}
