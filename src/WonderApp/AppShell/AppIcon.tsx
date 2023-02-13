import React, { forwardRef, Ref } from "react";
import clsx from "clsx";
import styles from "./AppIcon.module.css";
import { ReactComponent as AppIconSvg } from "../../assets/overkill.svg";

interface IProps {
  onClick: () => void;
}

export const AppIcon: React.FC<IProps> = forwardRef(
  ({ onClick }: IProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={styles.wonderIcon} onClick={onClick}>
        <AppIconSvg style={{ height: 18, width: 18 }} />
      </div>
    );
  }
);
