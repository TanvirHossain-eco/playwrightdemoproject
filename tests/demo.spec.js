const { test, expect } = require('@playwright/test')
const { hello, helloworld } = require('./demo/hello.js')

console.log(hello());

console.log(helloworld());