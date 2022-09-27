import { call, takeEvery, put, all } from 'redux-saga/effects';
import StatsService from '@/services/stats';
import { statsActions } from './statsSlice';

function* getStatisticsSaga({ payload: userId }) {
  try {
    const { data, errors } = yield call(StatsService.getStatistics, userId);
    if (errors) throw errors;
    if (data) {
      yield put(statsActions.getStatisticsSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}
function* getAllStoriesStatisticsSaga({ payload: userId }) {
  try {
    const { data, errors } = yield call(
      StatsService.getAllStoriesStatistics,
      userId
    );
    if (errors) throw errors;
    if (data) {
      yield put(statsActions.getAllStoriesStatisticsSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

function* getTotalReadsLastXDaysSaga({ payload: { userId, date, dateType } }) {
  try {
    const { data, errors } = yield call(
      StatsService.getTotalReadsLastXDays,
      userId,
      date,
      dateType
    );
    if (errors) throw errors;
    if (data) {
      data.dateType = dateType;

      yield put(statsActions.getTotalReadsLastXDaysSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}
function* getTotalLikesLastXDaysSaga({ payload: { userId, date, dateType } }) {
  try {
    const { data, errors } = yield call(
      StatsService.getTotalLikesLastXDays,
      userId,
      date,
      dateType
    );
    if (errors) throw errors;
    if (data) {
      data.dateType = dateType;
      yield put(statsActions.getTotalLikesLastXDaysSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}

/*
      .sort((dateFirst, dateSecond) => {
                const dateFirstReplaced = dateFirst.name.replace(':', '');
                const dateSecondReplaced = dateSecond.name.replace(':', '');

                if (dateFirstReplaced > dateSecondReplaced) {
                  return 1;
                }
                if (dateFirstReplaced < dateSecondReplaced) {
                  return -1;
                }
                return 0;
              })
              */

function* getTotalViewsLastXDaysSaga({ payload: { userId, date, dateType } }) {
  try {
    const { data, errors } = yield call(
      StatsService.getTotalViewsLastXDays,
      userId,
      date,
      dateType
    );
    if (errors) throw errors;
    if (data) {
      data.dateType = dateType;

      yield put(statsActions.getTotalViewsLastXDaysSuccess(data));
    }
  } catch (e) {
    console.error({ e });
  }
}
export function* getStoryStatisticsSaga({ payload: storySlug }) {
  try {
    const { data, errors } = yield call(
      StatsService.getStoryStatistics,
      storySlug
    );
    if (errors) throw errors;
    if (data) {
      yield put(statsActions.getStoryStatisticsSuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(statsActions.getStoryStatisticsFailure(e));
  }
}
export function* getStoryReadingTimePeriodicallySaga({
  payload: { storySlug, date, type },
}) {
  try {
    const { data, errors } = yield call(
      StatsService.getStoryReadingTimePeriodically,
      storySlug,
      date,
      type
    );
    if (errors) throw errors;
    if (data) {
      data.type = type;
      yield put(statsActions.getStoryReadingTimePeriodicallySuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(statsActions.getStoryReadingTimePeriodicallyFailure(e));
  }
}
export function* getStoryStatisticsPeriodicallySaga({
  payload: { storySlug, date, type },
}) {
  try {
    const { data, errors } = yield call(
      StatsService.getStoryStatisticsPeriodically,
      storySlug,
      date
    );
    if (errors) throw errors;
    if (data) {
      data.type = type;
      yield put(statsActions.getStoryStatisticsPeriodicallySuccess(data));
    }
  } catch (e) {
    console.error({ e });
    yield put(statsActions.getStoryStatisticsPeriodicallyFailure(e));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(statsActions.getStatisticsRequest.type, getStatisticsSaga),
    takeEvery(
      statsActions.getTotalViewsLastXDaysRequest.type,
      getTotalViewsLastXDaysSaga
    ),
    takeEvery(
      statsActions.getTotalLikesLastXDaysRequest.type,
      getTotalLikesLastXDaysSaga
    ),
    takeEvery(
      statsActions.getTotalReadsLastXDaysRequest.type,
      getTotalReadsLastXDaysSaga
    ),
    takeEvery(
      statsActions.getAllStoriesStatisticsRequest.type,
      getAllStoriesStatisticsSaga
    ),
    takeEvery(
      statsActions.getStoryStatisticsRequest.type,
      getStoryStatisticsSaga
    ),
    takeEvery(
      statsActions.getStoryStatisticsPeriodicallyRequest.type,
      getStoryStatisticsPeriodicallySaga
    ),
    takeEvery(
      statsActions.getStoryReadingTimePeriodicallyRequest.type,
      getStoryReadingTimePeriodicallySaga
    ),
  ]);
}
