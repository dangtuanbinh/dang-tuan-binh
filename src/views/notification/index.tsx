import { Button } from "antd";
import React from "react";
import { CONSTANT } from "src/utils/constants";
import './styles.scss'
import { useDispatch } from "react-redux";
import { closeModal } from "src/store/components/customModal/modalSlice";

interface INotificationProps {
  content: string;
}

const classNamePrefix = "notification";

const Notification: React.FC<INotificationProps> = (props) => {
  const { content } = props;

  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    dispatch(closeModal())
  }

  return (
    <div className={classNamePrefix}>
      <h3>{content}</h3>

      <Button type="primary" onClick={handleCloseNotification}>{CONSTANT.ok}</Button>
    </div>
  );
};

export default Notification;
