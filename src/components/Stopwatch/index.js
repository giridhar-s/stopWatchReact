import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickStop = () => {
    this.setState({isRunning: false})
    clearInterval(this.intervalId)
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = async () => {
    const {timeElapsedInSeconds} = this.state
    if (timeElapsedInSeconds === 59) {
      await this.setState(prevState => ({
        timeElapsedInSeconds: 0,
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))
    }
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStart = () => {
    this.setState({isRunning: true})
    this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  render() {
    const {timerLimitInMinutes, timeElapsedInSeconds, isRunning} = this.state
    const stringifiedMinutes =
      timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`
    const stringifiedSeconds =
      timeElapsedInSeconds > 9
        ? timeElapsedInSeconds
        : `0${timeElapsedInSeconds}`
    // const isDisabled = timeElapsedInSeconds !== 0
    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="main-heading">Stopwatch</h1>
          <div className="stopwatch-box">
            <div className="timer-heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-heading">Timer</p>
            </div>
            <h1 className="timer">
              {stringifiedMinutes}:{stringifiedSeconds}
            </h1>
            <div className="buttons-container">
              <button
                className="button start-btn"
                type="button"
                onClick={this.onClickStart}
                disabled={isRunning}
              >
                Start
              </button>
              <button
                className="button stop-btn"
                type="button"
                onClick={this.onClickStop}
              >
                Stop
              </button>
              <button
                className="button reset-btn"
                type="button"
                onClick={this.onClickReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
