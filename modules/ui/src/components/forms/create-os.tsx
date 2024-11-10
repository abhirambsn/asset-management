import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { useModalStore } from "@/store/create-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/store/workspace";

const CreateOSModal = () => {
  const { isOpen, closeModal, type } = useModalStore();
  const authState = useAuthStore();
  const { tenantService } = useEndpoint();
  const { currentWorkspace } = useWorkspace();
  const { toast } = useToast();

  const formSchema = z.object({
    id: z.string({ required_error: "ID is required" }),
    name: z.string({ required_error: "Name is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!authState || !currentWorkspace) return;
    console.log(data);
    try {
      const response = await tenantService.createOSType(
        data.name,
        currentWorkspace.id,
        authState.token
      );
      console.log("DEBUG: response", response);
      toast({
        title: "Success",
        description: "OS Type created successfully",
      });
      closeForm();
    } catch (err) {
      console.error("DEBUG: error", err);
      toast({
        title: "Error",
        description: "An error occurred while creating the OS Type",
        variant: "destructive",
      });
    }
  };

  const slugify = (text: string) => _.kebabCase(text);

  const closeForm = () => {
    form.reset();
    closeModal();
  };
  return (
    <Dialog open={isOpen && type === "os"} onOpenChange={closeForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create OS</DialogTitle>
          <DialogDescription>
            Fill in the form below to create an OS Entry
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.setValue("id", slugify(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Plus />
              <span>Create</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOSModal;
