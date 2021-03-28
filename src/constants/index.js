export const genderMapping = {
  0: 'Hidden',
  1: 'Male',
  2: 'Female',
  3: 'Transgender',
  4: 'Other',
};

const avatars = [
  'https://styles.redditmedia.com/t5_1ggt7y/styles/profileIcon_snoo0173491c-c56a-44cf-95e2-b2c92ca8179c-headshot.png?width=256&height=256&crop=256:256,smart&s=ee95db655fc05f69d16b258155f1c124c7b28662',
  'https://styles.redditmedia.com/t5_eprk7/styles/profileIcon_snoo054095fc-e0f1-43f0-86cc-c3eb8bef35bd-headshot.png?width=256&height=256&crop=256:256,smart&s=e9b3c3b617cfd6b73e80526c4c47767a16d39ee7',
  'https://styles.redditmedia.com/t5_tz26n/styles/profileIcon_snooa0437e97-f5cf-429d-9202-00c6057c6be3-headshot.png?width=256&height=256&crop=256:256,smart&s=32a701a61b81a93fabc88f59bdc4c4b2cdcee084',
  'https://styles.redditmedia.com/t5_42ihkm/styles/profileIcon_snoo5af8b487-fd78-4bc4-a976-c15cac90b51f-headshot.png?width=256&height=256&crop=256:256,smart&s=38f8e66bd1bf0c6e26a3146b603fe2c204a58bfe',
  'https://styles.redditmedia.com/t5_t5zv3/styles/profileIcon_snoo4d879799-ccca-4898-8c72-c2b36b30fc8a-headshot.png?width=256&height=256&crop=256:256,smart&s=4e7ac100d505f70c6ab27af441d1e270d1403d42',
  'https://styles.redditmedia.com/t5_bflj4/styles/profileIcon_snoofc9d4179-fd5b-4de4-af94-65b330ebc8ec-headshot.png?width=256&height=256&crop=256:256,smart&s=caa5ad951c87b4630564abc8adcfe28a82d0f7c9',
];

export const getDefaultImage = (id) => {
  if (id) {
    return avatars[id % avatars.length];
  }
  return avatars[Math.floor(Math.random() * avatars.length)];
};
