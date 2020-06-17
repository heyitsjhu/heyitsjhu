import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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

const useStyles = makeStyles((theme) => ({
  base: {
    marginTop: 0,
    color: theme.palette.text.primary,
  },
  heading: {
    marginTop: 0,
    color: theme.palette.text.primary,
  },
  paragraph: {
    marginTop: 0,
    color: theme.palette.text.primary,
  },
  listItem: {
    display: 'block',
  },
}));

const MDHeading = (props) => {
  const classes = useStyles();
  const heading = `h${props.level}`;
  return (
    <Typography className={classes.base} component={heading} variant={heading} gutterBottom>
      {props.children}
    </Typography>
  );
};

const MDParagraph = (props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.base} component="p" gutterBottom>
      {props.children}
    </Typography>
  );
};

const MDSpan = (props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.base} component="span">
      {props.children}
    </Typography>
  );
};

const MDList = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.base} component={props.ordered ? 'ol' : 'ul'}>
      {props.children}
    </List>
  );
};

const MDListItem = (props) => {
  const classes = useStyles();
  return (
    <ListItem className={classnames([classes.base, classes.listItem])}>{props.children}</ListItem>
  );
};

const MDLink = (props) => {
  const classes = useStyles();
  return <Link className={classnames([classes.base])}>{props.children}</Link>;
};

export default {
  root: Box,
  heading: MDHeading,
  paragraph: MDParagraph,
  link: MDLink,
  list: MDList,
  listItem: MDListItem,
  table: Table,
  tableHead: TableHead,
  tableBody: TableBody,
  tableRow: TableRow,
  tableCell: TableCell,
};
