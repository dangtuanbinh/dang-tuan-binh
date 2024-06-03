import React, { useState } from "react";

import "./styles.scss";
import {
  CaretDownOutlined,
  PlusCircleOutlined,
  SnippetsOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { tokenList } from "../../mocks/token";
import { openModal } from "../../store/components/customModal/modalSlice";
import { CONSTANT } from "src/utils/constants";

const classNamePrefix = "swap-form";

const SwapForm = () => {
  const dispatch = useDispatch();

  const [payValue, setPayValue] = useState<number>(0);
  const [payToken, setPayToken] = useState<string>(tokenList[0].currency);
  const [receiveValue, setReceiveValue] = useState<number>(0);
  const [receiveToken, setReceiveToken] = useState<string>(
    tokenList[1].currency
  );
  const [balance, setBalance] = useState<number>(1000);

  const handleChooseToken = () => {
    dispatch(
      openModal({
        template: "token-list",
      })
    );
  };

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
                  <span>{payToken}</span>
                </div>

                <div
                  className={`${classNamePrefix}__max`}
                  onClick={() => setPayValue(balance)}
                >
                  {CONSTANT.max}
                </div>
              </div>
            </div>

            <div className={`${classNamePrefix}__input-group-body`}>
              <div
                className={`${classNamePrefix}__token`}
                onClick={handleChooseToken}
              >
                <img
                  src="https://static.bymj.io/bhop/image/TscxSFnY8k5oA3KmWElo1OorDboafH3DLMwr5vpog6Y.png"
                  alt=""
                />
                <div>{payToken}</div>
                <CaretDownOutlined />
              </div>

              <div className={`${classNamePrefix}__form-input`}>
                <input
                  type="number"
                  placeholder="0.00"
                  value={payValue}
                  onChange={(e) => setPayValue(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className={`${classNamePrefix}__currency-exchange`}>
              <span>= $0.71</span>
            </div>
          </div>

          {/* <div className={`${classNamePrefix}__form-error`}>
            <div>Insuficient amount</div>

            <a href="/">
                Deposit
                <PlusCircleOutlined style={{marginLeft: 5}}/>
            </a>
          </div> */}
        </div>

        <div className={`${classNamePrefix}__form-item`}>
          <div className={`${classNamePrefix}__input-group`}>
            <div className={`${classNamePrefix}__input-group-header`}>
              <span>{CONSTANT.receive}</span>

              <div className={`${classNamePrefix}__balance`}>
                <WalletOutlined />

                <div className={`${classNamePrefix}__balance-detail`}>
                  <span>{receiveValue}</span>
                  <span>{receiveToken}</span>
                </div>
              </div>
            </div>

            <div className={`${classNamePrefix}__input-group-body`}>
              <div
                className={`${classNamePrefix}__token`}
                onClick={handleChooseToken}
              >
                <img
                  src="https://static.bymj.io/bhop/image/TscxSFnY8k5oA3KmWElo1OorDboafH3DLMwr5vpog6Y.png"
                  alt=""
                />
                <div>{receiveToken}</div>
                <CaretDownOutlined />
              </div>

              <div className={`${classNamePrefix}__form-input`}>
                <input type="number" placeholder="0.00" />
              </div>
            </div>

            <div className={`${classNamePrefix}__currency-exchange`}>
              <span>= $0.71</span>
            </div>
          </div>

          <div className={`${classNamePrefix}__switch-icon`}>
            <SwapOutlined />
          </div>
        </div>
      </form>

      <button className={`${classNamePrefix}__submit-button`}>
        <span>Swap</span>
      </button>
    </div>
  );
};

export default SwapForm;
