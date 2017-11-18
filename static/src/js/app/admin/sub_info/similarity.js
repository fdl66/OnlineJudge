require(["jquery","csrfToken","bsAlert"],
    function ($, csrfTokenHeader, bsAlert) {
        $("button#sim").click(function () {
            get_sim_result();
        });
        function get_sim_result() {
            var problem_id=0;
            console.log("hello");
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
                    if (!data.code) {
                        $("div#sim_result").html("<h2>查重结果</h2><br><p>"+data.data+"<\p>");
                    }
                    else {
                        bsAlert(data.data);
                        $("#problem_id").val()="";
                    }
                }
            });
        }
    });
