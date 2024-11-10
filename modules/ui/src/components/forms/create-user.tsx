import { useModalStore } from "@/store/create-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { ROLES } from "@/utils/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTenant } from "@/hooks/tenant-hook";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/auth-store";
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useUser } from "@/store/user";
import { useToast } from "@/hooks/use-toast";

type Role = "ADMIN" | "READ" | "WRITE";

const CreateUserModal = () => {
  const { isOpen, closeModal, type } = useModalStore();
  const { tenant } = useTenant();
  const authState = useAuthStore();
  const { userService } = useEndpoint();
  const { user } = useUser();
  const { toast } = useToast();

  const formSchema = z
    .object({
      firstName: z.string().min(2, {
        message: "First name should contain minimum of 2 characters",
      }),
      lastName: z.string().min(2, {
        message: "Last name should contain minimum of 2 characters",
      }),
      username: z.string().min(2, {
        message: "Username should contain minimum of 2 characters",
      }),
      email: z.string().email({ message: "Enter a valid email" }),
      password: z
        .string()
        .min(6, { message: "Password should contain mimimum of 6 characters" })
        .max(100),
      confirmPassword: z.string().min(6, {
        message: "Password should contain mimimum of 6 characters",
      }),
      roles: z.array(z.enum(ROLES), { message: "Select at least one role" }),
      tenantId: z.string().default(tenant.id),
    })
    .refine(
      (data) => data.password !== "" && data.password === data.confirmPassword,
      {
        message: "Passwords do not match",
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!authState || !tenant) return;
    if (!user.roles.includes("ADMIN")) {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to perform this action",
        variant: "destructive",
      });
      return;
    }
    console.log(data);
    try {
      const response = await userService.createTenantUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        tenant.id,
        data.username,
        data.roles,
        authState.token
      );
      console.log("DEBUG: response", response);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      closeForm();
    } catch (err) {
      console.error("DEBUG: error", err);
      toast({
        title: "Error",
        description: "An error occurred while creating the User",
        variant: "destructive",
      });
    }
  };

  const closeForm = () => {
    form.reset();
    closeModal();
  };

  const toggleSelectRole = (
    row: Role,
    field: ControllerRenderProps<z.infer<typeof formSchema>>
  ) => {
    const currentRoles = field.value as Role[];
    if (field.value.includes(row)) {
      field.onChange(currentRoles.filter((role) => role !== row));
    } else {
      field.onChange([...field.value, row]);
    }
  };

  return (
    <Dialog open={isOpen && type === "user"} onOpenChange={closeForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a user to tenant</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a user to the Tenant
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !(field.value.length > 0) && "text-muted-foreground"
                          )}
                        >
                          {field.value.length > 0
                            ? field.value.join(", ")
                            : "Select Role"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search Role..." />
                        <CommandList>
                          <CommandEmpty>No Role found.</CommandEmpty>
                          <CommandGroup>
                            {ROLES.map((row) => (
                              <CommandItem
                                value={row}
                                key={row}
                                onSelect={() => toggleSelectRole(row, field)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(row)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {row}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Plus />
              <span>Create User</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
