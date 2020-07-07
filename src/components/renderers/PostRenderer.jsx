import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { ROUTES } from '../../const';

export const EXCERPT_TITLE = 'excerptTitle';
export const POST_TITLE = 'postTitle';
export const POST_DATE = 'postDate';
export const POST_TAGS = 'postTags';
export const POST_CONTENTS = 'postContents';

const useStyles = makeStyles(({ palette, spacing }) => ({
  base: { color: palette.text.primary },
  postBlockquote: {
    position: 'relative',
    margin: `${spacing(6)}px 0`,
    padding: spacing(4),
    paddingLeft: '12em',
    borderTop: `1px solid ${palette.primary.main}`,
    borderBottom: `1px solid ${palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      top: -10,
      left: '1em',
      fontSize: '8em',
      color: palette.primary.main,
      transform: 'rotate(180deg)',
      opacity: 0.15,
    },
    '& p.MuiTypography-root': {
      fontFamily: 'cursive',
      fontSize: '2em',
      fontStyle: 'italic',
      color: palette.grey[600],
    },
    '& span.MuiTypography-root': {
      display: 'block',
      marginTop: spacing(2),
      color: palette.grey[600],
      textAlign: 'right',
    },
  },
  postContents: {},
  postDate: {
    display: 'block',
    marginBottom: spacing(1),
    textAlign: 'center',
  },
  postHeading: {
    marginTop: spacing(4),
    marginBottom: spacing(4),
    textAlign: 'center',
  },
  postImage: {
    marginBottom: spacing(4),
    width: '100%',
  },
  postList: {
    marginLeft: spacing(2),
    marginBottom: spacing(3),
    padding: 0,
    '& .MuiListItem-root': {
      paddingTop: 3,
      paddingBottom: 3,
      '&:not(.hideBullet)::before': {
        content: '""',
        position: 'relative',
        display: 'inline-block',
        left: '-1em',
        width: '0.4em',
        height: '0.4em',
        borderRadius: '50%',
        backgroundColor: palette.grey[600],
      },
      '& > .MuiList-root': {
        marginBottom: 0,
      },
    },
  },
  postParagraphs: {
    marginBottom: spacing(4),
    lineHeight: 1.8,
    textIndent: '10%',
  },
  postTags: {
    marginBottom: spacing(4),
    textAlign: 'center',
    '& .MuiChip-root': {
      margin: spacing(1) / 2,
      height: spacing(3.5),
      color: palette.grey[600],
    },
  },
  postTitle: {
    marginTop: spacing(4),
    textAlign: 'center',
  },
}));

const PostDate = ({ postPart, ...otherProps }) => {
  const date = new Date(postPart.value);
  return (
    <Typography {...otherProps} component="span" variant="overline">
      {moment(date).format('MMMM D YYYY')}
    </Typography>
  );
};

const PostTags = ({ postPart, ...otherProps }) => {
  const history = useHistory();
  const tags = postPart.value;

  const handleClick = (tag) => {
    history.push(`${ROUTES.JOTTINGPAD}/tags?tag=${tag}`);
    console.log('tag clicked - ', tag);
  };

  return (
    <Box {...otherProps}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          clickable
          label={tag}
          variant="outlined"
          // onClick={() => handleClick(tag)}
        />
      ))}
    </Box>
  );
};

const ExcerptTitle = ({ postPart, ...otherProps }) => (
  <Typography {...otherProps} component="h2" variant="h2" gutterBottom>
    {postPart.value}
  </Typography>
);

const PostTitle = ({ postPart, ...otherProps }) => (
  <Typography {...otherProps} component="h1" variant="h1">
    {postPart.value}
  </Typography>
);

const PostBlockquote = ({ postPart, ...otherProps }) => (
  <Box {...otherProps} component={postPart.type}>
    <FormatQuoteRoundedIcon color="disabled" />
    <Typography component="p">{postPart.value.quote}</Typography>
    {postPart.value.quoter && (
      <Typography component="span" variant="overline">
        &mdash; {postPart.value.quoter}
      </Typography>
    )}
  </Box>
);

const PostHeading = ({ postPart, ...otherProps }) => (
  <Typography {...otherProps} component={postPart.type} variant={postPart.type} gutterBottom>
    {postPart.value}
  </Typography>
);

const RenderContentPart = ({ className, postPart }) => {
  const classes = useStyles();

  if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(postPart.type)) {
    return (
      <PostHeading className={classnames(className, classes.postHeading)} postPart={postPart} />
    );
  } else if (postPart.type === 'content') {
    return (
      <PostParagraphs
        className={classnames(className, classes.postParagraphs)}
        postPart={postPart}
      />
    );
  } else if (postPart.type === 'image') {
    return <PostImage className={classnames(className, classes.postImage)} postPart={postPart} />;
  } else if (postPart.type === 'list') {
    return <PostList className={classnames(className, classes.postList)} postPart={postPart} />;
  } else if (postPart.type === 'blockquote') {
    return (
      <PostBlockquote
        className={classnames(className, classes.postBlockquote)}
        postPart={postPart}
      />
    );
  } else {
    return <></>;
  }
};

const PostContents = ({ className, postParts }) => {
  return postParts.map((postPart, i) => {
    return (
      <RenderContentPart key={'renderContentPart' + i} className={className} postPart={postPart} />
    );
  });
};

const PostImage = ({ postPart, ...otherProps }) => (
  <Box {...otherProps} component="img" alt={postPart.value.alt} src={postPart.value.src} />
);

// TODO: ordered list
const PostList = ({ postPart, ...otherProps }) => {
  if (Array.isArray(postPart.value) && postPart.value.length) {
    const renderListItems = () => {
      return postPart.value.map((listItem, i) => {
        return (
          <ListItem
            key={`${i}-${listItem}`}
            className={classnames([typeof listItem === 'object' && 'hideBullet'])}
          >
            {typeof listItem === 'object' ? (
              <PostList className={classnames(otherProps.className)} postPart={listItem} />
            ) : (
              listItem
            )}
          </ListItem>
        );
      });
    };

    return <List {...otherProps}>{renderListItems()}</List>;
  }
};

const PostParagraphs = ({ postPart, ...otherProps }) => {
  if (Array.isArray(postPart.value) && postPart.value.length) {
    return postPart.value.map((paragraph, i) => {
      return (
        <Typography
          key={`${i}-${paragraph.slice(0, 9)}`}
          {...otherProps}
          component="p"
          variant="body1"
          gutterBottom
        >
          {postPart.value}
        </Typography>
      );
    });
  }
};

export const PostRenderer = (postType, postPart) => {
  const classes = useStyles();
  const className = classnames(classes.base, classes[postType]);

  switch (postType) {
    case EXCERPT_TITLE:
      return <ExcerptTitle className={classes.base} postPart={postPart} />;
    case POST_TITLE:
      return <PostTitle className={className} gutterBottom postPart={postPart} />;
    case POST_DATE:
      return <PostDate className={className} postPart={postPart} />;
    case POST_TAGS:
      return <PostTags className={className} postPart={postPart} />;
    case POST_CONTENTS:
      return <PostContents className={className} postParts={postPart} />;
    default:
      return <></>;
  }
};
