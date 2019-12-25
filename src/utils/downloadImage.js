/**
 * exp:
 * downloadFile('test.png', canvas.toDataURL("image/png"));
 */

function base64Img2Blob(code) {
  const parts = code.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

export default function downloadImage(fileName, content) {
  const aLink = document.createElement('a');
  const blob = base64Img2Blob(content);
  const evt = document.createEvent("MouseEvents");

  evt.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
}
