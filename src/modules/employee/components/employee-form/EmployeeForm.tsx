import type { UseFormReturnType } from "@refinedev/react-hook-form";
import { useTranslation } from "@refinedev/core";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";
import type { EmployeeFormValues } from "@/modules/employee/schema";

export type EmployeeFormProps = {
  form: UseFormReturnType<EmployeeFormValues, any>;
  mode: "create" | "edit";
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
};

export const EmployeeForm = ({ form, mode, onSubmit, onCancel }: EmployeeFormProps) => {
  const { translate } = useTranslation();

  const title =
    mode === "create"
      ? translate("employee.create.title", "Add New Employee")
      : translate("employee.edit.title", "Edit Employee");

  const subtitle =
    mode === "create"
      ? translate(
          "employee.create.subtitle",
          "Add a new security employee to the system",
        )
      : translate(
          "employee.edit.subtitle",
          "Update employee details and assignments",
        );

  const submitLabel =
    mode === "create"
      ? translate("employee.create.submit", "Add Employee")
      : translate("employee.edit.submit", "Save Changes");

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("employee.fields.full_name", "Full Name")}
                </FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.employee_id", "Employee ID")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.status", "Status")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "employee.placeholders.status",
                            "Select status",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          {translate("employee.status.active", "Active")}
                        </SelectItem>
                        <SelectItem value="on_duty">
                          {translate("employee.status.on_duty", "On Duty")}
                        </SelectItem>
                        <SelectItem value="on_leave">
                          {translate("employee.status.on_leave", "On Leave")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.email", "Email")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.phone", "Phone")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.role", "Role")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "employee.placeholders.role",
                            "Select role",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security_guard">
                          {translate(
                            "employee.role.security_guard",
                            "Security Guard",
                          )}
                        </SelectItem>
                        <SelectItem value="supervisor">
                          {translate("employee.role.supervisor", "Supervisor")}
                        </SelectItem>
                        <SelectItem value="manager">
                          {translate("employee.role.manager", "Manager")}
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
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("employee.fields.shift", "Shift")}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate(
                            "employee.placeholders.shift",
                            "Select shift",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          {translate(
                            "employee.shift.morning",
                            "Morning (6AM - 2PM)",
                          )}
                        </SelectItem>
                        <SelectItem value="evening">
                          {translate(
                            "employee.shift.evening",
                            "Evening (2PM - 10PM)",
                          )}
                        </SelectItem>
                        <SelectItem value="night">
                          {translate(
                            "employee.shift.night",
                            "Night (10PM - 6AM)",
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("employee.fields.location", "Location")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={translate(
                      "employee.placeholders.location",
                      "Building A - Main Entrance",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
};
