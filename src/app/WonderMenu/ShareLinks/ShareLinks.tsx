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
const title = '';
const shareUrl = `If you're seeking a tool to help you edit, read and write better and faster, then Wonder is a must-try.\n
Visit https://www.getwonderai.com/ to learn more about this amazing tool, and the best part? It's absolutely free!`;

export const ShareLinks: React.FC<{
  withPromotionText?: boolean;
  onShare?: () => void;
}> = ({ withPromotionText = true, onShare }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.container}>
      {withPromotionText && (
        <Text align="center" mb={'1rem'} weight={700} color={'#7A64F7'}>
          Spread the word and share our app with your friends and family on
          social media!
        </Text>
      )}
      <Flex w={'100%'} gap={'1rem'} justify={'center'} onClick={onShare}>
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
