import { Component } from 'react';
import { Section } from './Section';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Notification } from './Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handlerClickState = rate => {
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

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={stats}
            onLeaveFeedback={this.handlerClickState}
          />
        </Section>
        <Section title="Statistics">
          {!this.countTotalFeedback() ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePersentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}
