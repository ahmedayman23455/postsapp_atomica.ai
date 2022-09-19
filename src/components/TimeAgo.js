import { parseISO, formatDistanceToNow } from "date-fns";
import classes from "./TimeAgo.module.scss";
/* ------------------------------------------------------ */

const TimeAgo = ({ timestamp, style: dateStyles = {}, className }) => {
  let timeAgo = "";
  if (timestamp) {
    // convert Iso format('2014-02-11T11:30:30) to date ( Fri Apr 11 2014 00:00:00)
    const date = parseISO(timestamp);
    //Return the distance between the given date and now in words.
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  const classNames = [classes.timeAgo, className].join(" ").trim();

  return (
    <p className={classNames} style={dateStyles}>
      {timeAgo}
    </p>
  );
};
export default TimeAgo;
