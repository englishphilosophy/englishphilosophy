import { assert, assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";
import client from "../src/client.ts";
import server from "../src/server.ts";

const baseURL = await server();
const { get } = client(baseURL);

test("`/:author/:text` returns text in html format", async () => {
  const expectedText =
    "<p>Nature as bad as it is, and as much as it is complain'd of, is so far improveable by the grace of GOD, upon our honest and hearty endeavours, that if we are not wanting to our selves, we may all in <em>some</em>, tho' not in an <em>equal</em> measure, be instruments of his Glory, Blessings to this world, and capable of eternal Blessedness in that to come. But if our Nature is spoil'd, instead of being improv'd at first; if from our Infancy, we are nurs'd up in Ignorance and Vanity; are taught to be Proud and Petulent, Delicate and Fantastick, Humorous and Inconstant, 'tis not strange that the ill effects of this Conduct appears in all the future Actions of our Lives. And seeing it is Ignorance, either habitual or actual, which is the cause of all sin, how are they like to escape <em>this</em>, who are bred up in <em>that</em>? That therefore women are unprofitable to most, and a plague and dishonour to some men is not much to be regretted on account of the <em>Men</em>, because 'tis the product of their own folly, in denying them the benefits of an ingenuous and liberal Education, the most effectual means to direct them into, and to secure their progress in the ways of Vertue.</p>";

  const { payload } = await get("/astell/spl");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl`");
  }

  assertEquals(payload.data.blocks[9].text, expectedText);
});

test("`/:author/:text?format=html` returns text in html format", async () => {
  const expectedText =
    "<p>Nature as bad as it is, and as much as it is complain'd of, is so far improveable by the grace of GOD, upon our honest and hearty endeavours, that if we are not wanting to our selves, we may all in <em>some</em>, tho' not in an <em>equal</em> measure, be instruments of his Glory, Blessings to this world, and capable of eternal Blessedness in that to come. But if our Nature is spoil'd, instead of being improv'd at first; if from our Infancy, we are nurs'd up in Ignorance and Vanity; are taught to be Proud and Petulent, Delicate and Fantastick, Humorous and Inconstant, 'tis not strange that the ill effects of this Conduct appears in all the future Actions of our Lives. And seeing it is Ignorance, either habitual or actual, which is the cause of all sin, how are they like to escape <em>this</em>, who are bred up in <em>that</em>? That therefore women are unprofitable to most, and a plague and dishonour to some men is not much to be regretted on account of the <em>Men</em>, because 'tis the product of their own folly, in denying them the benefits of an ingenuous and liberal Education, the most effectual means to direct them into, and to secure their progress in the ways of Vertue.</p>";

  const { payload } = await get("/astell/spl?format=html");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl`");
  }

  assertEquals(payload.data.blocks[9].text, expectedText);
});

test("`/:author/:text?format=text` returns text in plain text format", async () => {
  const expectedText =
    "Nature as bad as it is, and as much as it is complain'd of, is so far improveable by the grace of GOD, upon our honest and hearty endeavours, that if we are not wanting to our selves, we may all in some, tho' not in an equal measure, be instruments of his Glory, Blessings to this world, and capable of eternal Blessedness in that to come. But if our Nature is spoil'd, instead of being improv'd at first; if from our Infancy, we are nurs'd up in Ignorance and Vanity; are taught to be Proud and Petulent, Delicate and Fantastick, Humorous and Inconstant, 'tis not strange that the ill effects of this Conduct appears in all the future Actions of our Lives. And seeing it is Ignorance, either habitual or actual, which is the cause of all sin, how are they like to escape this, who are bred up in that? That therefore women are unprofitable to most, and a plague and dishonour to some men is not much to be regretted on account of the Men, because 'tis the product of their own folly, in denying them the benefits of an ingenuous and liberal Education, the most effectual means to direct them into, and to secure their progress in the ways of Vertue.";

  const { payload } = await get("/astell/spl?format=text");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl`");
  }

  assertEquals(payload.data.blocks[9].text, expectedText);
});

test("`/:author/:text?format=markit` returns text in markit format", async () => {
  const expectedText =
    "Nature as bad as it is, and as much as it is complain'd of, is so far improveable by the grace of GOD, upon our honest and hearty endeavours, that if we are not wanting to our selves, we may all in _some_, tho' not in an _equal_ measure, be instruments of his Glory, Blessings to this world, and capable of eternal Blessedness in that to come. But if our Nature is spoil'd, instead of being improv'd at first; if from our Infancy, we are nurs'd up in Ignorance and Vanity; are taught to be Proud and Petulent, Delicate and Fantastick, Humorous and Inconstant, 'tis not strange that the ill effects of this Conduct appears in all the future Actions of our Lives. And seeing it is Ignorance, either habitual or actual, which is the cause of all sin, how are they like to escape _this_, who are bred up in _that_? That therefore women are unprofitable to most, and a plague and dishonour to some men is not much to be regretted on account of the _Men_, because 'tis the product of their own folly, in denying them the benefits of an ingenuous and liberal Education, the most effectual means to direct them into, and to secure their progress in the ways of Vertue.";

  const { payload } = await get("/astell/spl?format=markit");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl`");
  }

  assertEquals(payload.data.blocks[9].text, expectedText);
});

test("`/:author/:text?normalized` returns text with normalized spelling", async () => {
  const expectedText =
    "<p>Nature as bad as it is, and as much as it is complained of, is so far improveable by the grace of GOD, upon our honest and hearty endeavours, that if we are not wanting to our selves, we may all in <em>some</em>, though not in an <em>equal</em> measure, be instruments of his Glory, Blessings to this world, and capable of eternal Blessedness in that to come. But if our Nature is spoiled, instead of being improved at first; if from our Infancy, we are nursed up in Ignorance and Vanity; are taught to be Proud and Petulent, Delicate and Fantastic, Humorous and Inconstant, it is not strange that the ill effects of this Conduct appears in all the future Actions of our Lives. And seeing it is Ignorance, either habitual or actual, which is the cause of all sin, how are they like to escape <em>this</em>, who are bred up in <em>that</em>? That therefore women are unprofitable to most, and a plague and dishonour to some men is not much to be regretted on account of the <em>Men</em>, because it is the product of their own folly, in denying them the benefits of an ingenuous and liberal Education, the most effectual means to direct them into, and to secure their progress in the ways of Virtue.</p>";

  const { payload } = await get("/astell/spl?normalized");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl`");
  }

  assertEquals(payload.data.blocks[9].text, expectedText);
});

test("`/:author/:text?full returns the full text (with children)", async () => {
  const expectedText =
    "<p>Reading the other day the Third Volume of your excellent Discourses, as I do every thing you Write with great Pleasure and no less Advantage; yet taking the liberty that I use with other Books, (and yours or no bodies will bear it) to raise all the Objections that ever I can, and to make them undergo the severest Test my Thoughts can put 'em to before they pass for currant, a difficulty arose which without your assistance I know not how to solve.</p>";

  const { payload } = await get("/astell/llg?full");
  if ("error" in payload) {
    throw new Error("Error fetching `/astell/spl?full`");
  }

  assertEquals(payload.data.children[1].blocks[2].text, expectedText);
});

test("`/:author/:text?flat` returns plain text response", async () => {
  const expectedStartText =
    "<h1>LETTERS</h1><h3>Concerning the</h3><h1>Love of GOD,</h1><h4>Between the Author of the</h4><h3>Proposal to the <strong>Ladies</strong></h3><h4><strong>and</strong></h4><h3>Mr. <em>JOHN NORRIS:</em></h3><p>Wherein his late Discourse, shewing, That it ought to be intire and exclusive of all other Loves, is further Cleared and Justified.</p>";

  const { payload } = await get("/astell/llg?flat");
  if (typeof payload !== "string") {
    throw new Error("Error fetching `/astell/spl?flat`");
  }

  assert(payload.startsWith(expectedStartText));
});
