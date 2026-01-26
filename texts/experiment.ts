import { getText } from "@englishphilosophy/texts";

const experiment = await getText("Hume.DP.1777.6", { diffWith: "Hume.DP.1757.6" });
console.log(experiment);
