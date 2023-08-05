import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export default function App (){
  const [feedbacks, setFeedbacks] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0,
  });

  const handleFeedback = (feedbackType) => {
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [feedbackType]: prevFeedbacks[feedbackType] + 1,
    }));
  };

  const totalFeedback = () => {
    return feedbacks.Good + feedbacks.Neutral + feedbacks.Bad;
  };

  const positivePercentage = () => {
    const total = totalFeedback();
    const { Good } = feedbacks;
    if (total === 0) {
      return 0;
    }
    return Math.round((Good / total) * 100);
  };

  const totalFeedbackCount = totalFeedback();

    return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['Good', 'Neutral', 'Bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedbackCount !== 0 ? (
          <Statistics
            good={feedbacks.Good}
            neutral={feedbacks.Neutral}
            bad={feedbacks.Bad}
            total={totalFeedbackCount}
            positivePercentage={positivePercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}