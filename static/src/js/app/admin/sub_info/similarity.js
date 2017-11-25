require(["jquery","csrfToken","bsAlert"],
    function ($, csrfTokenHeader, bsAlert) {
        $("button#sim").click(function () {
            get_sim_result();
        });
        function get_sim_result() {
            var problem_id=0;
            if($("#problem_id").val())
                problem_id=$("#problem_id").val();
            else{
                alert("please input problem_id!")
                return ;
            }
            var url = "/api/admin/submission_similarity/?problem_id="+problem_id;
            $.ajax({
                beforeSend: csrfTokenHeader,
                url: url,
                dataType: "json",
                method: "get",
                success: function (data) {
                    if(data.code==0){
                        sim_answer_html="<h2>查重结果</h2><br>\n" +
                            "<table class=\"table table-striped\">\n" +
                            "        <tr>\n" +
                            "            <th>id</th>\n" +
                            "            <th>用户1</th>\n" +
                            "            <th>提交信息</th>\n" +
                            "            <th>用户2</th>\n" +
                            "            <th>提交信息</th>\n" +
                            "            <th>相似百分比</th>\n" +
                            "        </tr>\n" ;
                        for(var i=0;i<data.data.length;i++){
                            sim_answer_html+="        <tr>\n" +
                            "            <td>"+(i+1)+"</td>\n" +
                            "            <td>"+data.data[i].sub1.user.username+"|"+data.data[i].sub1.user.real_name+"</td>\n" +
                            "            <td>"+data.data[i].sub1.file+"</td>\n" +
                            "            <td>"+data.data[i].sub2.user.username+"|"+data.data[i].sub2.user.real_name+"</td>\n" +
                            "            <td>"+data.data[i].sub2.file+"</td>\n" +
                            "            <td>"+data.data[i].similarity_percent+"</td>\n" +
                            "        </tr>\n" ;
                        }
                        // sim_answer_html+="<\\table>\n"
                        $("div#sim_result").html(sim_answer_html);
                    }
                    else if(data.code==1){
                        $("div#sim_result").html("<h2>查重结果</h2><br><h3>"+data.data+"<\h3>");
                    }
                    else if(data.code==2){
                        $("div#sim_result").html("<h2>查重结果</h2><br><h3>"+data.data+"<\h3>");
                    }
                    else{
                        bsAlert("请求失败！");
                    }
                }
            });
        }
    });
