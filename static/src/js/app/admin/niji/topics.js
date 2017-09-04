require(["jquery", "avalon", "csrfToken", "bsAlert", "pager", "validator"],
    function ($, avalon, csrfTokenHeader ,bsAlert) {
        avalon.ready(function () {
            if (avalon.vmodels.topicList) {
                var vm = avalon.vmodels.topicList;
            }
            else {
                var vm = avalon.define({
                    $id: "topicList",
                    topicList: [],

                    keyword: "",        

                    pager: {
                        getPage: function (page) {
                            getPage(page);
                        }
                    },

                    showEditTopicPage: function (topicId) {
                        avalon.vmodels.admin.topicId = topicId;
                        avalon.vmodels.admin.template_url = "template/niji/edit_topic.html";
                    },

                    search: function () {
                        getPage(1);
                        avalon.vmodels.userPager.currentPage = 1;
                    }
                });
            }

            function getPage(page) {
                var url = "/bbs/api/admin/topic/?paging=true&page=" + page + "&page_size=10";
                if (vm.keyword != "")
                    url += "&keyword=" + vm.keyword;
                $.ajax({
                    beforeSend: csrfTokenHeader,
                    url: url,
                    dataType: "json",
                    method: "get",
                    success: function (data) {
                        if (!data.code) {
                            vm.topicList = data.data.results;
                            avalon.vmodels.userPager.totalPage = data.data.total_page;
                        }
                        else {
                            bsAlert(data.data);
                        }
                    }
                });
            }
        });
        avalon.scan();

    });
