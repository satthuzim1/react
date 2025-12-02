window.addEventListener('load', function () {
    // Đây là nơi bạn gọi các hàm JavaScript bạn muốn chạy sau khi tất cả các tài nguyên (bao gồm cả hình ảnh và các tệp JavaScript) đã được tải xong
    const element = document.getElementById('content-in-container');
    const loadingFrame = document.getElementById('loading-frame');
    if (element) {
        const size = element.getBoundingClientRect();
        loadingFrame.style.width = size.width + 'px';
        loadingFrame.style.height = size.height + 'px';
    }
});