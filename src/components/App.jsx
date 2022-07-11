import { Component } from 'react';
import { Section } from 'components/Section';
import { FeedbackOptions } from 'components/FeedbackOptions';
import { Statistics } from 'components/Statistics';
import { Notification } from 'components/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  leaveFeedbackHandler = rate => {
    this.setState(prevRate => {
      return {
        [rate]: prevRate[rate] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce(
      (prevValue, value) => prevValue + value,
      0
    );
  };

  countPositiveFeedbackPercentage = () => {
    return !this.state.good
      ? 0
      : Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const stats = Object.keys(this.state);
    const totalFeedback = this.countTotalFeedback();

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={stats}
            onLeaveFeedback={this.leaveFeedbackHandler}
          />
        </Section>
        <Section title="Statistics">
          {!totalFeedback ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePersentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}
