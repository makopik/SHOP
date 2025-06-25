import { Spin, Alert, Typography, Rate, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@models/products/endpoints.ts";

import { categoryTranslations } from "@constants/categoryTranslations.ts";

import { AddToCartButton } from "@components/Button/AddToCartButton/AddToCartButton.tsx";
const { Title, Text } = Typography;

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "40px auto" }} />
    );
  }

  if (isError || !product) {
    return (
      <Alert
        message="Ошибка загрузки товара"
        description={error?.toString() || "Не удалось найти товар"}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              background: "#f5f5f5",
              padding: 24,
              borderRadius: 8,
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{product.title}</Title>
          <Text
            strong
            style={{ fontSize: 24, display: "block", marginBottom: 16 }}
          >
            {product.price} ₽
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
            Категория:{" "}
            {categoryTranslations[product.category] || product.category}
          </Text>
          <Rate
            disabled
            allowHalf
            value={product.rating.rate}
            style={{ fontSize: 16 }}
          />

          <div style={{ marginTop: 24 }}>
            <AddToCartButton product={product} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Title level={4}>Описание</Title>
            <Text>{product.description}</Text>
          </div>
        </Col>
        <div style={{ marginTop: 48 }}>
          <Title level={4}>Отзывы</Title>
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "16px 0",
              }}
            >
              <Text strong>Пользователь {idx + 1}</Text>
              <div style={{ margin: "8px 0" }}>
                <Rate disabled allowHalf defaultValue={4 - idx * 0.5} />
              </div>
              <Text>
                Очень доволен покупкой! Всё пришло вовремя и в отличном
                состоянии.
              </Text>
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}
