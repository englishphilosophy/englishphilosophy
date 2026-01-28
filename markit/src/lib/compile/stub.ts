import { parse } from "@std/yaml";
import type { Format, Stub } from "../../types.ts";
import { innerContent } from "./blocks/content.ts";
import { getParent } from "./context.ts";

export default (head: string, context: Stub[], format: Format): Stub => {
  const stub: Stub = { id: "" };
  try {
    const metadata = parse(head) as Record<string, unknown>;
    for (const [key, value] of Object.entries(metadata)) {
      if (key !== "id" && typeof value === "string") {
        // format text fields (apart from the ID)
        stub[key] = format === "markit"
          ? value.trim()
          : innerContent(value.trim(), format);
      } else {
        // assign other fields directly
        stub[key] = value;
      }
    }
  } catch {
    // ignore errors (handled by separate validate function)
  }

  return enrichMetadataWithContext(stub, context);
};

const enrichMetadataWithContext = (stub: Stub, context: Stub[]): Stub => {
  const parent = getParent(stub.id, context);

  if (parent) {
    const { texts: _texts, ...parentWithoutTexts } = parent;
    return {
      ...enrichMetadataWithContext(parentWithoutTexts, context),
      ...parentWithoutTexts,
      ...stub,
    };
  }

  return stub;
};
