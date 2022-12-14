import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './components/Style.module.css';

import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuizNew from './pages/QuizNew';
import QuizEdit from './pages/QuizEdit';
import Report from './pages/Report';
import Result from './pages/Result';
import QuestionEdit from './pages/QuestionEdit';
import Join from './pages/Join';
import PlayGame from './pages/PlayGame';

function App () {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* games, navbar */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* click "create a Quiz" */}
          <Route path="/quiz/new" element={<QuizNew />} />

          {/* click "edit a Quiz", need a quizID in route */}
          <Route path="/quiz/:quizid" element={<QuizEdit />} />

          {/* show result page for one session */}
          <Route
            path="/result/qid=:quizid/sid=:sessionID"
            element={<Result />}
          />

          {/* unique route for players to join */}
          <Route path="/play" element={<Join />} />

          {/* click "copy link", sessionID is pre-populated */}
          <Route path="/play/:sessionID" element={<Join />} />

          {/* play game */}
          <Route path="/play/:sessionID/:player" element={<PlayGame />} />

          {/* play game */}
          <Route
            path="/result/qid=:quizid/sid=:sessionID"
            element={<Result />}
          />

          {/* show report page for for all past sessions */}
          <Route path="/report" element={<Report />} />
          <Route path="/quiz/:quizid/:questionid" element={<QuestionEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
