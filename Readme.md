# Set Top Box Web Console

[![Build Status](https://travis-ci.org/wilmoore/stb-webconsole.png?branch=master)](https://travis-ci.org/wilmoore/stb-webconsole)
[![Build Status](https://david-dm.org/wilmoore/stb-webconsole.png)](https://david-dm.org/wilmoore/stb-webconsole)
[![NPM version](https://badge.fury.io/js/stb-webconsole.png)](http://badge.fury.io/js/stb-webconsole)

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

## License

  MIT

