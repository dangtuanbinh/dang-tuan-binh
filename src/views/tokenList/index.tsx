import React, { useState } from "react";
import "./styles.scss";
import { CONSTANT } from "src/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import { tokenList } from "src/mocks/token";
import { useDispatch } from "react-redux";
import {
  setSelectedPayToken,
  setSelectedReceiveToken,
} from "src/store/components/tokenList/tokenSlice";
import { closeModal } from "src/store/components/customModal/modalSlice";

const classNamePrefix = "token-list";

interface ITokenListProps {
  tag: string;
}

const TokenList: React.FC<ITokenListProps> = (props) => {
  const { tag } = props;

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleTokenSelect = (item: any) => {
    if (tag === CONSTANT.pay) {
      dispatch(setSelectedPayToken({ selectedPayToken: item }));
    } else {
      dispatch(setSelectedReceiveToken({ selectedReceiveToken: item }));
    }

    dispatch(closeModal())
  };

  const filteredTokenList = tokenList.filter((item) =>
    item.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={classNamePrefix}>
      <h3>{CONSTANT.select_token}</h3>

      <div className={`${classNamePrefix}__search-box`}>
        <input type="text" placeholder={CONSTANT.search_placeholder} value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <div className={`${classNamePrefix}__search-icon`}>
          <SearchOutlined />
        </div>
      </div>

      <div className={`${classNamePrefix}__result-box`}>
        <span className={`${classNamePrefix}__title`}>
          {CONSTANT.search_token}
        </span>

        <div className={`${classNamePrefix}__result`}>
          {filteredTokenList.map((item, index) => (
            <div
              className={`${classNamePrefix}__result-item`}
              key={index}
              onClick={() => handleTokenSelect(item)}
            >
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
