const url = "https://sdk.photoroom.com/v1/segment";

// Please replace with your own apiKey
const apiKey = "4eaab18fd693fc0c64bbb4c07a777c2dfd248175";

export async function removeBackground(imageFile) {
  const formData = new FormData();
  formData.append("image_file", imageFile);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    console.error(response.json());
    throw new Error("Network response was not ok");
  }

  const imageBlob = await response.blob();

  return imageBlob;
}
