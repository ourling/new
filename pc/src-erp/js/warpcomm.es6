let ajaxUrl = {
    companyNews: '//ketang.ecbao.cn/video?page=1&orderby=id&order=desc&json=1'
};
for (let key in ajaxUrl) {
    if (ajaxUrl.hasOwnProperty(key)) {
        getAndRenderNews(key, ajaxUrl[key]);
    }
}
function getAndRenderNews(domId, url) {
    $.ajax({
        "url": url,
        "dataType": "jsonp",
    }).done(function (obj) {
        if (obj.status === 'ok' && obj.count > 0) {
            var newsLists = obj.posts;
            var html = '';
            for (var i in newsLists) {
                if (i > 8) {
                    break;
                }
                var newsTitle = newsLists[i].title;
                var newsLink = newsLists[i].url;
                html += `<a href="http://${newsLink.split("//")[1]}" class="item" target = "_blank" title="${newsTitle}">'${newsTitle}</a>`;
            }
            $("#newsContainer").html(html);
        }
    });
}