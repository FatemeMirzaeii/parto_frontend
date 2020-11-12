import CycleModule from '../util/cycle';
import { fetchInitialCycleData } from './actions/cycle';
import { FORMAT } from '../constants/cycle';

export default () => async (dispatch) => {
  console.log('hereeee');
  const cycle = await CycleModule();
  const past = await cycle.pastBleedingDays();
  const ovulationPerdictions = cycle.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = cycle.perdictedPeriodDaysInCurrentYear();

  if (past) {
    const periodDays = past.map((day) => day.date.format(FORMAT));
    dispatch(
      fetchInitialCycleData({
        periodDays,
        periodPerdictions,
        ovulationPerdictions,
      }),
    );
  }
};
