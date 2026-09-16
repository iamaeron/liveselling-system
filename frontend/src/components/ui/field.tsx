import { Field as BaseField } from "@base-ui/react/field";
import { cn } from "cn";

interface FieldProps extends BaseField.Root.Props {}

function Field({ className, ...props }: FieldProps) {
  return (
    <BaseField.Root
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

interface FieldLabelProps extends BaseField.Label.Props {}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cn(
        "text-sm font-medium text-foreground pl-2 inline-block",
        className,
      )}
      {...props}
    />
  );
}

interface FieldControlProps extends BaseField.Control.Props {}

function FieldControl({ className, ...props }: FieldControlProps) {
  return <BaseField.Control className={cn(className)} {...props} />;
}

interface FieldDescriptionProps extends BaseField.Description.Props {}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={cn("text-muted-foreground text-sm pl-2", className)}
      {...props}
    />
  );
}

interface FieldItemProps extends BaseField.Item.Props {}

function FieldItem({ className, ...props }: FieldItemProps) {
  return <BaseField.Item className={cn(className)} {...props} />;
}

interface FieldErrorProps extends BaseField.Error.Props {}

function FieldError({ className, ...props }: FieldErrorProps) {
  return <BaseField.Error className={cn(className)} {...props} />;
}

interface FieldValidityProps extends BaseField.Validity.Props {}

function FieldValidity(props: FieldValidityProps) {
  return <BaseField.Validity {...props} />;
}

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldItem,
  FieldError,
  FieldValidity,
};
