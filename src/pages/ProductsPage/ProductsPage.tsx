import {
  Alert,
  Button,
  Card,
  Col,
  Rate,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "@models/products/endpoints.ts";
import type {
  Product,
  ProductsQueryParams,
} from "@models/products/products.interface.ts";
import { categoryTranslations } from "@constants/categoryTranslations.ts";
import { ROUTE_PATHS } from "@constants/routePaths.ts";

import { AddToCartButton } from "@components/Button/AddToCartButton/AddToCartButton.tsx";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { productCategoryOptions } from "@pages/ProductsPage/ProductsPage.constants.ts";
import { ProductModal } from "@pages/ProductsPage/component/ProductModal/ProductModal.tsx";
import {
  selectProductMetadata,
  toggleVisibility,
} from "@core/store/slices/productMetadataSlice.ts";
import { selectIsAdmin } from "@core/store/slices/authSlice.ts";
import { addNotification } from "@core/store/slices/notificationsSlice.ts";

const { Title, Text } = Typography;
const { Meta } = Card;

export function ProductsPage() {
  const [params, setParams] = useState<ProductsQueryParams>({
    limit: 12,
    sort: "asc",
  });

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const { category, ...restParams } = params;

  const productsQueryAll = useGetProductsQuery(restParams);
  const productsQueryByCategory = useGetProductsByCategoryQuery(
    { category: category || "", ...restParams },
    { skip: !category },
  );
  const isAdmin = useAppSelector(selectIsAdmin);
  const metadata = useAppSelector(selectProductMetadata);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = category ? productsQueryByCategory : productsQueryAll;

  const dispatch = useAppDispatch();

  const handleSortChange = (value: "asc" | "desc") => {
    setParams((prev) => ({ ...prev, sort: value }));
  };
  const handleCategoryChange = (value: string | undefined) => {
    setParams((prev) => ({ ...prev, category: value }));
  };
  const handleOpenPriceModal = (product: Product) => {
    setCurrentProduct(product);
    setPriceModalVisible(true);
  };

  const handleHideProduct = (id: number) => {
    try {
      dispatch(toggleVisibility(id));
      dispatch(
        addNotification({
          type: "success",
          message: metadata[id]?.isHidden ? "Товар показан" : "Товар скрыт",
        }),
      );
    } catch {
      dispatch(
        addNotification({
          type: "error",
          message: "Ошибка изменения видимости",
        }),
      );
    }
  };
  if (isError) {
    return (
      <Alert
        message="Ошибка загрузки товаров"
        description={error?.toString()}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Каталог товаров</Title>

      <Space style={{ marginBottom: 24 }}>
        <Select<"asc" | "desc">
          value={params.sort}
          onChange={handleSortChange}
          options={[
            { value: "asc", label: "По возрастанию цены" },
            { value: "desc", label: "По убыванию цены" },
          ]}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Выберите категорию"
          onChange={handleCategoryChange}
          options={productCategoryOptions}
          style={{ width: 200 }}
          allowClear
        />
      </Space>

      {isLoading ? (
        <Spin size="large" style={{ display: "block", margin: "40px auto" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product: Product) => {
            const productMeta = metadata[product.id] || {};
            const isHidden = productMeta.isHidden;
            const customPrice = productMeta.customPrice;

            if (!isAdmin && isHidden) return null;
            return (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  style={{
                    border: isHidden ? "1px dashed #ff4d4f" : undefined,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                  }}
                  hoverable
                >
                  <div style={{ opacity: isHidden ? 0.6 : 1, flex: 1 }}>
                    <Link
                      to={ROUTE_PATHS.PRODUCTS_ID.replace(
                        ":id",
                        String(product.id),
                      )}
                      style={{ display: "block", height: "100%" }}
                    >
                      <Card
                        cover={
                          <img
                            alt={product.title}
                            src={product.image}
                            style={{
                              height: 200,
                              objectFit: "contain",
                              padding: 16,

                              background: "#f5f5f5",
                            }}
                          />
                        }
                        style={{ height: "100%", borderStyle: "none" }}
                      >
                        <Meta
                          title={product.title}
                          description={
                            <div>
                              {isHidden && (
                                <Text
                                  type="danger"
                                  style={{ display: "block", marginBottom: 8 }}
                                >
                                  (Скрыт для пользователей)
                                </Text>
                              )}
                              <Text
                                strong
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  marginBottom: 4,
                                }}
                              >
                                {customPrice ?? product.price} ₽
                                {customPrice &&
                                  customPrice !== product.price && (
                                    <Text
                                      delete
                                      type="secondary"
                                      style={{ marginLeft: 8, fontSize: 14 }}
                                    >
                                      {product.price} ₽
                                    </Text>
                                  )}
                              </Text>
                              <Text
                                type="secondary"
                                style={{ display: "block" }}
                              >
                                Категория:{" "}
                                {categoryTranslations[product.category] ||
                                  product.category}
                              </Text>
                              <Rate
                                disabled
                                allowHalf
                                value={product.rating.rate}
                                style={{ fontSize: 14 }}
                              />
                            </div>
                          }
                        />
                      </Card>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isAdmin ? "1fr 1fr" : "1fr",
                      gap: "8px",
                      marginTop: "16px",
                    }}
                  >
                    {" "}
                    {isAdmin && (
                      <Space style={{ width: "100%" }}>
                        <Button
                          onClick={() => handleOpenPriceModal(product)}
                          type="primary"
                          style={{ flex: 1 }}
                        >
                          Изменить цену
                        </Button>
                        <Button
                          onClick={() => handleHideProduct(product.id)}
                          type={isHidden ? "primary" : "default"}
                          style={{ flex: 1 }}
                        >
                          {isHidden ? "Показать" : "Скрыть"}
                        </Button>
                      </Space>
                    )}
                    {!isAdmin && (
                      <AddToCartButton
                        product={product}
                        style={{ width: "100%" }}
                        block
                      />
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <ProductModal
        visible={priceModalVisible}
        product={currentProduct}
        onCancel={() => setPriceModalVisible(false)}
      />
    </div>
  );
}
