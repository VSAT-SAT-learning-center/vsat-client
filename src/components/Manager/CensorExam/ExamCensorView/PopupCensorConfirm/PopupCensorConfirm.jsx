import classNames from "classnames/bind";
import styles from "./PopupCensorConfirm.module.scss";
const cx = classNames.bind(styles);

function PopupCensorConfirm({
  moduleCensorData,
  setCensorModuleFeedback,
  setIsShowConfirmCensor,
  setIsShowCensorFeedback,
  setIsShowModuleViewCensor,
}) {
  const handleApproveCensorModule = () => {
    setCensorModuleFeedback((prevFeedback) => ({
      ...prevFeedback,
      moduleTypesFeedback: [
        ...prevFeedback.moduleTypesFeedback.filter(
          (module) => module.moduleTypeId !== moduleCensorData.id
        ),
        {
          moduleTypeId: moduleCensorData.id,
          isRejected: false,
        },
      ],
    }));
    setIsShowConfirmCensor(false);
    setIsShowModuleViewCensor(false);
  };
  return (
    <div className={cx("popup-censor-confirm-wrapper")}>
      <div className={cx("popup-censor-confirm-container")}>
        <div className={cx("popup-censor-confirm-header")}>
          <button
            className={cx("close-btn")}
            onClick={() => setIsShowConfirmCensor(false)}
          >
            <i className={cx("fa-solid fa-xmark")}></i>
          </button>
        </div>
        <div className={cx("popup-censor-confirm-infor")}>
          <div className={cx("title")}>Confirm Censorship Action</div>
          <div className={cx("desc")}>
            Please select an action for this module. If rejecting, a reason is
            required. This decision will be final.
          </div>
        </div>
        <div className={cx("popup-censor-confirm-action")}>
          <button
            className={cx("action-btn", "reject")}
            onClick={() => setIsShowCensorFeedback(true)}
          >
            <i className={cx("fa-sharp fa-regular fa-ban", "btn-icon")}></i>
            <span className={cx("btn-text")}>Reject</span>
          </button>
          <button
            className={cx("action-btn", "approve")}
            onClick={handleApproveCensorModule}
          >
            <i className={cx("fa-sharp fa-regular fa-check", "btn-icon")}></i>
            <span className={cx("btn-text")}>Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCensorConfirm;
