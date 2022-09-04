import { $subs, fetchSubsFx } from './'

$subs.on(fetchSubsFx.doneData, (_, subs) => subs)
fetchSubsFx.use(async ({ language, streaming }) => streaming!.getSubs(language))

$subs.watch((subs) => console.log('SUBS ', subs))
