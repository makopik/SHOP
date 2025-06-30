import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@hooks/redux";
import { addToCart } from "@core/store/slices/cartSlices";
import React from "react";
import type { Product } from "@models/products/products.interface.ts";
import { addNotification } from "@core/store/slices/notificationsSlice.ts";

interface AddToCartButtonProps {
  product: Product;
  size?: "large" | "middle" | "small";
  block?: boolean;
  style?: React.CSSProperties;
}

export function AddToCartButton(props: AddToCartButtonProps) {
  const { product, size = "large", block = false, style } = props;

  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      dispatch(addToCart(product));
      dispatch(
        addNotification({
          type: "success",
          message: "Товар добавлен в корзину",
          description: `${product.title} успешно добавлен в вашу корзину`,
        }),
      );
    } catch {
      dispatch(
        addNotification({
          type: "error",
          message: "Ошибка добавления",
          description: "Не удалось добавить товар в корзину",
        }),
      );
    }
  };

  return (
    <div>
      <Button
        type="primary"
        size={size}
        icon={<ShoppingCartOutlined />}
        onClick={handleAddToCart}
        block={block}
        style={style}
      >
        Добавить в корзину
      </Button>
    </div>
  );
}
