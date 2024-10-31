import { useModalStore } from "@/store/create-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { z } from "zod";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const CreateAssetTypeModal = () => {
  const { isOpen, closeModal, type } = useModalStore();

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const slugify = (text: string) => _.kebabCase(text);

  const closeForm = () => {
    form.reset();
    closeModal();
  };

  return (
    <Dialog open={isOpen && type === "assetType"} onOpenChange={closeForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Asset Type</DialogTitle>
          <DialogDescription>
            Fill in the form below to create an asset type
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

export default CreateAssetTypeModal;
