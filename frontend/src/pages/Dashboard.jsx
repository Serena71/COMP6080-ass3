import React from 'react';
import { apiCall } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import QuizDiv from '../components/QuizDiv';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Style.module.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard () {
  const navigate = useNavigate();
  // loading icon
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  // fetch quiz data
  const [quizData, getQuizData] = React.useState([]);
  const [quizzes, setQuizzes] = React.useState([]);
  const [questionData, setQuestionData] = React.useState([]);
  const [quizModified, setquizModifed] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const IDs = [];
    apiCall('admin/quiz', 'GET', {})
      .then((data) => {
        getQuizData(data.quizzes);
        setquizModifed(false);
        return data.quizzes;
      })
      .then((quizzes) => {
        quizzes.map((quiz) => {
          IDs.push(quiz.id);
          return null;
        });
        return IDs;
      })
      .then((ids) => {
        const requests = ids.map((id) =>
          fetch(`http://localhost:5005/admin/quiz/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('authToken')
            }
          })
        );
        setQuizzes(requests);
      });
  }, [quizModified]);

  React.useEffect(() => {
    Promise.allSettled(quizzes)
      .then((responses) => {
        return Promise.all(responses.map((res) => res.value.json()));
      })
      .then((data) => {
        const qs = [];
        data.map((quiz) => {
          qs.push(quiz.questions);
          setQuestionData(qs);
          return null;
        });
        setLoading(false);
      });
  }, [quizzes]);

  return (
    <>
      <NavTabs />

      {loading && (
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <div className={styles.pageAlign}>
          <Button
            className={styles.space}
            variant="outlined"
            onClick={() => navigate('/quiz/new')}
          >
            Create New Quiz
          </Button>
          {quizData.map((quiz, idx) => {
            return (
              <QuizDiv
                key={quiz.id}
                active={quiz.active}
                quizId={quiz.id}
                createdAt={quiz.createdAt}
                name={quiz.name}
                thumbnail={quiz.thumbnail}
                questions={questionData[idx]}
                update={setquizModifed}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
export default Dashboard;
