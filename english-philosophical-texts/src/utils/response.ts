export default <Type extends "data" | "error">(
  type: Type,
  payload: Type extends "error" ? string : unknown,
  status = 200,
): Response => {
  const body = JSON.stringify({ [type]: payload });
  const headers = {
    "Content-Type": "application/json",
    length: `${body.length}`,
  };
  return new Response(body, { status, headers });
};
