import {
  Typography,
  Button,
  Card,
  Col,
  Empty,
  InputNumber,
  List,
  Row,
  Image,
  Popconfirm,
  Badge,
  Pagination,
} from "antd";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  updateQuantity,
} from "@core/store/slices/cartSlices.ts";
import { useAppDispatch, useAppSelector } from "@hooks/redux.ts";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ROUTE_PATHS } from "@constants/routePaths.ts";
import { useState } from "react";
import { addNotification } from "@core/store/slices/notificationsSlice.ts";

const { Title, Text } = Typography;

const PAGE_SIZE = 4;

export function CartPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentItems = items.slice(startIndex, endIndex);

  const handleQuantityChange = (id: number, quantity: number | null) => {
    if (quantity !== null && quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(
      addNotification({
        type: "success",
        message: "Корзина очищена",
      }),
    );
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="mb-6 flex items-center">
        <ShoppingCartOutlined className="mr-2" />
        Ваша корзина
        {items.length > 0 && (
          <Badge
            count={items.length}
            className="ml-3"
            style={{ backgroundColor: "#1890ff" }}
          />
        )}
      </Title>

      {items.length === 0 ? (
        <Card className="text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ваша корзина пуста"
          >
            <Button type="primary" href={ROUTE_PATHS.MAIN}>
              Перейти к покупкам
            </Button>
          </Empty>
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <div className="flex justify-end mb-4">
              <Popconfirm
                title="Очистить корзину?"
                description="Вы уверены, что хотите удалить все товары из корзины?"
                onConfirm={handleClearCart}
                okText="Да"
                cancelText="Нет"
              >
                <Button type="dashed" danger icon={<DeleteOutlined />}>
                  Очистить корзину
                </Button>
              </Popconfirm>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={currentItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Удалить товар из корзины?"
                      onConfirm={() => handleRemove(item.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        title="Удалить"
                      />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain"
                        preview={false}
                      />
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <div className="flex flex-wrap items-center mt-2">
                        <div className="mr-4">
                          <Text strong className="text-lg">
                            {item.price.toFixed(2)} ₽
                          </Text>
                        </div>
                        <div className="flex items-center">
                          <Text className="mr-2">Количество:</Text>
                          <InputNumber
                            min={1}
                            max={99}
                            value={item.quantity}
                            onChange={(value) =>
                              handleQuantityChange(item.id, value)
                            }
                            className="w-20"
                          />
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={items.length}
              onChange={setCurrentPage}
              style={{ marginTop: 24, textAlign: "center" }}
              showSizeChanger={false}
            />
          </Col>

          <Col xs={24} md={8}>
            <Card title="Сводка заказа" className="sticky top-4">
              <div style={{ marginBottom: "10px" }}>
                <div className="flex justify-between text-lg">
                  <Text strong>Итого: </Text>
                  <Text strong>{totalPrice.toFixed(2)} ₽</Text>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                style={{ marginBottom: "10px" }}
              >
                Оформить заказ
              </Button>

              <Button
                type="default"
                block
                className="mt-2 mb-2"
                href={ROUTE_PATHS.MAIN}
              >
                Продолжить покупки
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
