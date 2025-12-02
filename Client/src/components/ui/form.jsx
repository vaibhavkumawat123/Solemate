import React, { createContext, useContext } from "react";
import { Controller, useFormContext, FormProvider } from "react-hook-form";


// ---------------- Context ----------------
const FormFieldContext = createContext({});

// ---------------- Hook ----------------
function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(ItemContext);

  if (!fieldContext) {
    throw new Error("useFormField must be used within a FormField");
  }

  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
}

// ---------------- Form ----------------
export function Form({ children, ...form }) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit} className={form.className}>
        {children}
      </form>
    </FormProvider>
  );
}

// ---------------- FormField ----------------
export function FormField({ name, control, render }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldContext.Provider value={{ name }}>
          {render({ field })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

// ---------------- Item Context ----------------
const ItemContext = createContext({});

// ---------------- FormItem ----------------
export function FormItem({ className = "", ...props }) {
  const id = React.useId();

  return (
    <ItemContext.Provider value={{ id }}>
      <div className={`space-y-2 ${className}`} {...props} />
    </ItemContext.Provider>
  );
}

// ---------------- FormLabel ----------------
export function FormLabel({ className = "", ...props }) {
  const { error, formItemId } = useFormField();

  return (
    <label
      htmlFor={formItemId}
      className={`text-sm font-medium leading-none ${
        error ? "text-destructive" : "text-foreground"
      } ${className}`}
      {...props}
    />
  );
}

// ---------------- FormControl ----------------
export function FormControl({ ...props }) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      id={formItemId}
      aria-describedby={
        formDescriptionId ? `${formDescriptionId} ${formMessageId}` : undefined
      }
      aria-invalid={!!useFormField().error}
      {...props}
    />
  );
}

// ---------------- FormDescription ----------------
export function FormDescription({ className = "", ...props }) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
}

// ---------------- FormMessage ----------------
export function FormMessage({ className = "", children, ...props }) {
  const { error, formMessageId } = useFormField();

  if (!error) return null;

  return (
    <p
      id={formMessageId}
      className={`text-sm font-medium text-destructive ${className}`}
      {...props}
    >
      {children || String(error?.message)}
    </p>
  );
}
