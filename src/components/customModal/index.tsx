import "./styles.scss";

import { useSelector } from "react-redux";

import {
  modalContent,
  modalSize,
  modalStatus,
  modalTag,
  modalTemplate,
} from "../../store/selectors/RootSelector";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/components/customModal/modalSlice";
import { Modal } from "antd";

import TokenList from "../../views/tokenList";
import Notification from "src/views/notification";

const classNamePrefix = "custom-modal";

function CustomModal() {
  const dispatch = useDispatch<any>();

  const isOpen = useSelector(modalStatus);
  const template = useSelector(modalTemplate);
  const size = useSelector(modalSize);
  const tag = useSelector(modalTag);
  const content= useSelector(modalContent)

  const renderSize = (modalSize: string) => {
    switch (modalSize) {
      case "event":
        return 1084;
      case "large":
        return 713;
      case "normal":
        return 460;
      default:
        return 550;
    }
  };

  const generateContent = (template: string) => {
    switch (template) {
      case "token-list":
        return <TokenList tag={tag} />;
      case "notification":
        return <Notification content={content} />;
      default:
        return;
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      title=""
      open={isOpen}
      closable={false}
      onCancel={handleClose}
      wrapClassName="wrapper"
      style={{ width: renderSize(size) }}
      width={renderSize(size)}
      footer={null}
      centered={true}
      zIndex={2000}
      className={classNamePrefix}
    >
      {generateContent(template)}
    </Modal>
  );
}

export default CustomModal;
