# Contributing

The 0xcert Burner is a decentralized application for burning ZXC tokens.

## Development

Create a new file `.env` and configure the environment variables below. Note that these variables are also used by the deploy script.

```
ZXC_ADDRESS=0x...
BURN_ADDRESS=0x...
BASE_API_URL=https://api.0xcert.org
```

Install dependencies and run the application.

```sh
$ npm i
$ npm run dev
```

## Production

Run the deploy script which will build and push source code to the Github pages.

```
$ ./deploy.sh
```
