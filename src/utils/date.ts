import { time, TimestampStylesString } from "discord.js";

export const parseHourToTimestamp = (
  hour: string | number,
  type: TimestampStylesString
): string => {
  const curDate = new Date();

  curDate.setUTCHours(Number(hour));

  curDate.setUTCMinutes(0);
  curDate.setUTCMilliseconds(0);

  const ms = Math.floor(curDate.getTime() / 1000);

  return time(ms, type);
};
