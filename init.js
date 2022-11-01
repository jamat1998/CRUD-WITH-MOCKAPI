const getJSONData = async (url) => await fetch(url);

const postJSONData = async (url, data) =>
  await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();

const deleteJSONData = async (url) =>
    await fetch(url, {
      method: "DELETE",
    })
;

const putJSONData = async (url,data) =>
  await (
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  ).json();