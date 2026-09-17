import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "cn";

interface AvatarProps extends BaseAvatar.Root.Props {}

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "inline-flex size-8 items-center shrink-0 justify-center overflow-hidden rounded-full bg-muted align-middle text-sm leading-none font-normal",
        className,
      )}
      {...props}
    />
  );
}

interface AvatarImageProps extends BaseAvatar.Image.Props {}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <BaseAvatar.Image
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

interface AvatarFallbackProps extends BaseAvatar.Fallback.Props {}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback
      className={cn(
        "flex size-full select-none items-center justify-center text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
