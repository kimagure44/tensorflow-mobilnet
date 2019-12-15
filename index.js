const init = () => {
  document.querySelector("#image").onchange = evt => {
    let reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      const img = document.querySelector('#imgPreview');
      const container = document.querySelector('#result');
      img.setAttribute('src', reader.result);
      img.classList.remove('hide');
      document.querySelector('label[for="classify"]').classList.remove('lock');
      container.innerHTML = '';
    };
  }
};

const classify = () => {
  const loading = document.querySelector('.loading');
  loading.classList.remove('hide');
  const img = document.querySelector('#imgPreview');
  mobilenet.load().then(model => {
    model.classify(img).then(predictions => {
      const body = document.body;
      const container = document.querySelector('#result');
      container.innerHTML = '';
      predictions.forEach(data => {
        const porcent = parseFloat(data.probability * 100).toFixed(2);
        const progress = document.createElement('progress');
        const label = document.createElement('div');
        const info = document.createElement('span');
        label.innerHTML = `<b>Elemento reconocidos:</b> <i>${data.className}</i>`;
        progress.setAttribute('max', 100);
        progress.setAttribute('value', porcent);
        info.innerHTML = ` <b>${porcent}%</b>`;
        container.classList.add('result');
        container.appendChild(label);
        container.appendChild(progress);
        container.appendChild(info);
      });
      body.appendChild(container);
      loading.classList.add('hide');
    });
  });
};

window.onload = init();