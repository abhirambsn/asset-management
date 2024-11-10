import { useModalStore } from "@/store/create-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, DeleteIcon, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useWorkspace } from "@/store/workspace";
import { useEndpoint } from "@/hooks/endpoint-hook";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/hooks/use-toast";

const CreateAssetModelModal = () => {
  const { isOpen, closeModal, type } = useModalStore();
  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");
  const { currentWorkspace } = useWorkspace();
  const { tenantService } = useEndpoint();
  const authState = useAuthStore();
  const { toast } = useToast();

  const formSchema = z.object({
    id: z.string({ required_error: "ID is required" }),
    type: z.string({ required_error: "Type is required" }),
    name: z
      .string({ required_error: "Model is required" })
      .min(2, "Type should contain minimum of 2 characters"),
    company: z
      .string({ required_error: "Company is required" })
      .min(2, "Type should contain minimum of 2 characters"),
    releaseDate: z.date({ required_error: "Release Date is required" }),
    specs: z.record(z.string(), z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      type: "",
      name: undefined,
      company: undefined,
      releaseDate: new Date(),
      specs: {} as Record<string, string>,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!authState || !currentWorkspace) return;
    console.log(data);
    try {
      const response = await tenantService.createAssetModel(
        data.name,
        data.specs,
        data.company,
        data.releaseDate.getFullYear(),
        data.type,
        currentWorkspace.id,
        authState.token
      );
      console.log("DEBUG: response", response);
      toast({
        title: "Success",
        description: "Asset model created successfully",
      });
      closeForm();
    } catch (err) {
      console.log("Error creating asset model", err);
      toast({
        title: "Error",
        description: "Error creating asset model",
        variant: "destructive",
      });
    }
  };

  const slugify = (text: string) => _.kebabCase(text);

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>>
  ) => {
    form.setValue("id", slugify(e.target.value));
    field.onChange(e);
  };

  const closeForm = () => {
    form.reset();
    setSpecName("");
    setSpecValue("");
    closeModal();
  };

  const addSpec = (
    field: ControllerRenderProps<z.infer<typeof formSchema>>
  ) => {
    if (!specName.length || !specValue.length) return;
    field.onChange({
      ...(field.value as Record<string, string>),
      [specName]: specValue,
    });
    setSpecName("");
    setSpecValue("");
  };

  const removeSpec = (key: string) => {
    form.setValue(
      "specs",
      Object.fromEntries(
        Object.entries(form.getValues("specs")).filter(([k]) => k !== key)
      )
    );
  };

  return (
    <Dialog open={isOpen && type === "model"} onOpenChange={closeForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Asset Model</DialogTitle>
          <DialogDescription>
            Fill in the form below to create an asset model
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
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
                name="type"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Asset Type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {currentWorkspace &&
                          currentWorkspace.assetTypes.map((assetType) => (
                            <SelectItem key={assetType.id} value={assetType.id}>
                              {assetType.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleNameChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Release Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="specs"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specifications</FormLabel>
                  {field.value && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Spec Name</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(field.value).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableHead>{key}</TableHead>
                            <TableCell>{value}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                onClick={() => removeSpec(key)}
                                variant="outline"
                                className="p-2"
                              >
                                <DeleteIcon className="text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Spec Name"
                        value={specName}
                        onChange={(e) => setSpecName(e.target.value)}
                      />
                      <Input
                        placeholder="Value"
                        value={specValue}
                        onChange={(e) => setSpecValue(e.target.value)}
                      />
                      <Button type="button" onClick={() => addSpec(field)}>
                        <Plus />
                      </Button>
                    </div>
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

export default CreateAssetModelModal;
