import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SplashLogo, ViewModal } from '../../components';
import { PageLayout } from '../../pages';

const useStyles = makeStyles((theme) => ({
  homeLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  const [activeNavId, setActiveNavId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const homeLogoClickHandler = (path) => (event) => {
    setOpenModal(true);
    setActiveNavId(path.navId);
  };

  return (
    <PageLayout className={classes.homeLayout} pageName="home">
      {/* <HomeLogo onHomeLogoClick={homeLogoClickHandler} /> */}
      {/* <SplashLogo /> */}
      <ViewModal open={openModal} setOpenModal={setOpenModal} navId={activeNavId} />
    </PageLayout>
  );
};
