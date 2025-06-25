import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@hooks/redux";
import { addToCart } from "@core/store/slices/cartSlices";
import React from "react";
import type { Product } from "@models/products/products.interface.ts";

interface AddToCartButtonProps {
  product: Product;
  size?: "large" | "middle" | "small";
  block?: boolean;
}

export function AddToCartButton(props: AddToCartButtonProps) {
  const { product, size = "large", block = false } = props;

  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Button
        type="primary"
        size={size}
        icon={<ShoppingCartOutlined />}
        onClick={handleAddToCart}
        block={block}
      >
        Добавить в корзину
      </Button>
    </div>
  );
}
