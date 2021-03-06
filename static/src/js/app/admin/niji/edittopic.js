require(["jquery", "avalon", "editor", "uploader", "bsAlert",
        "csrfToken", "tagEditor", "validator", "jqueryUI", "editorComponent", "testCaseUploader", "spj"],
    function ($, avalon, editor, uploader, bsAlert, csrfTokenHeader) {
        avalon.ready(function () {
            $("#edit-post-form").validator()
                .on('submit', function (e) {
                    if (!e.isDefaultPrevented()) {
                        var data = {
                            id: vm.post_id,
                            content_raw : vm.posts_content_raw,
                            hidden:vm.posts_hidden,
                            user_username:vm.posts_user_username,
                            dell: 0,
                        };
                        $.ajax({
                            url: "/bbs/api/admin/post/",
                            data: data,
                            dataType: "json",
                            method: "put",
                            success: function (data) {
                                if (!data.code) {
                                    bsAlert("保存成功！");
                                    getpostPage(avalon.vmodels.userPager.currentPage);
                                    vm.ispostEditing = false;
                                } else {
                                    bsAlert(data.data);
                                }
                            }
                        });
                        return false;
                    }
                });
            $("#edit-appendix-form").validator()
                .on('submit', function (e) {
                    if (!e.isDefaultPrevented()) {
                        var data = {
                            id: vm.appendix_id,
                            content_raw : vm.appendixs_content_raw,
                            dell: 0,
                        };
                        $.ajax({
                            url: "/bbs/api/admin/appendix/",
                            data: data,
                            dataType: "json",
                            method: "put",
                            success: function (data) {
                                if (!data.code) {
                                    bsAlert("保存成功！");
                                    getappendixPage(avalon.vmodels.userPager.currentPage);
                                    vm.isappendixEditing = false;
                                } else {
                                    bsAlert(data.data);
                                }
                            }
                        });
                        return false;
                    }
                });
            $("#edit-topic-form").validator()
                .on('submit', function (e) {
                    if (!e.isDefaultPrevented()) {
                        var data = {
                            id: vm.id,
                            title: vm.title,
                            content_raw : vm.content_raw,
                            hidden:vm.hidden,
                            closed:vm.closed,
                            dell:0,
                        };
                        $.ajax({
                            url: "/bbs/api/admin/topic/",
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
            if (avalon.vmodels.editTopic) {
                var vm = avalon.vmodels.editTopic;
            }
            else {
                var vm = avalon.define({
                    $id: "editTopic",

                    id:avalon.vmodels.admin.topicId,
                    title:"",
                    user_username:"",
                    content_raw:"",
                    hidden:false,
                    closed:false,
                    posts:[],
                    appendixs:[],

                    post_id:"",
                    posts_user_username:"",
                    posts_content_raw:"",
                    posts_hidden:false,

                    appendix_id:"",
                    appendixs_content_raw:"",
                    
                    hasPost: true,
                    hasAppendix: true,
                    ispostEditing: false,
                    isappendixEditing: false,

                    keyword:"",

                    pager: {
                        getPage: function (page) {
                            getpostPage(page);
                        }
                    },
                    delTopic: function () {
                        var data = {
                            id: vm.id,
                            title: vm.title,
                            content_raw : vm.content_raw,
                            hidden:vm.hidden,
                            closed:vm.closed,
                            dell:1,
                        };
                        if (confirm("你确定要删除么?")) {
                            $.ajax({
                                url: "/bbs/api/admin/topic/",
                                data: data,
                                dataType: "json",
                                method: "put",
                                success: function (data) {
                                    if (!data.code) {
                                        bsAlert("删除成功！");
                                        avalon.vmodels.admin.template_url = "template/niji/topics.html";
                                    } else {
                                        bsAlert(data.data);
                                    }
                                }
                            });
                        }
                    },
                    editPost: function (post) {
                        vm.post_id = post.id;
                        vm.posts_user_username = post.user_username;
                        vm.posts_content_raw = post.content_raw;
                        vm.posts_hidden = post.hidden ? true: false;
                        vm.ispostEditing = true;
                    },
                    delPost: function (post) {
                        var data={
                            id:post.id,
                            hidden: post.hidden,
                            content_raw: post.content_raw,
                            dell: 1,
                            user_username:post.user_username,
                        };
                        if (confirm("你确定要删除么?")) {
                            $.ajax({
                                url: "/bbs/api/admin/post/",
                                data: data,
                                dataType: "json",
                                method: "put",
                                success: function (data) {
                                    if (!data.code) {
                                        bsAlert("删除成功！");
                                        getpostPage(avalon.vmodels.userPager.currentPage);
                                    } else {
                                        bsAlert(data.data);
                                    }
                                }
                            });
                        }
                    },
                    editAppendix: function (appendix) {
                        vm.appendix_id=appendix.id;
                        vm.appendixs_content_raw = appendix.content_raw;
                        vm.isappendixEditing = true;
                    },
                    delAppendix: function (appendix) {
                        var data={
                            id:appendix.id,
                            content_raw: appendix.content_raw,
                            dell: 1,
                        };
                        if (confirm("你确定要删除么?")) {
                            $.ajax({
                                url: "/bbs/api/admin/appendix/",
                                data: data,
                                dataType: "json",
                                method: "put",
                                success: function (data) {
                                    if (!data.code) {
                                        bsAlert("删除成功！");
                                        getappendixPage(avalon.vmodels.userPager.currentPage);
                                    } else {
                                        bsAlert(data.data);
                                    }
                                }
                            });
                        }
                    },
                    search: function () {
                        getpostPage(1);
                        avalon.vmodels.userPager.currentPage = 1;
                    },
                    showTopicListPage: function () {
                        avalon.vmodels.admin.template_url = "template/niji/topics.html";
                    }
                });
            }
            //get_data
            $.ajax({
                url: "/bbs/api/admin/topic/?topic_id=" + vm.id,
                method: "get",
                dataType: "json",
                success: function (data) {
                    if (data.code) {
                        bsAlert(data.data);
                    }
                    else {
                        var edittopic=data.data[0];
                        vm.id=edittopic.id;
                        vm.title=edittopic.title;
                        vm.user_username=edittopic.user_username;
                        vm.content_raw=edittopic.content_raw;
                        vm.hidden=edittopic.hidden;
                        vm.closed=edittopic.closed;
                        
                        getpostPage(1);
                        getappendixPage(1);
                    }
                }
            });

            function getpostPage(page) {
                url="/bbs/api/admin/post/?topic_id=" + vm.id+"&paging=true&page=" + page + "&page_size=5";
                if (vm.keyword != "")
                    url += "&keyword=" + vm.keyword;
                $.ajax({
                    url: url,
                    method: "get",
                    dataType: "json",
                    success: function (data) {
                        if (data.code) {
                            bsAlert(data.data);
                        }
                        else {
                            vm.posts=data.data.results;
                            avalon.vmodels.userPager.totalPage = data.data.total_page;
                        }
                    }
                });
            }
            function getappendixPage(page) {
                url="/bbs/api/admin/appendix/?topic_id=" + vm.id+"&paging=true&page=" + page + "&page_size=5";
                if (vm.keyword != "")
                    url += "&keyword=" + vm.keyword;
                $.ajax({
                    url: url,
                    method: "get",
                    dataType: "json",
                    success: function (data) {
                        if (data.code) {
                            bsAlert(data.data);
                        }
                        else {
                            vm.appendixs=data.data.results;
                            avalon.vmodels.userPager.totalPage = data.data.total_page;
                        }
                    }
                });
            }
        });
        
        avalon.scan();

    });