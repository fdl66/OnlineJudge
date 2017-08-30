require(["jquery", "avalon", "editor", "uploader", "bsAlert",
        "csrfToken", "tagEditor", "validator", "jqueryUI", "editorComponent", "testCaseUploader", "spj"],
    function ($, avalon, editor, uploader, bsAlert, csrfTokenHeader) {

        avalon.ready(function () {
            $("#edit-post-form").validator()
                .on('submit', function (e) {
                    if (!e.isDefaultPrevented()) {
                        var data = {
                            id: vm.id,
                            content_raw : vm.posts_content_raw,
                            hidden:vm.posts_hidden,
                        };
                        $.ajax({
                            url: "/bbs/api/admin/post/",
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
            $("#edit-topic-form").validator()
                .on('submit', function (e) {
                    //yemian kongzhi 
                    if (!e.isDefaultPrevented()) {var ajaxData = {
                            id:"",
                            title:"",
                            user_username:"",
                            content_raw:"",
                            hidden:false,
                            closed:false,
                            posts:[],
                            appendixs:[],
                        };
                        $.ajax({
                            beforeSend: csrfTokenHeader,
                            url: "/api/admin/problem/",
                            dataType: "json",
                            data: JSON.stringify(ajaxData),
                            method: "put",
                            contentType: "application/json;charset=UTF-8",
                            success: function (data) {
                                if (!data.code) {
                                    bsAlert("题目编辑成功！");
                                    vm.showTopicListPage();
                                }
                                else {
                                    bsAlert(data.data);
                                }
                            }

                        });
                        return false;
                    }
                });
            if (avalon.vmodels.editProblem) {
                var vm = avalon.vmodels.editProblem;
            }
            else {
                var vm = avalon.define({
                    $id: "edittopic",

                    id:"",
                    title:"",
                    user_username:"",
                    content_raw:"",
                    hidden:false,
                    closed:false,
                    posts:[],
                    appendixs:[],

                    posts_user_username:"",
                    posts_content_raw:"",
                    posts_hidden:false,

                    isEditing: false,
                    keyword:"",

                    pager: {
                        getPage: function (page) {
                            getPage(page);
                        }
                    },

                    showEditProblemPage: function (problemId) {
                        avalon.vmodels.admin.problemId = problemId;
                        avalon.vmodels.admin.template_url = "template/niji/edit_topic.html";
                    },

                    editPost: function (post) {
                        vm.posts_user_username = post.user_username;
                        vm.posts_content_raw = post.content_raw;
                        vm.posts_hidden = post.hidden ? true: false;

                        vm.isEditing = true;
                    },
                    search: function () {
                        getPage(1);
                        avalon.vmodels.userPager.currentPage = 1;
                    },
                    showTopicListPage: function () {
                        avalon.vmodels.admin.template_url = "template/niji/topics.html";
                    }
                });
            }
            //get_data
            $.ajax({
                url: "/bbs/api/admin/topic/?topic_id=" + avalon.vmodels.admin.problemId,
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
                        
                        
                        // $.ajax({
                        //     url: "/bbs/api/admin/appendixs/?topic_id=" + avalon.vmodels.admin.problemId,
                        //     method: "get",
                        //     dataType: "json",
                        //     success: function (data) {
                        //         if (data.code) {
                        //             bsAlert(data.data);
                        //         }
                        //         else {
                        //             vm.appendixs=data.data[0];
                        //         }
                        //     }
                        // });
                    }
                }
            });
            function getPage(page) {
                url="/bbs/api/admin/post/?topic_id=" + avalon.vmodels.admin.problemId+"&paging=true&page=" + page + "&page_size=5";
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
                            console.log(vm.posts)
                        }
                    }
                });
            }
        });
        avalon.scan();

    });