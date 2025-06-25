import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import {
  type CartState,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  setCart,
} from "@core/store/slices/cartSlices.ts";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";

export function useCartSync() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemsCount = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [storedCart, setStoredCart] = useLocalStorage<CartState>("cart", {
    items: [],
    itemsCount: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (storedCart) {
      dispatch(setCart(storedCart));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStoredCart({ items, itemsCount, totalPrice });
  }, [items, itemsCount, totalPrice, setStoredCart]);
}
