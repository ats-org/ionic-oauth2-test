// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	api: {
		// event: 'http://localhost:3100/dev',
		// vehicles: 'http://localhost:3000/dev',
		// notifications: 'http://localhost:4000/dev',
		// geofence: 'http://localhost:3005/dev',
		// recovery: 'http://localhost:3010/dev',
		event: 'https://event-service-dev.axespointgps.com', // live server
		vehicles: 'https://vehicle-service-dev.axespointgps.com', // live server
		notifications: 'https://notification-service-dev.axespointgps.com', // live server
		geofence: 'https://geofence-service-dev.axespointgps.com', // live server
		recovery: 'https://recovery-service-dev.axespointgps.com' // live server
	},
	authConfig: {
		logLevel: 5, //Optional: 0=silent, 5=verbose, default=2
		flow: 'code',
		clientId: '1cvhmr5pn98p6l68e6s4nhvku8',
		hash: 'MWN2aG1yNXBuOThwNmw2OGU2czRuaHZrdTg6OGp2b2oxamVmaXVqN2M2aGJ0dXBybG5mZjI3Yjd1NW0wNXBjdGpva2ZhYjdqNGs4Mjdl',
		baseApi: 'https://auth.axespointgps.com',
		loginPath: '/login',
		logoutPath: '/logout',
		tokenPath: '/oauth2/token',
		redirectUri: 'https://track-dev.axespointgps.com/cb',
		logoutUri: 'https://track-dev.axespointgps.com/',
		// redirectUri: 'axestrack://cb',
		// logoutUri: 'axestrack://',
	},
	aws: {
		region: 'us-east-1',
		userPoolId: 'us-east-1_JaGKhxFMZ',
		identityPoolId: 'us-east-1:a838fb05-43a2-443c-b383-aa9b7500ac18',
		cognitoIdpUrl: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_JaGKhxFMZ',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
