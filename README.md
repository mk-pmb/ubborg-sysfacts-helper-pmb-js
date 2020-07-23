
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-sysfacts-helper-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Helper functions for handling sysFacts resources.
<!--/#echo -->



API
---

This module ESM-exports one function that carries some method(s):

### collect(bun, topics[, verify])

Return a promise for the `sysFacts` resource plans about selected `topics`.
`bun` must be a bundle on whose behalf they shall be requested.
`topics` may be…

* … a string: In this case, the promise is for a single plan.
* … an array of strings: In this case, the promise is for an array of plans.
* … a dictionary object {`topic` &rarr; `suggest`}. In this case, the promise
  is for a dictionary object that maps topics to plans.
  Each `suggest` may be either a (potentially empty) dictionary object of
  suggested facts for the topic. For no suggestions, you can also give `true`
  instead of an empty object.

The `verify` argument shold be either:
* a false-y value (or missing), for no verification.
* In case `topics` is a string, a dictionary object of expected values.
* In case `topics` is a dictionary object, `true` to upgrade all suggestions
  to requirements.


### collect.mtd(...collArgs)

Start collecting plans from `collect(...collArgs)`
and return an async functions `mtdProxy([mtdName, ...mtdArgs])`.

The `mtdProxy` function will await the plans,
call the method `mtdName` (default: `getSysFacts`)
with arguments `...mtdArgs` on each of them, await and collect all the results
in a structure exactly like the plans were packaged,
and return a Promise for this collection.

The `mtdProxy` function will carry a property `plansPr` with a Promise
for the plans. In case `mtdProxy` is not invoked (almost) immediately,
you may need to set up custom error handling for rejections of the
`plansPr` Promise.



Usage
-----

```javascript
async function example(bun) {
  // Suggest an OS in case none had been selected yet:
  await sysFactsHelper(bun, { osVersion: {
    family: 'linux',
    distro: 'ubuntu',
    codename: 'focal',
  }});
  // Then retrieve and display all facts about the OS selection:
  const osVerFacts = await sysFactsHelper.mtd(bun, 'osVersion')();
  console.debug({ osVerFacts });
}
```






<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
