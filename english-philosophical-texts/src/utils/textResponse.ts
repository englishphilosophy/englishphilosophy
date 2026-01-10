export default (text: string, status = 200) => {
  const headers = {
    "Content-Type": "text/plain;charset=utf-8",
    length: `${text.length}`,
  };
  return new Response(text, { status, headers });
};
