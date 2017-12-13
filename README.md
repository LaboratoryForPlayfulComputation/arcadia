# ARcadia
###  A programming editor to enable construction of real-time, interactive tangible interfaces
Try it out here: https://laboratoryforplayfulcomputation.github.io/arcadia/

### Setup

ARcadia is a target for Microsoft Makecode and the following commands are a 1-time setup after synching the repo on your machine.


#### Setup PXT 

* clone the PXT repo
```
git clone https://github.com/Microsoft/pxt
```

* install necessary tools for building PXT
```
npm install -g jake
npm install -g typings
```

* build PXT
```
npm install
typings install
jake
```

* install the pxt command line tool (only need to do it once):
```
npm install -g pxt
```

If you would like to pick up the latest PXT build, simply run
```
pxt update
```

#### Setup ARcadia

* link ARcadia to the PXT framework
```
npm link ../pxt
```

### Running the local server

After you're done, simple run this command inside of the ARcadia repo to open a local web server:
```
pxt serve
```

After making a change in the source, refresh the page in the browser.

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 


## License

MIT
