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
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const { tenant } = useTenant();
  const navigate = useNavigate();
  const { userService } = useEndpoint();
  const { authenticate } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!tenant || tenant.name === "main") {
      navigate("/register");
    }
  }, [tenant, navigate]);

  const formSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(3),
    password: z
      .string()
      .min(6, { message: "Password should contain mimimum of 6 characters" })
      .max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = { ...data, tenantId: tenant.id };
    try {
      const token = await userService.login(payload);
      authenticate(token, Date.now() + 1000 * 60 * 60);
      navigate("/");
    } catch (err) {
      console.log("Error logging in", err);
      toast({
        title: "Error",
        description: "Error logging in",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login to {tenant?.name}</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
