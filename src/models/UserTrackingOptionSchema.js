export default class UserTrackingOption {}
UserTrackingOption.schema = {
  name: 'user_tracking_option',
  properties: {
    user_id: 'int',
    tracking_option_id: 'health_tracking_option',
    date: 'date',
  },
};
