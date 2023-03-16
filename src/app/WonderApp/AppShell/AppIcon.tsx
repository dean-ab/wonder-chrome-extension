import React, { forwardRef, Ref } from 'react';
import { ReactComponent as AppIconSvg } from '../../../assets/wonderIcon.svg';
import { createStyles } from '@mantine/core';

interface IProps {
  onClick?: () => void;
  size?: number;
}

const useStyles = createStyles((theme) => ({
  wonderIcon: {
    color: 'white',
    borderRadius: 6,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #553af6, #553af6 100%)',
    border:
      '1px solid linear-gradient(0deg, #e4e7ec, #e4e7ec) linear-gradient(0deg, #ffffff, #ffffff)',
    cursor: 'pointer',

  },
}));

export const AppIcon: React.FC<IProps> = forwardRef(
  ({ onClick, size }: IProps, ref: Ref<HTMLDivElement>) => {
    const { classes } = useStyles();

    return (
      <div ref={ref} className={classes.wonderIcon} onClick={onClick}>
        <AppIconSvg
          style={{ height: size ? size : 18, width: size ? size : 18 }}
        />
      </div>
    );
  },
);
