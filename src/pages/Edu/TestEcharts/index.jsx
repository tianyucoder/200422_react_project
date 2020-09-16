import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class TestEcharts extends Component {

	//柱状图配置
	initBarChart = ()=>(
		{
			title: {
				text: '商品销售报表', //主标题文字
				show:true, //是否展示标题
				link:'https://www.baidu.com', //主标题点击跳转的链接
				textStyle:{
					color:'#000' //主标题的样式
				},
				subtext:'按季度统计'//副标题
			},
			tooltip: { //提示框配置
				trigger:'axis', //提示框触发类型
				axisPointer:{ //坐标轴指示器配置项
					type:'cross' //十字准星指示器
				},
				// triggerOn:'click', //提示框触发的条件
				// showDelay:500 //浮层显示的延迟
				formatter: '{b0}的{a0}: {c0}个' //弹窗格式化模板
			},
			legend: { //图例配置
				data:['销量','库存'],
				// formatter: '总公司{name}'
				// icon:'image://https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=127665095,1206639163&fm=26&gp=0.jpg'
			},
			xAxis: { //x轴配置
				data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","皮鞋"]
			},
			yAxis: { }, //y轴配置
			series: [
				{ //表格展示相关的配置(系列列表)
						name: '销量', //该组数据的名字是什么（需要和legend.data对应）
						type: 'line', //控制图标的类型 bar柱状图 line：折线图 pie：饼图 
						data: [50, 200, 360, 100, 100, 200,170] //具体的数据
				},
				{ //表格展示相关的配置(系列列表)
						name: '库存', //该组数据的名字是什么（需要和legend.data对应）
						type: 'bar', //控制图标的类型 bar柱状图 line：折线图 pie：饼图 
						data: [150, 280, 460, 170, 120, 220,270] //具体的数据
				}
			]
		}
	)

	//饼状图
	initPieChart = ()=>{
		var data = genData(50);
		function genData(count) {
			var nameList = [
					'赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
			];
			var legendData = [];
			var seriesData = [];
			var selected = {};
			var name
			for (var i = 0; i < count; i++) {
					name = Math.random() > 0.65
							? makeWord(4, 1) + '·' + makeWord(3, 0)
							: makeWord(2, 1);
					legendData.push(name);
					seriesData.push({
							name: name,
							value: Math.round(Math.random() * 100000)
					});
					selected[name] = i < 6;
			}

			return {
					legendData: legendData,
					seriesData: seriesData,
					selected: selected
			};

			function makeWord(max, min) {
					var nameLen = Math.ceil(Math.random() * max + min);
					var name = [];
					for (var i = 0; i < nameLen; i++) {
							name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
					}
					return name.join('');
			}
		}
		return {
			title: {
				text: '同名数量统计',
				subtext: '纯属虚构',
				left: 'center'
			},
			tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
					type: 'scroll',
					orient: 'vertical',
					right: 10,
					top: 20,
					bottom: 20,
					data: data.legendData,
					selected: data.selected
			},
			series: [
						{
								name: '姓名',
								type: 'pie',
								radius: '55%',
								center: ['40%', '50%'],
								data: data.seriesData,
								emphasis: {
										itemStyle: {
												shadowBlur: 10,
												shadowOffsetX: 0,
												shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
								}
						}
				]
		}
	}

	render() {
		return (
			<div>
				<ReactEcharts option={this.initBarChart()} />
				<ReactEcharts option={this.initPieChart()} />
			</div>
		)
	}
}
