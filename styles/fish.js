fish();
function fish() {
    return (
        // 修改容器为固定在屏幕底部的元素
        $("body").append(
            '<div id="fish-container" style="position: fixed; bottom: 0; left: 0; width: 100%; height: 150px; z-index: 9999;"></div>'
        ),
            // 将小鱼容器添加到这个固定元素中
            $("#fish-container").append(
                '<div class="container" id="jsi-flying-fish-container" style="width: 100%; height: 100%;"></div>'
            ),
            // 加载鱼的基础脚本
            $("body").append(
                '<script src="/styles/fish-base.js"></script>'
            ),
            this
    );
}