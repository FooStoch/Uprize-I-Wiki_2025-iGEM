var listener = function () {
    const progressBar = document.getElementById('progress-bar');
    const progressImg = document.getElementById('progress-img');
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight = document.getElementById('content').offsetHeight;
    progressBar.style.width = Math.round(height / totalHeight * window.innerWidth) + 'px';
    progressImg.style.left = Math.round(height / totalHeight * window.innerWidth) + 'px';
}

document.addEventListener('scroll', listener);
document.addEventListener('resize', listener);