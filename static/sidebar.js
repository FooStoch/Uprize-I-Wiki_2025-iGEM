document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const navbarHeight = document.getElementById('navbar').offsetHeight;

    const sections = document.querySelectorAll('section');
    const sideItems = [];
    sections.forEach((section, index) => {
        const heading1 = section.getElementsByTagName('h1')[0];
        const button = document.createElement('div');
        button.id = `heading${index}`;
        if (document.title.includes('Engineering') || document.title.includes('Measurement') || document.title.includes('Human')) {
            const colon_idx = heading1.innerText.indexOf(':');
            if (colon_idx !== -1) {
                const new_text = heading1.innerText.substring(0, colon_idx);
                button.innerText = new_text;
            }
            else
                button.innerText = heading1.innerText;
        }
        else
            button.innerText = heading1.innerText;
        button.classList.add('side-item');
        button.addEventListener('click', function (e) {
            heading1.id = `h1-${index}`;
            smoothScrollTo(`h1-${index}`);
        })
        sidebar.appendChild(button);
        sideItems.push(button); // 保存按钮引用
    });


    function smoothScrollTo(id) {
        const element = document.getElementById(id);
        if (element) {
            const scrollPosition = element.offsetTop - navbarHeight - 10;
            window.scroll({
                top: scrollPosition,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    // 添加滚动时高亮当前章节的功能
    function updateActiveSection() {
        const contentTop = document.getElementById('content').offsetTop;
        const footerTop = document.getElementById('footer').offsetTop;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // 控制侧边栏显示/隐藏
        if (scrollTop < footerTop - window.innerHeight) {
            sidebar.classList.add('sidebar-active');
        } else {
            sidebar.classList.remove('sidebar-active');
        }

        // 查找当前可见的章节
        let currentActiveIndex = -1;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionBottom = sectionTop + rect.height;

            // 判断章节是否在视口中（考虑导航栏高度）
            if (scrollTop + navbarHeight + 50 >= sectionTop &&
                scrollTop + navbarHeight + 50 < sectionBottom) {
                currentActiveIndex = index;
            }
        });

        // 更新侧边栏高亮状态
        sideItems.forEach((item, index) => {
            if (index === currentActiveIndex) {
                item.classList.add('side-item-active');
            } else {
                item.classList.remove('side-item-active');
            }
        });
    }

    // 使用防抖优化滚动性能
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(updateActiveSection);
    }

    // 监听滚动事件
    document.addEventListener('scroll', handleScroll);

    // 页面加载时立即检查当前章节
    updateActiveSection();
});