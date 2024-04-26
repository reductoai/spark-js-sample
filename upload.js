const fetch = require("node-fetch");
const fs = require("fs");

async function uploadAndParseDocument() {
  const uploadForm = await fetch("https://v1.api.reducto.ai/upload", {
    method: "POST",
  }).then((res) => res.json());

  await fetch(uploadForm.presigned_url, {
    method: "PUT",
    body: fs.createReadStream("./local.pdf"),
  });

  const responseData = await fetch("https://v1.api.reducto.ai/parse", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REDUCTO_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ document_url: uploadForm.file_id }),
  }).then((res) => res.json());

  console.log(responseData);
}

uploadAndParseDocument();
