# Set Top Box Web Console

[![Build Status](https://travis-ci.org/wilmoore/stbstatus.png)](https://travis-ci.org/wilmoore/stbstatus)
[![Build Status](https://david-dm.org/wilmoore/stbstatus.png)](https://david-dm.org/wilmoore/stbstatus)

  Web console for controlling your home set top boxes.

## Current Features

  - Supports DIRECTV appliances that adhere to the SHEF API specification.
  - DISPLAY active (powered on) clients.

  **NOTE**: this initial demo version does not actually call out to the SHEF API since that would unfortunately cause demo users to not be able to see data on the dashboard.

## Roadmap

  - ADD/DELETE home-networked servers.
  - DISPLAY powered down clients for a configurable amount of time.
  - TUNING remotely.
  - SHOW currently tuned program.

## Installation

    % git clone https://github.com/wilmoore/stbstatus.git

## Configuration

In order to send user registration emails, you'll need a mailgun account (the free account will suffice). If you do not configure a mailgun account, user registration will still work; however, no emails will be sent.

    - `export MAILGUN_API_KEY='mailgun-api-key'`
    - `export MAILGUN_DOMAIN='example.mailgun.net'`

## Starting the application

    % npm install
    % node index.js
    % open http://localhost:7777

## Registering a user

  - Navigate to the "signup.html" page and create an account.
  - You should receive an email

## Invoking Test Suite

    % make test

  **NOTE**: You must have PhantomJS installed to invoke the test suite.

## Screenshots

![](http://f.cl.ly/items/3b1l0Y3a1x2B1C2K1m2L/Image%202013.08.14%206%3A05%3A22%20AM.png)
![](http://f.cl.ly/items/1l3w0X1F0T2f1f1J1K1Z/Image%202013.08.14%206%3A05%3A49%20AM.png)
![](http://f.cl.ly/items/1m0W3O0K3K3M1D1x3n0L/Image%202013.08.14%206%3A05%3A58%20AM.png)
![](http://f.cl.ly/items/3g1p3e062y1Z41063Y1P/Image%202013.08.14%206%3A06%3A09%20AM.png)

## Tech

This application was built using:

  - nodejs
  - hapi
  - yar
  - leveldb
  - levelup/leveldown
  - bcrypt
  - mocha, chai, sinon
  - bootstrap

## License

  MIT

