import {
  Loader2,
  Store,
  type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: Store,
  spinner: Loader2,
} as const;
