import React from 'react';
import { createStyles, Flex, Grid, Text } from '@mantine/core';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

const useStyles = createStyles(() => ({
  shareButton: {
    cursor: 'pointer',
    '&:hover:not(:active)': {
      opacity: 0.85,
    },
  },
  container: {
    border: '1px solid #EAE7FE',
    padding: '0.5rem',
    borderRadius: '12px',
  },
}));

export const ShareLinks: React.FC = () => {
  const { classes } = useStyles();
  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  return (
    <Grid className={classes.container}>
      <Text align="center" mb={'1rem'} weight={700} color={'#7A64F7'}>
        Spread the word and share our app with your friends and family on social
        media!
      </Text>
      <Flex w={'100%'} gap={'1rem'} justify={'center'}>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          className={classes.shareButton}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className={classes.shareButton}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className={classes.shareButton}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <LinkedinShareButton url={shareUrl} className={classes.shareButton}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className={classes.shareButton}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </Flex>
    </Grid>
  );
};