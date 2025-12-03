import { useTranslation } from "@refinedev/core";
import { useForm } from "react-hook-form";

import { Button } from "@/core/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import type { LocationNode, LocationType } from "../types";

export type LocationFormValues = {
  name: string;
  type: LocationType;
  parentId: string | null;
};

export type LocationFormMode = "create" | "edit";

interface LocationFormProps {
  mode: LocationFormMode;
  initialValues: LocationFormValues;
  locations: LocationNode[];
  onSubmit: (values: LocationFormValues) => void;
  onCancel: () => void;
}

export function LocationForm({
  mode,
  initialValues,
  locations,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const { translate } = useTranslation();

  const form = useForm<LocationFormValues>({
    defaultValues: initialValues,
  });

  const title =
    mode === "create"
      ? translate("location.form.create_title", "Add Location")
      : translate("location.form.edit_title", "Edit Location");

  const subtitle =
    mode === "create"
      ? translate(
          "location.form.create_subtitle",
          "Create a new site, building, floor, or zone.",
        )
      : translate(
          "location.form.edit_subtitle",
          "Update location details and hierarchy.",
        );

  const submitLabel =
    mode === "create"
      ? translate("location.form.create_submit", "Create")
      : translate("location.form.edit_submit", "Save changes");

  const parentOptions = locations;

  const handleSubmit = (values: LocationFormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-xl space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: translate(
                "location.form.validation.name_required",
                "Name is required",
              ),
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("location.form.fields.name", "Name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    placeholder={translate(
                      "location.form.placeholders.name",
                      "Building A - Floor 1",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("location.form.fields.type", "Type")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        field.onChange(value as LocationType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "location.form.placeholders.type",
                            "Select type",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="site">
                          {translate("location.types.site", "Site")}
                        </SelectItem>
                        <SelectItem value="building">
                          {translate("location.types.building", "Building")}
                        </SelectItem>
                        <SelectItem value="floor">
                          {translate("location.types.floor", "Floor")}
                        </SelectItem>
                        <SelectItem value="zone">
                          {translate("location.types.zone", "Zone")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("location.form.fields.parent", "Parent")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? "__root__"}
                      onValueChange={(value) =>
                        field.onChange(value === "__root__" ? null : value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "location.form.placeholders.parent",
                            "Select parent (optional)",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__root__">
                          {translate("location.form.parent.root", "No parent (Site)")}
                        </SelectItem>
                        {parentOptions.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {translate("buttons.cancel", "Cancel")}
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
