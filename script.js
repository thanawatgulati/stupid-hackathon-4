const imageUpload = document.getElementById("click");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]).then(start);

async function start() {
  const container = document.createElement("div");
  container.style.position = "relative";
  document.body.append(container);
  const LabeledFaceDescriotors = await loadLabeledImages();
  const faceMatcher = new faceapi.faceMatcher(LabeledFaceDescriotors, 0.6);
  let image;
  let canvas;
  document.body.append("Loaded");
  imageUpload.addEventListener("change", async () => {
    if (image) image.remove();
    if (canvas) canvas.remove();
    const image = await faceapi.bufferToImage(imageUpload.file[0]);
    container.append(image);
    const canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetection = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetection.map((d) =>
      faceMatcher.findBastMatch(d.descriptor)
    );
    resizedDetection.forEach((detections) => {
      const box = resizedDetectionp[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: results.toString(),
      });
      drawBox.draw(canvas);
    });
  });
}

function loadLabeledImages() {
  const labels = ["Black Widow", "Captain America", "cat"];
  return Promise.all(
    labels.map(async (label) => {
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          "https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg"
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptors();
        descritions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriotors(label, descritions);
    })
  );
}
