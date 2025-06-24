import {
  Card,
  Row,
  Col,
  Spin,
  Select,
  Space,
  Typography,
  Alert,
  Rate,
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

const { Title, Text } = Typography;
const { Meta } = Card;

const productCategoryOptions = [
  { value: "electronics", label: "Электроника" },
  { value: "jewelery", label: "Украшения" },
  { value: "men's clothing", label: "Мужская одежда" },
  { value: "women's clothing", label: "Женская одежда" },
];

export function ProductsPage() {
  const [params, setParams] = useState<ProductsQueryParams>({
    limit: 12,
    sort: "asc",
  });
  const { category, ...restParams } = params;

  const productsQueryAll = useGetProductsQuery(restParams);
  const productsQueryByCategory = useGetProductsByCategoryQuery(
    { category: category || "", ...restParams },
    { skip: !category },
  );

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = category ? productsQueryByCategory : productsQueryAll;
  const handleSortChange = (value: "asc" | "desc") => {
    setParams((prev) => ({ ...prev, sort: value }));
  };

  const handleCategoryChange = (value: string | undefined) => {
    setParams((prev) => ({ ...prev, category: value }));
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
          {products.map((product: Product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Link
                to={ROUTE_PATHS.PRODUCTS_ID.replace(":id", String(product.id))}
              >
                <Card
                  hoverable
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
                  actions={[
                    <AddToCartButton product={product} size="middle" />,
                  ]}
                >
                  <Meta
                    title={product.title}
                    description={
                      <div>
                        <Text
                          strong
                          style={{
                            fontSize: 16,
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          {product.price} ₽
                        </Text>
                        <Text type="secondary" style={{ display: "block" }}>
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
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
