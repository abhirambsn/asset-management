import { useModalStore } from "@/store/create-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { OWNER_DATA } from "@/utils/constants";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { createAssetFormSchema } from "@/utils/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const CreateAssetModal = () => {
  const { isOpen, closeModal, type } = useModalStore();

  const form = useForm<z.infer<typeof createAssetFormSchema>>({
    resolver: zodResolver(createAssetFormSchema),
    defaultValues: {
      name: "",
      owner: "",
      os: "",
      osVersion: "",
      model: "",
      classification: "",
      assetValue: 0,
      assetType: ""
    },
  });

  const onSubmit = (data: z.infer<typeof createAssetFormSchema>) => {
    console.log(data);
  };
  return (
    <Dialog open={isOpen && type === "asset"} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Asset</DialogTitle>
          <DialogDescription>
            Fill in the Asset Details to track it
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Asset" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Owner</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? OWNER_DATA.find((o) => o.id === field.value)?.name
                            : "Select Owner"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search Owner..." />
                        <CommandList>
                          <CommandEmpty>No owner found.</CommandEmpty>
                          <CommandGroup>
                            {OWNER_DATA.map((row) => (
                              <CommandItem
                                value={row.name}
                                key={row.name}
                                onSelect={() => {
                                  form.setValue("owner", row.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    row.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {row.name}
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

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? OWNER_DATA.find((o) => o.id === field.value)
                                  ?.name
                              : "Select Type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Type..." />
                          <CommandList>
                            <CommandEmpty>No asset type found.</CommandEmpty>
                            <CommandGroup>
                              {OWNER_DATA.map((row) => (
                                <CommandItem
                                  value={row.name}
                                  key={row.name}
                                  onSelect={() => {
                                    form.setValue("assetType", row.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      row.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {row.name}
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
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Model</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? OWNER_DATA.find((o) => o.id === field.value)
                                  ?.name
                              : "Select Model"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Model..." />
                          <CommandList>
                            <CommandEmpty>No model found.</CommandEmpty>
                            <CommandGroup>
                              {OWNER_DATA.map((row) => (
                                <CommandItem
                                  value={row.name}
                                  key={row.name}
                                  onSelect={() => {
                                    form.setValue("model", row.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      row.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {row.name}
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
            </div>
            <div className="flex gap-2">
            <FormField
                control={form.control}
                name="os"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Operating System</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? OWNER_DATA.find((o) => o.id === field.value)
                                  ?.name
                              : "Select Operating System"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Model..." />
                          <CommandList>
                            <CommandEmpty>No Operating System found.</CommandEmpty>
                            <CommandGroup>
                              {OWNER_DATA.map((row) => (
                                <CommandItem
                                  value={row.name}
                                  key={row.name}
                                  onSelect={() => {
                                    form.setValue("os", row.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      row.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {row.name}
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
              <FormField
                control={form.control}
                name="osVersion"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>OS Version</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? OWNER_DATA.find((o) => o.id === field.value)
                                  ?.name
                              : "Select OS Version"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search OS Version..." />
                          <CommandList>
                            <CommandEmpty>No OS Version found.</CommandEmpty>
                            <CommandGroup>
                              {OWNER_DATA.map((row) => (
                                <CommandItem
                                  value={row.name}
                                  key={row.name}
                                  onSelect={() => {
                                    form.setValue("osVersion", row.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      row.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {row.name}
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
            </div>
            
            <FormField 
            control={form.control}
            name="classification"
            render={({field}) => (
              <FormItem className="grid gap-2">
                <FormLabel>Asset Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Asset Classification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="not_important">Not Important</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField 
            control={form.control}
            name="assetValue"
            render={() => (
              <FormItem className="grid gap-2">
                <FormLabel>Asset Value</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Asset Value" {...form.register('assetValue', {valueAsNumber: true})} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit">
              <Plus />
              <span>Create Asset</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssetModal;
