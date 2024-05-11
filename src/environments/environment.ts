// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // google api variables
  google: {
    aiClientId: '<APPLICATION CLIENT ID>',
    aiEndpoint: '<URL OF DEPLOYED CNN>',
    aiScope: 'https://www.googleapis.com/auth/cloud-platform'
  }
};
