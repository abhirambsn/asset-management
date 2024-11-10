import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTenant } from "@/hooks/tenant-hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const { tenant, subdomain } = useTenant();
  const { userService } = useEndpoint();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (tenant && subdomain !== "") {
      navigate("/login");
    }
  }, [tenant, subdomain, navigate]);
  const formSchema = z
    .object({
      firstName: z.string().min(2, {
        message: "First name should contain minimum of 2 characters",
      }),
      lastName: z.string().min(2, {
        message: "Last name should contain minimum of 2 characters",
      }),
      email: z.string().email({ message: "Enter a valid email" }),
      username: z.string().min(3, {
        message: "Username should contain minimum of 3 characters",
      }),
      password: z
        .string()
        .min(6, { message: "Password should contain mimimum of 6 characters" })
        .max(100),
      confirmPassword: z
        .string()
        .min(6, { message: "Password should contain mimimum of 6 characters" })
        .max(100),
      tenantName: z.string().min(2, {
        message: "Tenant name should contain minimum of 2 characters",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      confirmPassword: "",
      tenantName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!tenant || subdomain !== "") return;
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Bad Request",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await userService.createTenantUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.tenantName,
        data.username,
        ["ADMIN"],
        ""
      );

      console.log("DEBUG: user create response", response);
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (err) {
      console.error("DEBUG: error", err);
      toast({
        title: "Error",
        description: "An error occurred while creating the Tenant",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Register a new Tenant &amp; Create a Tenant Admin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tenantName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Tenant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ACME Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
