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

Env for production:
```
ZXC_ADDRESS=0x83e2be8d114f9661221384b3a50d24b96a5653f5
BURN_ADDRESS=0x033BBe355FF37e57F93Ca06c3CA20BCd0e95ab04
BASE_API_URL=https://api.0xcert.org
```

```
$ ./deploy.sh
```
