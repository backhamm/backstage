// 创建弹出框容器
const div = document.createElement('div');
div.id = 'notification';
document.body.appendChild(div);

export const notification = ({title, message}) => {
    const time = 3000;
    const wrapper = document.getElementById('notification');
    const html = `<div class="wrapper" style="animation-duration: ${time / 1000}s">
                    <div class="main">
                        <div class="title" style="margin-bottom: ${message ? '10px' : 0}">${title}</div>
                        ${message || ''}
                    </div>
                </div>`;
    wrapper.insertAdjacentHTML('afterbegin', html);
    setTimeout(() => {
        wrapper.removeChild(wrapper.lastChild)
    }, time)
};
