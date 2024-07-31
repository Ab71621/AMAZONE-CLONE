import React, { useState, useEffect } from "react";
import classes from "./LowerHead.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
function LowerHead() {
  const [time, setTime] = useState({
    hours: 24,
    minutes: 60,
    seconds: 60,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classes.LowerHead_wrapper}>
      <div className={classes.LowerHead_Nav_links}>
        <ul>
          <li>
            <GiHamburgerMenu size={20} />
            <p>All</p>
          </li>
          <li>
            <select>
              <option>Prime</option>
            </select>
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>
      <div className={classes.countdown_wrapper}>
        <div
          id="hveNavSwmCountdownWidget-6176f548-1413-4d7a-a2e6-9409fe01b229"
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgb(35, 47, 62)",
          }}
        >
          <div className={classes.flexContainer}>
            <div>
              <p>Prime Day starts in</p>
            </div>
            <div
              id="countdownTimerDigitContainer-hours"
              className="hve-ct-digit-outer-container"
              style={{ left: "190px", top: "3px" }}
              aria-label="Prime Day starts in"
            >
              <div
                className="hve-ct-digit-container"
                style={{
                  color: "rgb(26, 152, 255)",
                  fontSize: "22px",
                  fontFamily: "Amazon Ember",
                  lineHeight: "25px",
                  borderRadius: "2px",
                  padding: "2px",
                  margin: "2px 2px 0px",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                {String(time.hours).padStart(2, "0")}
              </div>
            </div>

            <div
              className="hve-ct-colon"
              style={{
                color: "rgb(255, 255, 255)",
                fontSize: "22px",
                fontFamily: "Amazon Ember",
                margin: "2px 2px 0px",
                lineHeight: "25px",
              }}
            >
              :
            </div>

            <div
              id="countdownTimerDigit-minutes"
              className="hve-ct-digit-container"
              style={{
                color: "rgb(26, 152, 255)",
                fontSize: "22px",
                fontFamily: "Amazon Ember",
                lineHeight: "25px",
                borderRadius: "2px",
                padding: "2px",
                margin: "2px 2px 0px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            >
              {String(time.minutes).padStart(2, "0")}
            </div>

            <div
              className="hve-ct-colon"
              style={{
                color: "rgb(255, 255, 255)",
                fontSize: "22px",
                fontFamily: "Amazon Ember",
                margin: "2px 2px 0px",
                lineHeight: "25px",
              }}
            >
              :
            </div>

            <div
              id="countdownTimerDigit-seconds"
              className="hve-ct-digit-container"
              style={{
                color: "rgb(26, 152, 255)",
                fontSize: "22px",
                fontFamily: "Amazon Ember",
                lineHeight: "25px",
                borderRadius: "2px",
                padding: "2px",
                margin: "2px 2px 0px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            >
              {String(time.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LowerHead;
