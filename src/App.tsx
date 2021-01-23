import React, { useMemo, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SubjectAllQuestions from './SubjectAllQuestions';
import IndexPage from './IndexPage';
import getTheme from './theme';
import Footer from './Footer';
import DarkModeButton from './DarkModeButton';
import formatDate from './utils/formatDate';

const useStyles = makeStyles({
  root: {
    maxWidth: '50rem',
    margin: '0 auto 1rem',
  },
});

const App = () => {
  const [updatedAt, setUpdatedAt] = useState(0);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkModeEnabled, setDarkModeEnabled] = useState(prefersDarkMode);

  useEffect(() => {
    setDarkModeEnabled(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () => getTheme(darkModeEnabled),
    [darkModeEnabled],
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container classes={{ root: classes.root }} fixed>
        <Router>
          <Switch>
            <Route path="/" exact>
              <IndexPage setUpdatedAt={setUpdatedAt} />
            </Route>
            <Route path="/:subjectId">
              <SubjectAllQuestions setUpdatedAt={setUpdatedAt} />
            </Route>
          </Switch>
        </Router>
        <Footer>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
          >
            <Link href="https://github.com/bibixx/zdaj-se-pjatk">GitHub</Link>
            <Box textAlign="center">
              Stan na
              {' '}
              {formatDate(new Date(updatedAt))}
            </Box>
            <Box justifySelf="flex-end">
              <DarkModeButton
                darkModeEnabled={darkModeEnabled}
                onClick={() => setDarkModeEnabled(!darkModeEnabled)}
              >
                {/* eslint-disable no-irregular-whitespace */}
                Zmień motyw
              </DarkModeButton>
            </Box>
          </Box>
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default App;
