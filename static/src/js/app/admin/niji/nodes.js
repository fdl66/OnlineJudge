require(["jquery", "avalon", "csrfToken", "bsAlert", "pager", "validator"],
    function ($, avalon, csrfTokenHeader, bsAlert) {
        avalon.ready(function () {
            if (avalon.vmodels.nodeList) {
                var vm = avalon.vmodels.nodeList;
            }
            else {
                var vm = avalon.define({
                    $id: "nodeList",

                    nodeList: [],

                    keyword: "",
                    isEditing: false,

                    id:0,
                    title: "",
                    description: "",
                    num_of_topics:"",

                    pager: {
                        getPage: function (page) {
                            getPage(page);
                        }
                    },
                    editNode: function (node) {
                        vm.id = node.id;
                        vm.title=node.title;
                        vm.description=node.description;
                        vm.num_of_topics=node.num_of_topics;

                        vm.isEditing = true;
                    },
                    delNode: function (node) {
                        var data={
                            id:node.id,
                            title: node.title,
                            description: node.description,
                            dell: true,
                        };
                        if (confirm("你确定要删除么?")) {
                            $.ajax({
                                url: "/bbs/api/admin/node/",
                                data: data,
                                dataType: "json",
                                method: "put",
                                success: function (data) {
                                    if (!data.code) {
                                        bsAlert("删除成功！");
                                        getPage(avalon.vmodels.userPager.currentPage);
                                        vm.isEditing = false;
                                    } else {
                                        bsAlert(data.data);
                                    }
                                }
                            });
                        }
                    },
                    addNode: function () {
                        vm.id = 0;
                        vm.title="";
                        vm.description="";
                        vm.isEditing = true;
                    },
                    search: function () {
                        getPage(1);
                        avalon.vmodels.userPager.currentPage = 1;
                    }
                });
            }

            function getPage(page) {
                var url = "/bbs/api/admin/node/?paging=true&page=" + page + "&page_size=10";
                if (vm.keyword != "")
                    url += "&keyword=" + vm.keyword;
                $.ajax({
                    beforeSend: csrfTokenHeader,
                    url: url,
                    dataType: "json",
                    method: "get",
                    success: function (data) {
                        if (!data.code) {
                            vm.nodeList = data.data.results;
                            avalon.vmodels.userPager.totalPage = data.data.total_page;
                        }
                        else {
                            bsAlert(data.data);
                        }
                    }
                });
            }


            $("#edit-node-form").validator()
                .on('submit', function (e) {
                    if (!e.isDefaultPrevented()) {
                        var data = {
                            id: vm.id,
                            title: vm.title,
                            description: vm.description,
                            dell: false,
                        };
                        $.ajax({
                            url: "/bbs/api/admin/node/",
                            data: data,
                            dataType: "json",
                            method: "put",
                            success: function (data) {
                                if (!data.code) {
                                    bsAlert("保存成功！");
                                    getPage(avalon.vmodels.userPager.currentPage);
                                    vm.isEditing = false;
                                } else {
                                    bsAlert(data.data);
                                }
                            }
                        });
                        return false;
                    }
                });
        });
        avalon.scan();

    });
