import React, { forwardRef, Ref } from 'react';
import { ReactComponent as AppIconSvg } from '../../../assets/meteorite.svg';
import { createStyles } from '@mantine/core';

interface IProps {
  onClick?: () => void;
  size?: number;
}

const useStyles = createStyles((theme) => ({
  wonderIcon: {
    color: 'white',
    borderRadius: 10,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(139.56deg, #553AF6 7.54%, #A33AF6 109.2%)',
    border: '1px solid white',
    boxShadow: '0px 0px 5px 0px #9286ff;',
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
