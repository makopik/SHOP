import { useEffect, useState } from "react";
import { Modal, InputNumber, message } from "antd";
import { useAppDispatch } from "@hooks/redux.ts";
import { updatePrice } from "@core/store/slices/productMetadataSlice.ts";
import type { Product } from "@models/products/products.interface.ts";

interface PriceModalProps {
  visible: boolean;
  product: Product | null;
  onCancel: () => void;
}

export function ProductModal({ visible, product, onCancel }: PriceModalProps) {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<number>(product?.price || 0);

  useEffect(() => {
    if (product) {
      setPrice(product.price);
    }
  }, [product]);

  const handleOk = () => {
    if (!product) {
      console.warn("No product selected for price update");
      return;
    }

    try {
      dispatch(updatePrice({ id: product.id, price }));
      console.log("Price update action dispatched");
      message.success("Цена успешно обновлена");
      onCancel();
    } catch (error) {
      console.error("Price update failed:", error);
      message.error("Ошибка при обновлении цены");
    }
  };
  return (
    <Modal
      title={`Изменение цены для ${product?.title || "товара"}`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <div style={{ margin: "24px 0" }}>
        <InputNumber
          value={price}
          onChange={(value) => setPrice(value || 0)}
          min={0}
          step={0.01}
          style={{ width: "100%" }}
          formatter={(value) => `${value} ₽`}
          parser={(value) => parseFloat(value?.replace(" ₽", "") || "0")}
        />
      </div>
    </Modal>
  );
}
