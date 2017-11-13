require(["jquery","csrfToken","bsAlert"],
    function ($, csrfTokenHeader, bsAlert) {
        var myChart = echarts.init(document.getElementById('ech'));
        var option = {
                    title: {
                        text: '提交概况',
                        subtext: "学生姓名"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}次'
                        }
                    },
                    series: [
                        {
                            name:'最低气温',
                            type:'line',
                            data:[]
                        }
                    ]
                };
        myChart.setOption(option);
        update_chart();
        $("button#update").click(function () {
            update_chart();
            console.log("hello");
        });
        function update_chart() {
            myChart.showLoading();
            var req_util="day";
            var user_name=$("#user_name").val();
            var start_time=$("#time_start").val();
            console.log(start_time);
            var end_time=$("#time_end").val();
            console.log(end_time);
            var url = "/api/admin/submission_everyday_num/?req_util="+req_util;
            if(user_name){
                url+="&user_name="+user_name;
            }
            if(start_time){
                url+="&start_time="+start_time;
            }
            if(end_time){
                url+="&end_time="+end_time;
            }
            $.ajax({
                beforeSend: csrfTokenHeader,
                url: url,
                dataType: "json",
                method: "get",
                success: function (data) {
                    if (!data.code) {
                        myChart.hideLoading();
                        myChart.setOption({
                            xAxis:{
                                data:JSON.parse(data.data.x_data)
                            },
                            series:[{
                                data:JSON.parse(data.data.y_data)
                            }]
                        });
                    }
                    else {
                        bsAlert(data.data);
                        $("user_name").val()="";
                    }
                }
            });
        }
    });
