import { useCartSync } from "@pages/CartPage/hooks/useCartSync.ts";

export function CartSync({ children }: { children: React.ReactNode }) {
  useCartSync();
  return <>{children}</>;
}
