const _ = e => document.querySelector(e);
const render = _('.result');

// create video
const createVideo = data => {
  let v = document.createElement('video');
  v.id = "instavideo";
  v.src = data.content; 
  v.controls = true;
  v.autoplay = true;
 
  // create info
  let info = document.createElement('p');
  info.textContent = "点击右键存储视频或图片";
 
  render.innerHTML = ""; 
  render.appendChild(v);
  render.appendChild(info);
};
// create image
const createImg = data => {
  // create image
  let i = document.createElement('img');
  i.id = "instaImg";
  i.src = data.content;
 
  // create info
  let info = document.createElement('p');
  info.textContent = "点击右键存储视频或图片.";
 
  render.innerHTML = ""; 
  render.appendChild(i); 	
  render.appendChild(info); 
 
};
 
// extract html
const getMedia = () => {
  render.innerHTML = "<div class='image-placeholder'></div>";
  // get input value
  let url = _('input').value;
  if (url) {
    fetch(url).
    then(r => r.text()).
    then(r => {
      // render html
      render.innerHTML = r;
      // wait, find meta and create video or image
      let w = setTimeout(() => {
        let v = _('meta[property="og:video"]');
        if (v) {
          createVideo(v);
        } else {
          let img = _('meta[property="og:image"]');
          if (img) {
            createImg(img);
          } else {
            document.body.innerHTML = body;
            alert('提取 Instrgram 图片、视频失败.');
          };
        }
        clearTimeout(w);
      }, 200);
    });
  } else {
    _('input').setAttribute('placeholder', '无效的Instrgram地址, 请使用正確的Insagram地址');
 
  }
};