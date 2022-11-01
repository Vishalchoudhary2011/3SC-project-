import * as React from "react";
import { useLocalization } from "@progress/kendo-react-intl";
export const Translation = (props) => {
  const localization = useLocalization();
  return (
    <span
      style={{
        display: "block",
      }}
    >
      {localization.toLanguageString(props.messageKey, props.defaultMessages)}
    </span>
  );
};