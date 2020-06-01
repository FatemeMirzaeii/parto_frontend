export default class Profile {}
Profile.schema = {
  name: 'user_profile',
  properties: {
    user_id: 'int',
    birthdate: 'date',
    height: 'int',
    weight: 'int',
  },
};
