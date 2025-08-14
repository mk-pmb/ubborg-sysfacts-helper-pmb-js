// -*- coding: utf-8, tab-width: 2 -*-
/*

import osVerInfo from 'ubborg-sysfacts-helper-pmb/util/osVersionInfo.mjs';
const { codename, verNumYear } = await osVerInfo(bun);

*/

import getOwn from 'getown';
import ubuntuVersionsTable from 'ubuntu-versions-table-pmb';

import sysFactsHelper from '../syf.mjs';

const EX = async function ubuntuVersionInfo(bun) {
  const osVer = await sysFactsHelper.mtd(bun, 'osVersion')();
  const { distro } = osVer;
  const lookup = getOwn(EX.distroVersionLookups, distro);
  if (!lookup) { throw new Error('Unsupported distro: ' + distro); }
  const found = await lookup(osVer);
  return { ...osVer, ...found };
};

EX.distroVersionLookups = {
  ubuntu(v) { return ubuntuVersionsTable.byCodename(v.codename); },
};

export default EX;
