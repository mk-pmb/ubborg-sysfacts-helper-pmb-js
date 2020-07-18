
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
* … a dictionary object that maps each topic to either a dictionary object
  of suggested facts, or `true` for no suggestions on that topic.
  In this case, the promise is for a dictionary object that maps
  topics to plans.

The `verify` argument shold be either:
* a false-y value (or missing), for no verification.
* In case `topics` is a string, a dictionary object of expected values.
* In case `topics` is a dictionary object, `true` to upgrade all suggestions
  to requirements.


### collect.prop(propName, ...args)

From each plan from `collect(...args)`, unpack the property whose name is
given by `propName`.




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
