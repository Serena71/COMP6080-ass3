import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiCall } from './Helper';
import styles from './Style.module.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

// const colorPalette = [
//   '#e4e9be',
//   '#95d1cc',
//   '#8d8daa',
//   '#c69b7b',
//   '#a2d5ab',
//   '#fdd7aa'
// ];

export default function QuestionCard (props) {
  const navigate = useNavigate();
  const navigateToQuestionEdit = () => {
    navigate(`/quiz/${props.quizID}/${props.questionID}`);
  };

  const deleteQuestion = () => {
    //   triger questionDeleted, live updates on QuizEdit page
    props.deleteLive(true);
    // remove question from list
    props.quiz.questions.splice(props.questionID, 1);
    // api call, put new quiz information back to server
    apiCall(`admin/quiz/${props.quizID}`, 'PUT', {
      questions: props.quiz.questions,
      name: props.quiz.name,
      thumbnail: props.quiz.thumbnail
    });
  };

  const thisQuestion = props.quiz.questions[props.questionID];
  console.log(thisQuestion);

  return (
    <>
      <Card className={styles.space} sx={{ width: '80%', maxWidth: 345 }}>
        <CardContent>
          {/* question title */}
          <Typography gutterBottom variant="h5" component="div">
            {thisQuestion.question}
          </Typography>

          {/* question metadata */}
          <p>
            Question Type:{' '}
            {thisQuestion.type === 'Single choice'
              ? (
              <span>Single Choice</span>
                )
              : (
              <span>Multiple Choice</span>
                )}{' '}
          </p>
          <p>Time: {thisQuestion.duration} seconds</p>
          <p>Credit: {thisQuestion.credit}</p>

          {/* question uploaded media */}
          <CardMedia
            component="img"
            alt="question media"
            height="100"
            image={thisQuestion.img}
          />

          {/* question options */}
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              {thisQuestion.options.map((opt, idx) => {
                const correct = thisQuestion.correctAnswer[idx];
                return (
                  <Item
                    className={correct ? styles.correctAnswer : undefined}
                    key={idx}
                  >
                    {opt}
                  </Item>
                );
              })}
            </Stack>
          </Box>
        </CardContent>

        <CardActions>
          <Button size="small" color="error" onClick={deleteQuestion}>
            Delete
          </Button>
          <Button size="small" onClick={navigateToQuestionEdit}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

QuestionCard.propTypes = {
  quizID: PropTypes.number,
  questionID: PropTypes.number,
  quiz: PropTypes.object,
  deleteLive: PropTypes.func
};
