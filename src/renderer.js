const { remote } = require('electron');
const { dialog } = remote;

const ve = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const seekFw1Btn = document.getElementById('seekFw1');
const seekBh1Btn = document.getElementById('seekBh1');
const videoSelectBtn = document.getElementById('videoSelectBtn');

const debug = document.getElementById('debug');

startBtn.onclick = startPlaying;
stopBtn.onclick = stopPlaying;
seekFw1Btn.onclick = seekFwFrame;
seekBh1Btn.onclick = seekBhFrame;
videoSelectBtn.onclick = selectMedia;

let video = VideoFrame({
  id: 'video',
  frameRate: FrameRates.film,
  callback: function (response) {
    console.log(response);
  }
});

// function selectMedia() {
//   dialog.showOpenDialog({
//     properties: ['openFile']
//   }).then(result => {
//     console.log(result.canceled)
//     console.log(result.filePaths)
//   }).catch(err => {
//     console.log(err)
//   })
// }

async function selectMedia() {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (!result.canceled) {
    console.log(result.filePaths);
    const source = ve.getElementsByTagName('source');
    source[0].src = 'file:///' + result.filePaths[0];
    ve.load();
  }
}


function seekFwFrame() {
  video.seekForward(1, () => {
    console.log(video.get());
  });
}

function seekBhFrame() {
  video.seekBackward(1, () => {
    console.log(video.get());
  });
}

function startPlaying() {
  ve.play();
}

function stopPlaying() {
  ve.pause();
}
