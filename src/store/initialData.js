import CycleModule from '../util/cycle';
import { fetchInitialCycleData } from './actions/cycle';
import { FORMAT } from '../constants/cycle';
import { COLOR } from '../styles/static';

export default () => async (dispatch, getState) => {
  const c = await CycleModule();
  const past = await c.pastBleedingDays();
  const ovulationPerdictions = c.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = c.perdictedPeriodDaysInCurrentYear();
  let periodDays;
  if (past) {
    periodDays = past.map((day) => day.date.format(FORMAT));
  }
  dispatch(
    fetchInitialCycleData({
      periodDays: makeMarkedDateObj(periodDays, COLOR.bleeding, false),
      periodPerdictions: makeMarkedDateObj(
        periodPerdictions,
        COLOR.periodPerdiction,
        true,
      ),
      ovulationPerdictions: makeMarkedDateObj(
        ovulationPerdictions,
        COLOR.tiffany,
        true,
      ),
    }),
  );
};
const makeMarkedDateObj = (dates, color, dashed) => {
  let marked = {};
  dates.forEach((date) => {
    marked[date] = {
      periods: [
        {
          startingDay: dashed,
          color: color,
          endingDay: dashed,
        },
      ],
    };
  });
  return marked;
};
