// -*- coding: utf-8, tab-width: 2 -*-

import pProps from 'p-props';
import isStr from 'is-string';
import isFun from 'is-fn';

const { isArray } = Array;

function pMap(a, f) { return Promise.all(a.map(f)); }


async function collectOneTopic(bun, topic, sug, veri) {
  if (sug && veri) { throw new Error('Internal API error. This is a bug.'); }
  const plan = await bun.needs('sysFacts', topic);
  await plan.hatchedPr;
  plan.suggestSysFacts(sug);
  plan.declareSysFacts(veri);
  return plan;
}


async function collect(bun, topics, verify) {
  const c1t = collectOneTopic;
  function noSugg(topic) { return c1t(bun, topic, false, verify); }
  if (isStr(topics)) { return noSugg(topics); }
  if ((topics && typeof topics) === 'object') {
    if (isArray(topics)) { return pMap(topics, noSugg); }
    return pProps(topics, (function makePropsIter() {
      if (!verify) {
        return function suggest(sug, t) { return c1t(bun, t, sug, false); };
      }
      if (verify === true) {
        return function demand(facts, t) { return c1t(bun, t, false, facts); };
      }
      throw new TypeError('Invalid value for "verify": ' + verify);
    }()));
  }
  throw new TypeError('Bad topics list type');
}

Object.assign(collect, {

  mtd(...collArgs) {
    async function mtdProxy(mtdName, ...mtdArgs) {
      if (!mtdName) { return mtdProxy('getSysFacts', ...mtdArgs); }
      const plans = await mtdProxy.plansPr;
      function prx(plan) {
        const mtdImpl = plan[mtdName];
        if (isFun(mtdImpl)) { return mtdImpl.apply(plan, mtdArgs); }
        const e = String(plan) + " doesn't have a method called " + mtdName;
        throw new Error(e);
      }
      if (isStr(plans.typeName)) { return prx(plans); }
      if (isArray(plans)) { return pMap(plans, prx); }
      return pProps(plans, prx);
    }
    mtdProxy.plansPr = collect(...collArgs);
    return mtdProxy;
  },

});

export default collect;
