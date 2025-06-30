import { notification } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { removeNotification } from "@core/store/slices/notificationsSlice";

export function Notifications() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    notifications.forEach(
      ({ id, type, message, description, duration = 3 }) => {
        if (!notification[type]) return;

        api[type]({
          key: id,
          message,
          description,
          duration,
          placement: "bottomRight",
          style: {
            marginBottom: "24px",
          },
          onClose: () => dispatch(removeNotification(id)),
        });
      },
    );
  }, [notifications, api, dispatch]);

  return contextHolder;
}
