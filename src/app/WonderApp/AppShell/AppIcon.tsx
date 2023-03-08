import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import styles from './AppIcon.module.css';
import { ReactComponent as AppIconSvg } from '../../../assets/wonderIcon.svg';

interface IProps {
  onClick?: () => void;
  size?: number;
}

export const AppIcon: React.FC<IProps> = forwardRef(
  ({ onClick, size }: IProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={styles.wonderIcon} onClick={onClick}>
        <AppIconSvg
          style={{ height: size ? size : 18, width: size ? size : 18 }}
        />
      </div>
    );
  },
);
