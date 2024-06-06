import { useEffect, useState } from "react";
import {
  CaretDownOutlined,
  PlusCircleOutlined,
  SnippetsOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";
import { openModal } from "../../store/components/customModal/modalSlice";
import { CONSTANT } from "src/utils/constants";
import {
  selectedPayToken,
  selectedReceiveToken,
} from "src/store/selectors/RootSelector";
import { IToken } from "src/utils/types/token";
import { formatNumber } from "src/utils/commons/formatNumber";
import { FallingLines } from "react-loader-spinner";

const classNamePrefix = "swap-form";

const SwapForm = () => {
  const dispatch = useDispatch();

  const selectedPayTokenFromModal = useSelector(selectedPayToken);
  const seletedReceiveTokenFromModal = useSelector(selectedReceiveToken);

  const [payAmount, setPayAmount] = useState<number>(0);
  const [payValue, setPayValue] = useState<number>(0);
  const [payToken, setPayToken] = useState<IToken>(selectedPayTokenFromModal);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [receiveToken, setReceiveToken] = useState<IToken>(
    seletedReceiveTokenFromModal
  );
  const [balance, setBalance] = useState<number>(1000);

  const [valueError, setValueError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setPayAmount(0);
    setPayValue(0);
    setReceiveAmount(0);
  };

  const handleChooseToken = (tag: string) => {
    dispatch(
      openModal({
        template: CONSTANT.token_list,
        tag: tag,
      })
    );

    resetForm();
  };

  const handleSwapToken = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(
        openModal({
          template: CONSTANT.noti,
          size: "normal",
          content: CONSTANT.swap_sucess,
        })
      );
      resetForm();
    }, 2000);
  };

  useEffect(() => {
    if (selectedPayTokenFromModal) {
      setPayToken(selectedPayTokenFromModal);
    }
    if (seletedReceiveTokenFromModal) {
      setReceiveToken(seletedReceiveTokenFromModal);
    }
  }, [selectedPayTokenFromModal, seletedReceiveTokenFromModal]);

  useEffect(() => {
    if (selectedPayTokenFromModal && selectedPayTokenFromModal.price) {
      setPayValue(selectedPayTokenFromModal.price * payAmount);
    }
  }, [payAmount, selectedPayTokenFromModal]);

  useEffect(() => {
    if (payValue && seletedReceiveTokenFromModal) {
      setReceiveAmount(payValue / seletedReceiveTokenFromModal.price);
    }
  }, [payValue, seletedReceiveTokenFromModal]);

  useEffect(() => {
    if (payAmount > 1000) {
      setBalance(0);
      setValueError(true);
    } else {
      const remainingBalance = 1000 - payAmount;
      setBalance(remainingBalance);
      setValueError(false);
    }
  }, [payAmount]);

  useEffect(() => {
    if (payAmount === 0) {
      setReceiveAmount(0);
    }
  }, [payAmount]);

  return (
    <div className={classNamePrefix}>
      <section className={`${classNamePrefix}__header`}>
        <h3>{CONSTANT.swap_asset}</h3>
        <div className={`${classNamePrefix}__header-tools`}>
          <a href="/">
            <SnippetsOutlined />
          </a>

          <a href="/">
            <UnorderedListOutlined />
          </a>
        </div>
      </section>

      <form className={`${classNamePrefix}__form`}>
        <div className={`${classNamePrefix}__form-item`}>
          <div className={`${classNamePrefix}__input-group pay`}>
            <div className={`${classNamePrefix}__input-group-header`}>
              <span>{CONSTANT.pay}</span>

              <div className={`${classNamePrefix}__balance`}>
                <WalletOutlined />

                <div className={`${classNamePrefix}__balance-detail`}>
                  <span>{balance}</span>
                  <span>{payToken?.currency}</span>
                </div>

                <div
                  className={`${classNamePrefix}__max`}
                  onClick={() => setPayAmount(balance)}
                >
                  {CONSTANT.max}
                </div>
              </div>
            </div>

            <div className={`${classNamePrefix}__input-group-body`}>
              <div
                className={`${classNamePrefix}__token`}
                onClick={() => handleChooseToken("pay")}
              >
                <img
                  src="https://static.bymj.io/bhop/image/TscxSFnY8k5oA3KmWElo1OorDboafH3DLMwr5vpog6Y.png"
                  alt=""
                />
                <div>{payToken?.currency}</div>
                <CaretDownOutlined />
              </div>

              <div className={`${classNamePrefix}__form-input`}>
                <input
                  type="number"
                  placeholder="0.00"
                  value={isNaN(payAmount) ? "" : formatNumber(payAmount)}
                  onChange={(e) =>
                    setPayAmount(
                      e.target.value ? parseFloat(e.target.value) : 0
                    )
                  }
                />
              </div>
            </div>

            {payValue !== 0 && (
              <div className={`${classNamePrefix}__currency-exchange`}>
                <span>= $ {formatNumber(payValue)}</span>
              </div>
            )}
          </div>

          {valueError && (
            <div className={`${classNamePrefix}__form-error`}>
              <div>{CONSTANT.insufficient_amount}</div>

              <a href="/">
                {CONSTANT.deposit}
                <PlusCircleOutlined style={{ marginLeft: 5 }} />
              </a>
            </div>
          )}
        </div>

        <div className={`${classNamePrefix}__form-item`}>
          <div className={`${classNamePrefix}__input-group`}>
            <div className={`${classNamePrefix}__input-group-header`}>
              <span>{CONSTANT.receive}</span>

              <div className={`${classNamePrefix}__balance`}>
                <WalletOutlined />

                <div className={`${classNamePrefix}__balance-detail`}>
                  <span>{formatNumber(receiveAmount)}</span>
                  <span>{receiveToken?.currency}</span>
                </div>
              </div>
            </div>

            <div className={`${classNamePrefix}__input-group-body`}>
              <div
                className={`${classNamePrefix}__token`}
                onClick={() => handleChooseToken("receive")}
              >
                <img
                  src="https://static.bymj.io/bhop/image/TscxSFnY8k5oA3KmWElo1OorDboafH3DLMwr5vpog6Y.png"
                  alt=""
                />
                <div>{receiveToken?.currency}</div>
                <CaretDownOutlined />
              </div>

              <div className={`${classNamePrefix}__form-input`}>
                <input
                  type="number"
                  placeholder={formatNumber(receiveAmount).toString()}
                  disabled
                />
              </div>
            </div>

            {payValue !== 0 && (
              <div className={`${classNamePrefix}__currency-exchange`}>
                <span>= $ {formatNumber(payValue)}</span>
              </div>
            )}
          </div>

          <div className={`${classNamePrefix}__switch-icon`}>
            <SwapOutlined />
          </div>
        </div>

        {loading && (
          <div className={`${classNamePrefix}__loading`}>
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              aria-label="falling-circles-loading"
            />
          </div>
        )}
      </form>

      <button
        onClick={handleSwapToken}
        className={`${classNamePrefix}__submit-button`}
        disabled={valueError}
      >
        <span>{CONSTANT.swap}</span>
      </button>
    </div>
  );
};

export default SwapForm;
