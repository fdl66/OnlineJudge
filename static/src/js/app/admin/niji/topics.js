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

                    title: "",
                    user: "",
                    pub_date: "",
                    last_replied: "",
                    view_count: "",
                    reply_count: "",
                    hidden: false,
                    closed: false,
                    order: "",

                    pager: {
                        getPage: function (page) {
                            getPage(page);
                        }
                    },
                    editUser: function (user) {
                        vm.username = user.username;
                        vm.realName = user.real_name;
                        vm.adminType = user.admin_type;
                        vm.email = user.email;
                        vm.userId = user.id;
                        vm.tfa_auth = user.two_factor_auth;
                        vm.openAPI = user.openapi_appkey ? true: false;
                        vm.is_forbidden = user.is_forbidden ? true: false;

                        vm.isEditing = true;
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
