# AR editor target for Microsoft MakeCode

## Running locally

These instructions allow to run locally to modify the sample.

### Setup

The following commands are a 1-time setup after synching the repo on your machine.

* install the PXT command line
```
npm install -g pxt
```
* install typings
```
npm install -g typings
```
* install the dependencies
```
npm install
```
* install typings
```
typings install
```

### Running the local server

After you're done, simple run this command to open a local web server:
```
pxt serve
```

After making a change in the source, refresh the page in the browser.

## Updating the tools

If you would like to pick up the latest PXT build, simply run
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 

### Jenkins private build

https://ci2.dot.net/job/Private/job/pxt_project_purple/job/master/

