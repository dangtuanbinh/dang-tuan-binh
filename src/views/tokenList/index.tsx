import React from "react";
import "./styles.scss";
import { CONSTANT } from "src/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import { tokenList } from "src/mocks/token";

const classNamePrefix = "token-list";

const TokenList = () => {
  return (
    <div className={classNamePrefix}>
      <h3>{CONSTANT.select_token}</h3>

      <div className={`${classNamePrefix}__search-box`}>
        <input type="text" placeholder={CONSTANT.search_placeholder} />
        <div className={`${classNamePrefix}__search-icon`}>
          <SearchOutlined />
        </div>
      </div>

      <div className={`${classNamePrefix}__result-box`}>
        <span className={`${classNamePrefix}__title`}>{CONSTANT.search_token}</span>

        <div className={`${classNamePrefix}__result`}>
          {tokenList.map((item) => (
            <div className={`${classNamePrefix}__result-item`}>
              <div className={`${classNamePrefix}__result-token`}>
                <img src="" alt="" />
                <span>{item.currency}</span>
              </div>

              <div className={`${classNamePrefix}__result-value`}>
                <span>0</span>
                <div>$0.00</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenList;
