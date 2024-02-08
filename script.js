// script.js

document.addEventListener("DOMContentLoaded", function () {
    // URL拼接的常量部分
    const baseUrl = "https://pub-7ec9fa74a5924640a9ad167b05e79229.r2.dev/";
    const extension = ".webp";
    const lastImageIndex = 75;

    // 获取图片容器元素
    const imageContainer = document.getElementById("image-container");

    // 循环遍历生成图片URL并添加图片元素到容器中
    for (let i = 1; i <= lastImageIndex; i++) {
        const imageUrl = baseUrl + i + extension;

        const imgElement = document.createElement("img");
        imgElement.style.width = "100%";
        imgElement.style.height = "auto";
        imgElement.src = "placeholder.jpg";
        imgElement.alt = "Resizable Image";
        imgElement.classList.add("resizable-image");
        imgElement.setAttribute("width", "300"); // 根据需要调整
        imgElement.setAttribute("height", "200"); // 根据需要调整

        imageContainer.appendChild(imgElement);

        // 监听图片元素进入可见区域时加载真实图片
        imgElement.onload = () => {
            imgElement.style.opacity = 1;
        };
        imgElement.setAttribute("data-src", imageUrl);
    }

    // 观察器配置
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    // 创建观察器实例
    const observer = new IntersectionObserver(onIntersection, options);

    // 遍历所有懒加载图片元素并开始观察
    document.querySelectorAll(".resizable-image").forEach(img => {
        observer.observe(img);
    });

    // 观察器回调函数
    function onIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-src");
                if (src) {
                    img.src = src;
                    img.removeAttribute("data-src");
                }
                observer.unobserve(img);
            }
        });
    }
});
